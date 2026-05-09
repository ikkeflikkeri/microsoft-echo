"use client";

import React from "react";

interface MarkdownTextProps {
  content: string;
  className?: string;
}

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Inline code `text`
    const codeMatch = remaining.match(/^(.*?)`([^`]+)`(.*)$/);
    if (codeMatch) {
      if (codeMatch[1]) nodes.push(codeMatch[1]);
      nodes.push(
        <code
          key={key++}
          className="rounded bg-black/5 px-1.5 py-0.5 text-[0.875em] font-mono dark:bg-white/10"
        >
          {codeMatch[2]}
        </code>
      );
      remaining = codeMatch[3];
      continue;
    }

    // Bold **text**
    const boldMatch = remaining.match(/^(.*?)\*\*([^*]+)\*\*(.*)$/);
    if (boldMatch) {
      if (boldMatch[1]) nodes.push(boldMatch[1]);
      nodes.push(
        <strong key={key++} className="font-semibold">
          {boldMatch[2]}
        </strong>
      );
      remaining = boldMatch[3];
      continue;
    }

    // Italic *text*
    const italicMatch = remaining.match(/^(.*?)\*([^*]+)\*(.*)$/);
    if (italicMatch) {
      if (italicMatch[1]) nodes.push(italicMatch[1]);
      nodes.push(<em key={key++}>{italicMatch[2]}</em>);
      remaining = italicMatch[3];
      continue;
    }

    // Source reference [N]
    const refMatch = remaining.match(/^(.*?)\[(\d+)\](.*)$/);
    if (refMatch) {
      if (refMatch[1]) nodes.push(refMatch[1]);
      nodes.push(
        <sup
          key={key++}
          className="inline-flex items-center justify-center min-w-[1.2em] h-[1.2em] rounded-full bg-accent/15 text-accent text-[0.7em] font-medium align-super cursor-default"
        >
          {refMatch[2]}
        </sup>
      );
      remaining = refMatch[3];
      continue;
    }

    nodes.push(remaining);
    break;
  }

  return nodes;
}

export function MarkdownText({ content, className }: MarkdownTextProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let listItems: React.ReactNode[] = [];
  let listType: "ul" | "ol" = "ul";

  const flushList = () => {
    if (listItems.length > 0) {
      const Tag = listType;
      elements.push(
        <Tag
          key={key++}
          className={`ml-4 ${listType === "ol" ? "list-decimal" : "list-disc"} space-y-1 text-foreground/90`}
        >
          {listItems}
        </Tag>
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trimEnd();

    // H3
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h4
          key={key++}
          className="font-semibold text-foreground mt-4 mb-1 text-[0.95em]"
        >
          {parseInline(trimmed.slice(4))}
        </h4>
      );
      continue;
    }

    // H2
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h3 key={key++} className="font-semibold text-foreground mt-4 mb-1">
          {parseInline(trimmed.slice(3))}
        </h3>
      );
      continue;
    }

    // Unordered list
    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listItems.push(
        <li key={key++} className="text-foreground/90 leading-relaxed pl-1">
          {parseInline(ulMatch[1])}
        </li>
      );
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listItems.push(
        <li key={key++} className="text-foreground/90 leading-relaxed pl-1">
          {parseInline(olMatch[1])}
        </li>
      );
      continue;
    }

    // Horizontal rule
    if (trimmed.match(/^[-*_]{3,}$/)) {
      flushList();
      elements.push(
        <hr key={key++} className="border-border my-4" />
      );
      continue;
    }

    // Empty line
    if (trimmed === "") {
      flushList();
      continue;
    }

    // Paragraph
    flushList();
    elements.push(
      <p key={key++} className="leading-relaxed text-foreground/90">
        {parseInline(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className={className}>{elements}</div>;
}
