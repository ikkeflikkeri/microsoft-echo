"use client";

import { useState } from "react";
import type { EchoItem } from "@/lib/mock-data";

const typeConfig: Record<
  EchoItem["type"],
  { icon: string; color: string; label: string }
> = {
  email: { icon: "✉️", color: "var(--source-email)", label: "Email" },
  chat: { icon: "💬", color: "var(--source-chat)", label: "Chat" },
  meeting: { icon: "📹", color: "var(--source-meeting)", label: "Meeting" },
  document: {
    icon: "📄",
    color: "var(--source-document)",
    label: "Document",
  },
  calendar: { icon: "📅", color: "var(--source-calendar)", label: "Calendar" },
};

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    if (absDays === 1) return "Tomorrow";
    return `In ${absDays} days`;
  }
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

interface SourceCardProps {
  source: EchoItem;
  index: number;
}

export function SourceCard({ source, index }: SourceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[source.type];

  return (
    <div
      className="animate-fade-in rounded-xl border border-border bg-surface overflow-hidden transition-all hover:shadow-md cursor-pointer group"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Colored indicator */}
        <div
          className="mt-1 h-8 w-1 shrink-0 rounded-full"
          style={{ backgroundColor: config.color }}
        />

        {/* Source number badge */}
        <span
          className="mt-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full text-[0.65rem] font-bold text-white shrink-0"
          style={{ backgroundColor: config.color }}
        >
          {index + 1}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[0.7rem] font-medium uppercase tracking-wider"
              style={{ color: config.color }}
            >
              {config.label}
            </span>
            <span className="text-[0.7rem] text-muted">
              from {source.source}
            </span>
          </div>
          <h4 className="font-medium text-foreground text-sm leading-snug group-hover:text-accent transition-colors">
            {source.title}
          </h4>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs text-muted">{timeAgo(source.date)}</span>
            <div className="flex items-center gap-1">
              {source.people.slice(0, 3).map((person) => (
                <span
                  key={person}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-[0.55rem] font-medium text-accent"
                  title={person}
                >
                  {getInitials(person)}
                </span>
              ))}
              {source.people.length > 3 && (
                <span className="text-[0.6rem] text-muted">
                  +{source.people.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Expand chevron */}
        <svg
          className={`h-4 w-4 text-muted shrink-0 mt-1 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 ml-10">
          <div className="rounded-lg bg-background/50 p-3 text-xs leading-relaxed text-muted border border-border">
            {source.content}
          </div>
          {source.project && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[0.65rem] text-muted">Project:</span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.65rem] font-medium text-accent">
                {source.project}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
