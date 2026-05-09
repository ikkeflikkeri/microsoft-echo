"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { EchoItem } from "@/lib/mock-data";
import { MarkdownText } from "./markdown-text";
import { SourceCard } from "./source-card";

const SUGGESTIONS = [
  "What did Sarah say about the Q3 roadmap?",
  "What's the status of the Acme migration?",
  "Show me everything about pricing changes",
  "What are the action items from the last design call?",
  "What meetings do I have with the Acme team?",
];

interface SearchResult {
  sources: EchoItem[];
  sourceSummary: string;
  answer: string;
}

export function EchoSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setResult(null);
    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("text/plain")) {
        // Streaming: first line = JSON metadata, rest = AI text
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          let buffer = "";
          let sourcesParsed = false;
          let parsedSources: EchoItem[] = [];
          let parsedSummary = "";
          let textBuffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            if (!sourcesParsed) {
              const newlineIdx = buffer.indexOf("\n");
              if (newlineIdx !== -1) {
                const metaLine = buffer.slice(0, newlineIdx);
                try {
                  const meta = JSON.parse(metaLine);
                  parsedSources = meta.sources || [];
                  parsedSummary = meta.sourceSummary || "";
                } catch {
                  textBuffer = buffer;
                }
                sourcesParsed = true;
                buffer = buffer.slice(newlineIdx + 1);
                if (buffer) textBuffer += buffer;
                buffer = "";
              }
            } else {
              textBuffer += buffer;
              buffer = "";
            }

            setResult({
              sources: parsedSources,
              sourceSummary: parsedSummary,
              answer: textBuffer,
            });
          }

          if (!textBuffer && !parsedSources.length) {
            setResult({
              sources: [],
              sourceSummary: "",
              answer: "No response generated.",
            });
          }
        }
      } else {
        // Fallback JSON
        const data = await res.json();
        setResult({
          sources: data.sources || [],
          sourceSummary: data.sourceSummary || "",
          answer: data.answer,
        });
      }
    } catch {
      setResult({
        sources: [],
        sourceSummary: "",
        answer: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Scroll to results on first appearance
  useEffect(() => {
    if (result && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [!!result]); // only trigger when result goes from null to non-null

  // Unique people from all sources
  const people = result?.sources
    ? [...new Set(result.sources.flatMap((s) => s.people))]
    : [];

  return (
    <div
      className={`flex flex-col items-center px-6 transition-all duration-500 ${
        hasSearched
          ? "pt-8"
          : "justify-center min-h-[calc(100vh-3.5rem)]"
      }`}
    >
      <div className="w-full max-w-2xl">
        {/* Hero text — only shown before first search */}
        {!hasSearched && (
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What do you need to find?
            </h1>
            <p className="mt-3 text-muted text-sm max-w-md mx-auto">
              Ask about your work across email, chats, documents, meetings, and
              calendar — Echo remembers everything.
            </p>
          </div>
        )}

        {/* Search bar */}
        <div className="relative">
          <div
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-lg transition-all focus-within:border-accent/40 focus-within:shadow-xl cursor-text"
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
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted text-[0.95rem]"
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

        {/* Suggestion chips — only before first search */}
        {!hasSearched && (
          <div className="mt-5 flex flex-wrap gap-2 justify-center animate-fade-in">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSearch(s)}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted transition-all hover:border-accent/30 hover:text-accent hover:bg-accent/5"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {loading && !result && (
          <div className="mt-8 flex items-center gap-3 justify-center text-muted text-sm">
            <span className="h-4 w-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            <span>Searching your workspace...</span>
          </div>
        )}

        {/* Results */}
        {result && (
          <div ref={resultsRef} className="mt-8 space-y-6 animate-fade-in pb-12">
            {/* AI Response card */}
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              {/* Response header */}
              <div className="flex items-center gap-2 px-6 py-3 border-b border-border bg-accent/5">
                <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg
                    className="h-3 w-3 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-accent">Echo</span>
                {result.sourceSummary && (
                  <>
                    <span className="text-xs text-muted">·</span>
                    <span className="text-xs text-muted">
                      {result.sourceSummary}
                    </span>
                  </>
                )}
              </div>

              {/* Response body */}
              <div className="px-6 py-5 text-sm">
                <MarkdownText content={result.answer} />
                {loading && (
                  <span className="inline-block ml-0.5 w-1.5 h-4 bg-accent animate-pulse rounded-full" />
                )}
              </div>
            </div>

            {/* Source cards */}
            {result.sources.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Sources
                  </h3>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.65rem] font-medium text-accent">
                    {result.sources.length}
                  </span>
                </div>
                <div className="space-y-2 stagger-children">
                  {result.sources.map((source, i) => (
                    <SourceCard
                      key={source.id}
                      source={source}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* People mentioned */}
            {people.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  People mentioned
                </h3>
                <div className="flex flex-wrap gap-3">
                  {people.map((person) => {
                    const initials = person
                      .split(" ")
                      .map((n) => n[0])
                      .join("");
                    const count = result.sources.filter((s) =>
                      s.people.includes(person)
                    ).length;
                    return (
                      <div
                        key={person}
                        className="flex items-center gap-2 rounded-xl border border-border px-3 py-2"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                          {initials}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-foreground">
                            {person}
                          </div>
                          <div className="text-[0.6rem] text-muted">
                            {count} source{count !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reset */}
            {!loading && (
              <div className="text-center">
                <button
                  onClick={() => {
                    setQuery("");
                    setResult(null);
                    setHasSearched(false);
                    inputRef.current?.focus();
                  }}
                  className="text-xs text-muted hover:text-accent transition-colors"
                >
                  Ask another question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
