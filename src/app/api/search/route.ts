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
  const sources = formatSources(results);

  const contextBlock = results
    .map(
      (item: EchoItem) =>
        `[${item.date}] ${item.type.toUpperCase()} from ${item.source}: "${item.title}" — ${item.content} (People: ${item.people.join(", ")})`
    )
    .join("\n\n");

  const systemPrompt = `You are Microsoft Echo, an AI-powered work memory assistant. You help users find information across their Microsoft 365 workspace — emails, Teams chats, meetings, documents, and calendar events.

You have access to the user's work data below. Answer their question based on this context. Be specific — reference dates, people, and sources. If the data mentions action items or decisions, highlight them. If something is at risk or blocked, call that out.

Be conversational but concise. Use bullet points for lists. Always cite which sources (email, meeting, chat, etc.) your information comes from.`;

  const userPrompt = results.length > 0
    ? `Here is the relevant context from the user's workspace:\n\n${contextBlock}\n\nSources found: ${sources}\n\nUser's question: "${query}"\n\nAnswer based on the context above. Be specific about dates, people, and actions.`
    : `The user asked: "${query}"\n\nNo relevant results were found in their workspace data. Respond helpfully — suggest they try rephrasing or ask about specific people, projects, or topics.`;

  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    const fallback = generateFallbackResponse(query, results, sources);
    return Response.json({ answer: fallback, sources, results: results.length });
  }

  const modelName = process.env.AI_MODEL || "glm-5-turbo";

  const result = streamText({
    model: zai.chatModel(modelName),
    system: systemPrompt,
    prompt: userPrompt,
  });

  return result.toTextStreamResponse();
}

function generateFallbackResponse(query: string, results: EchoItem[], sources: string): string {
  if (results.length === 0) {
    return `I couldn't find anything matching "${query}" in your workspace. Try asking about a specific person, project, or topic — like "What did Sarah say about Q3?" or "Show me the Acme migration status."`;
  }

  const lines = [`Here's what I found across your workspace (${sources}):\n`];

  for (const item of results.slice(0, 5)) {
    lines.push(`**${item.title}** (${item.type}, ${item.date})`);
    lines.push(`${item.content.split(".")[0]}.`);
    lines.push(`People: ${item.people.join(", ")}\n`);
  }

  if (results.length > 5) {
    lines.push(`...and ${results.length - 5} more results.`);
  }

  return lines.join("\n");
}
