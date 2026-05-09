import { streamText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { searchMockData, formatSources, type EchoItem } from "@/lib/mock-data";

const zai = createOpenAICompatible({
  name: "z-ai",
  baseURL: process.env.AI_BASE_URL || "https://api.z.ai/api/coding/paas/v4",
  apiKey: process.env.AI_API_KEY,
});

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query || typeof query !== "string") {
    return Response.json({ error: "Query is required" }, { status: 400 });
  }

  const results = searchMockData(query);
  const sourceSummary = formatSources(results);

  const contextBlock = results
    .map(
      (item: EchoItem, i: number) =>
        `[${i + 1}] [${item.date}] ${item.type.toUpperCase()} from ${item.source}: "${item.title}" — ${item.content} (People: ${item.people.join(", ")})`
    )
    .join("\n\n");

  const systemPrompt = `You are Microsoft Echo, an AI-powered work memory assistant. You help users find information across their Microsoft 365 workspace — emails, Teams chats, meetings, documents, and calendar events.

You have access to the user's work data below. Answer their question based on this context. Be specific — reference dates, people, and sources. If the data mentions action items or decisions, highlight them. If something is at risk or blocked, call that out.

Format your response with markdown:
- Use **bold** for key terms, people names, and important dates
- Use bullet points for lists and action items
- Use ### for section headers when organizing complex answers
- Reference sources using [1], [2], etc. notation matching the source numbers provided

Be conversational but concise. Always cite which sources your information comes from.`;

  const userPrompt =
    results.length > 0
      ? `Here is the relevant context from the user's workspace:\n\n${contextBlock}\n\nSources found: ${sourceSummary}\n\nUser's question: "${query}"\n\nAnswer based on the context above. Be specific about dates, people, and actions. Use source reference numbers [1], [2], etc.`
      : `The user asked: "${query}"\n\nNo relevant results were found in their workspace data. Respond helpfully — suggest they try rephrasing or ask about specific people, projects, or topics.`;

  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    const fallback = generateFallbackResponse(query, results);
    return Response.json({
      answer: fallback,
      sources: results,
      sourceSummary,
    });
  }

  const modelName = process.env.AI_MODEL || "glm-5-turbo";

  const result = streamText({
    model: zai.chatModel(modelName),
    system: systemPrompt,
    prompt: userPrompt,
  });

  // Custom stream: first line is JSON metadata with sources, rest is AI text
  const encoder = new TextEncoder();
  const meta = JSON.stringify({ sources: results, sourceSummary });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(meta + "\n"));
        for await (const chunk of result.textStream) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch {
        controller.enqueue(
          encoder.encode("\n\nError generating response. Please try again.")
        );
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function generateFallbackResponse(
  query: string,
  results: EchoItem[]
): string {
  if (results.length === 0) {
    return `I couldn't find anything matching "${query}" in your workspace. Try asking about a specific person, project, or topic — like "What did Sarah say about Q3?" or "Show me the Acme migration status."`;
  }

  const lines = [`Here's what I found across your workspace:\n`];

  for (let i = 0; i < Math.min(results.length, 5); i++) {
    const item = results[i];
    lines.push(`- **${item.title}** [${i + 1}]`);
    lines.push(
      `  ${item.type} from ${item.source} · ${item.people.join(", ")} · ${item.date}`
    );
  }

  if (results.length > 5) {
    lines.push(`\n...and ${results.length - 5} more results.`);
  }

  return lines.join("\n");
}
