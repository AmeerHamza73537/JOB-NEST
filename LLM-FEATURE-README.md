# Job Nest — LLM Feature

Notes on the AI/chat features being added to Job Nest, built up one step at a time.

---

## Step 1: Backend Chat Endpoint

### What was built

A single new API endpoint, `POST /api/chat`.

You send it a message (and optionally the earlier back-and-forth of the
conversation), it forwards that to an LLM, and it sends back the assistant's
answer as JSON. That's the whole job. It doesn't touch the database, it doesn't
require a login, and it doesn't know anything about the rest of Job Nest — it is
a self-contained piece that the frontend can call later to power a chat widget.

Nothing that already existed was changed, apart from two added lines in
`api/index.js` that tell the server the new route exists.

### Where the files live

The task description referred to `src/routes/chat.js`, but this project doesn't
have a `src/routes/` folder. The backend lives in `api/`, and its routes sit in
`api/route/` using a `name.route.js` naming pattern. The new file follows the
existing convention instead of introducing a second, competing folder layout:

| Thing | Path |
| --- | --- |
| The new route | `api/route/chat.route.js` |
| The main app file (2 lines added) | `api/index.js` |
| Secrets | `api/.env` |
| Template for secrets | `api/.env.example` |

### What packages/tools were used

**`groq-sdk`** (installed into `api/`).

Groq is a service that runs open-source LLMs (like Meta's Llama models) very
fast. There were two ways to talk to it:

1. The `openai` package, pointed at Groq's compatible address
   (`https://api.groq.com/openai/v1`).
2. Groq's own `groq-sdk` package.

`groq-sdk` was chosen because it is simpler — the base URL is already built in,
so there's no extra configuration line to get wrong, and no confusing situation
where a package named "openai" is actually talking to Groq. Both options work
identically otherwise; the two SDKs are near-identical in shape.

The model used by default is **`llama-3.1-8b-instant`** — a small, fast, cheap
model, which is the right fit for short support-style chat answers.

### What each part of the code does

**The setup at the top.** Defines three constants: the system prompt (the
standing instruction that tells the model it works for Job Nest), the 2000
character message limit, and the 15 second timeout. Keeping them named at the
top means changing the model's personality or the limits is a one-line edit.

**`getGroq()`.** Creates the Groq client the first time a request comes in,
then reuses it. It is done lazily (rather than at the top of the file) because
`dotenv` needs to have loaded the `.env` file first — building the client at
import time could capture an empty API key. `maxRetries: 0` stops the SDK from
silently retrying a failed call, which would blow past the 15 second budget.

**`sanitizeHistory()`.** The conversation history comes from the browser, so it
can't be trusted to be well-formed. This function throws away anything that
isn't a proper `user` or `assistant` message with real text in it, keeps only
the last 10 turns (so a long conversation can't grow the request forever), and
trims each one to the length limit. A malformed history results in a normal
answer, not a crash.

**The validation block.** Before anything is sent to Groq, the endpoint checks
that `message` is genuinely a string and isn't blank or whitespace-only, and
that it is under 2000 characters. Either problem returns HTTP **400** with an
explanation. It then checks the API key is actually configured, so a missing
key produces a clear message rather than a confusing failure deeper in.

Doing this first matters: every rejected request here is one that never costs an
API call.

**The Groq call.** Assembles the final message list in order — system prompt
first, then the cleaned-up history, then the new message — and sends it. The
15 second timeout is applied both on the client and on the individual request.
`max_tokens: 512` caps how long the answer can be, which also caps the cost.

**The response.** On success it returns exactly `{ "reply": "..." }`, as
specified. If the model somehow returns nothing at all, that's caught and
reported instead of sending back an empty string.

**The `catch` block.** This is what keeps the server alive. *Any* failure —
network down, bad API key, Groq having an outage, request timing out — is caught
and turned into a JSON error response. It distinguishes a timeout (returns
**504**) from other upstream problems (**502**, or Groq's own status code), so
the frontend can tell "try again" apart from "something is broken". The real
error is logged to the server console for debugging, but the detailed message is
never sent to the browser, since error text can leak internal information.

### What env variables were added, and why

Added to `api/.env`:

| Variable | Purpose |
| --- | --- |
| `GROQ_API_KEY` | The secret key that authenticates with Groq. **Left empty — you must paste your own key in.** Get one free at <https://console.groq.com/keys>. |
| `GROQ_MODEL` | Which model to use. Set to `llama-3.1-8b-instant`. |

These live in environment variables rather than in the code for two reasons.
The API key is a **secret** — anyone who has it can spend money on your account,
so it must never end up in a git commit. And the model name is a **setting** —
putting it in `.env` means you can swap to a bigger model by editing one line,
with no code change and no redeploy of changed source.

`.env` is already covered by `.gitignore` (line 76, the `*.env` rule), verified
with `git check-ignore`, so the key will not be committed.

Because `.env` is invisible to git, a new **`api/.env.example`** was added and
*is* committed. It lists every variable name the project needs with empty
values, so a teammate cloning the repo knows what to fill in. It contains no
secrets.

### What you need to do before it runs

1. Get a free API key from <https://console.groq.com/keys>.
2. Paste it into `api/.env` after `GROQ_API_KEY=`.
3. Start the backend:

```bash
cd api && npm run dev
```

### The end result

A working backend endpoint at `POST http://localhost:3000/api/chat` that takes a
question and returns an LLM-generated answer, testable from the command line
with no frontend involved.

**Example request:**

```bash
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"What should I include in a job proposal?\"}"
```

**Expected response** (HTTP 200 — exact wording will vary, since the model
generates fresh text every time):

```json
{
  "reply": "A strong job proposal should include: a brief intro showing you understand the client's problem, your relevant experience with specific examples, a clear scope of work with deliverables, a timeline, and your rate. Keep it concise and focused on their needs rather than listing everything you've done."
}
```

**Example failure** (empty message) — returns HTTP 400:

```json
{
  "success": false,
  "message": "message is required and must be a non-empty string"
}
```

### What was verified

- Blank, whitespace-only, missing, and non-string messages all return 400.
- A 2000-character message is rejected; 1999 is accepted.
- Malformed JSON in the request body does not crash the server.
- A bad history array (wrong roles, `null` entries) is cleaned instead of crashing.
- A live call to Groq with an invalid key returns clean JSON and the server stays up.

The happy path — a real answer from Groq — could not be run here, as that needs
a valid `GROQ_API_KEY`. Run the curl command above once you've added yours.
