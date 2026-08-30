import express from 'express';
import Groq from 'groq-sdk';

const router = express.Router()

const SYSTEM_PROMPT = 'You are a helpful assistant for Job Nest, a job marketplace app. Keep answers concise and relevant to jobs, proposals, and hiring.'
const MAX_MESSAGE_LENGTH = 2000
const REQUEST_TIMEOUT_MS = 15000

let groq = null
const getGroq = () => {
    if (!groq) {
        groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
            timeout: REQUEST_TIMEOUT_MS,
            maxRetries: 0
        });
    }
    return groq
}

// only keep well-formed user/assistant turns, so a malformed history can't reach Groq
const sanitizeHistory = (history) => {
    if (!Array.isArray(history)) return []
    return history
        .filter((m) =>
            m && (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string' && m.content.trim().length > 0
        )
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))
}

router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body || {}

        if (typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'message is required and must be a non-empty string'
            });
        }

        if (message.length >= MAX_MESSAGE_LENGTH) {
            return res.status(400).json({
                success: false,
                message: `message must be under ${MAX_MESSAGE_LENGTH} characters`
            });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                success: false,
                message: 'Chat is not configured on the server'
            });
        }

        const completion = await getGroq().chat.completions.create({
            model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...sanitizeHistory(history),
                { role: 'user', content: message.trim() }
            ],
            temperature: 0.7,
            max_tokens: 512
        }, { timeout: REQUEST_TIMEOUT_MS });

        const reply = completion?.choices?.[0]?.message?.content?.trim()

        if (!reply) {
            return res.status(502).json({
                success: false,
                message: 'The assistant returned an empty reply. Please try again.'
            });
        }

        return res.status(200).json({ reply });
    } catch (err) {
        console.log('chat error:', err?.message || err);

        // don't hand the caller a 500 when it was a timeout or an upstream/Groq problem
        const isTimeout = err?.name === 'APIConnectionTimeoutError' || err?.code === 'ETIMEDOUT'
        const statusCode = isTimeout ? 504 : (err?.status >= 400 && err?.status < 600 ? err.status : 502)

        return res.status(statusCode).json({
            success: false,
            message: isTimeout
                ? 'The assistant took too long to respond. Please try again.'
                : 'Could not get a reply from the assistant right now.'
        });
    }
})

export default router;
