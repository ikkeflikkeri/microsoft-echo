"use client";

import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "What did Sarah say about the Q3 roadmap?",
  "What's the status of the Acme migration?",
  "Show me everything about pricing changes",
  "What are the action items from the last design call?",
  "What meetings do I have with the Acme team?",
];

export function EchoSearch() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answer && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [answer]);

  async function handleSearch(q: string) {
    if (!q.trim()) return;
    setQuery(q);
    setAnswer("");
    setSources("");
    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("text/plain")) {
        // Streaming text response from AI SDK
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let full = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            full += chunk;
            setAnswer(full);
          }
        }
        if (!full) setAnswer("No response generated.");
      } else {
        // Fallback JSON response (no API key configured)
        const data = await res.json();
        setAnswer(data.answer);
        setSources(data.sources);
      }
    } catch (err) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="relative">
        <div
          className="flex items-center gap-3 rounded-2xl border border-black/10 bg-surface px-5 py-4 shadow-lg shadow-accent/5 transition-all focus-within:border-accent/40 focus-within:shadow-accent/10 dark:border-white/10 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <svg
            className="h-5 w-5 text-muted shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Ask Echo anything about your work..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted"
          />
          {query && (
            <button
              onClick={() => handleSearch(query)}
              disabled={loading}
              className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-flex items-center gap-1">
                  <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </span>
              ) : (
                "Ask"
              )}
            </button>
          )}
        </div>
      </div>

      {/* Suggestions */}
      {!answer && !loading && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="rounded-full border border-black/5 bg-surface px-3 py-1.5 text-xs text-muted transition-all hover:border-accent/30 hover:text-accent dark:border-white/5"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && !answer && (
        <div className="mt-6 flex items-center gap-3 justify-center text-muted text-sm">
          <span className="h-4 w-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          Searching your workspace...
        </div>
      )}

      {/* Results */}
      {(answer || sources) && (
        <div ref={resultsRef} className="mt-6 rounded-2xl border border-black/5 bg-surface p-6 dark:border-white/5">
          {sources && (
            <div className="mb-3 flex flex-wrap gap-2">
              {sources.split(", ").map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
          <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {answer}
            {loading && (
              <span className="inline-block ml-1 w-1.5 h-4 bg-accent animate-pulse" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
