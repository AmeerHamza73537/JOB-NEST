import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // keep the newest message in view as the list grows
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    const message = input.trim();
    if (!message || loading) return;

    // the history the backend needs is everything said *before* this message
    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASE_BACKEND_URL}/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.reply) {
        setError(data?.message || "Something went wrong. Please try again.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      // network failure / server unreachable — never let this bubble up
      setError("Could not reach the assistant. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 h-[420px] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] text-white">
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm">Job Nest Assistant</span>
              <span className="text-[11px] text-[#cfe8ff]">Ask about jobs, proposals & hiring</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="p-1 rounded-full hover:bg-white/20 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* message list */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#F8F9FB]">
            {messages.length === 0 && !loading && (
              <p className="text-center text-xs text-[#7A8A9E] mt-6 px-4">
                Hi! Ask me anything about finding jobs, writing proposals, or hiring on Job Nest.
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] text-white rounded-br-sm"
                      : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-2xl rounded-bl-sm bg-white border border-slate-200 text-sm text-[#7A8A9E] italic">
                  typing...
                </div>
              </div>
            )}

            {error && (
              <div className="mx-1 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
                {error}
              </div>
            )}
          </div>

          {/* input row */}
          <div className="flex items-center gap-2 p-2 border-t border-slate-200 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              maxLength={1999}
              className="flex-1 px-3 py-2 text-sm rounded-full bg-[#F8F9FB] border border-slate-200 outline-none focus:border-[#5fa2d8] transition"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="p-2 rounded-full bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] text-white shadow-md hover:shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* floating icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] text-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-[1.05] active:scale-[0.97] transition-all duration-200"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
