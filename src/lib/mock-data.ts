export interface EchoItem {
  id: string;
  type: "email" | "chat" | "meeting" | "document" | "calendar";
  source: string;
  title: string;
  content: string;
  people: string[];
  date: string;
  project?: string;
}

export const mockData: EchoItem[] = [
  {
    id: "1",
    type: "email",
    source: "Outlook",
    title: "Q3 Roadmap Update",
    content:
      "Hi team, After reviewing the Q3 roadmap with leadership, we're prioritizing three key initiatives: 1) AI-powered search across all M365 apps, 2) Real-time collaboration improvements in Teams, 3) Enhanced security compliance dashboard. Sarah will lead the AI search workstream. Budget approved for 6 additional engineers.",
    people: ["Sarah Chen", "David Park", "Lisa Wang"],
    date: "2025-10-14",
    project: "AI Search",
  },
  {
    id: "2",
    type: "meeting",
    source: "Teams Recording",
    title: "Acme Migration Standup",
    content:
      "Database migration completed last Tuesday. API layer is in progress — team flagged a rate-limiting issue with the Acme API. David said we might need to implement request queuing. Target completion Nov 1, but may need an extra week. Sarah mentioned this in the Oct 10 all-hands. Action items: David to draft rate-limiting solution by Friday, Lisa to update Acme stakeholders.",
    people: ["David Park", "Sarah Chen", "Mike Torres"],
    date: "2025-10-15",
    project: "Acme Migration",
  },
  {
    id: "3",
    type: "chat",
    source: "Teams #acme-migration",
    title: "Rate-limiting discussion",
    content:
      "David: Just tested the Acme staging API — getting 429 errors at 100 req/s. We need to either batch our requests or implement exponential backoff. Mike: Can we get them to raise our rate limit? Sarah: I'll reach out to our Acme account rep. In the meantime, David, can you implement the queuing approach we discussed?",
    people: ["David Park", "Mike Torres", "Sarah Chen"],
    date: "2025-10-16",
    project: "Acme Migration",
  },
  {
    id: "4",
    type: "document",
    source: "OneDrive",
    title: "Q4 Planning Spreadsheet",
    content:
      "Q4 planning spreadsheet with headcount allocations, budget breakdowns, and milestone dates. Key numbers: Total budget $2.4M, 6 new hires for AI search team, Acme migration deadline Nov 1 (stretch), new pricing model rollout target Dec 15. Finance approved the updated numbers in the Aug 3 thread.",
    people: ["Lisa Wang", "Sarah Chen"],
    date: "2025-10-10",
    project: "Q4 Planning",
  },
  {
    id: "5",
    type: "email",
    source: "Outlook",
    title: "New Pricing Model — Final Approval",
    content:
      "Team, after extensive discussions with Finance and Product, we're going with the tiered pricing model. Basic: $12/user/mo, Standard: $24/user/mo (includes Echo), Enterprise: $40/user/mo (full suite + priority support). Rollout begins Dec 15. Please review the attached spreadsheet and confirm by EOW. This was first discussed in the Jun 12 leadership meeting.",
    people: ["Lisa Wang", "Mike Torres", "Sarah Chen"],
    date: "2025-08-03",
    project: "Pricing",
  },
  {
    id: "6",
    type: "meeting",
    source: "Teams Recording",
    title: "Leadership Meeting — Q3 Review",
    content:
      "Reviewed Q3 results: Revenue up 23% YoY. AI search prototype got positive feedback from beta users. Acme migration on track but tight. Discussed Q4 priorities — everyone agreed AI search is #1. Sarah presenting the full AI search roadmap to the board next month. David's team will support the Acme migration through completion before rotating to AI search.",
    people: ["Sarah Chen", "David Park", "Lisa Wang", "Mike Torres"],
    date: "2025-10-10",
    project: "AI Search",
  },
  {
    id: "7",
    type: "chat",
    source: "Teams #design-team",
    title: "Design system update",
    content:
      "Lisa: Updated the Fluent UI components for the new search interface. Check the Figma file — I've added the conversational search patterns we discussed. Mike: Looks great! Can we also add the timeline view mockups? Lisa: On it, should have them by Thursday. Also, the proactive reminder cards need a review — scheduling a 30-min sync for Friday.",
    people: ["Lisa Wang", "Mike Torres"],
    date: "2025-10-14",
    project: "AI Search",
  },
  {
    id: "8",
    type: "document",
    source: "SharePoint",
    title: "Acme Migration Technical Spec",
    content:
      "Technical specification for the Acme platform migration. Phase 1: Database migration (complete). Phase 2: API layer migration (in progress — blocked by rate-limiting). Phase 3: Frontend integration. Phase 4: Testing and rollout. Owner: David Park. Estimated completion: Nov 1 (at risk). Risk: Acme API rate limits may require architectural changes.",
    people: ["David Park"],
    date: "2025-09-28",
    project: "Acme Migration",
  },
  {
    id: "9",
    type: "calendar",
    source: "Outlook Calendar",
    title: "Acme Team Sync — Tomorrow 2pm",
    content:
      "Recurring bi-weekly sync with the Acme engineering team. Agenda: rate-limiting solution review, updated timeline, stakeholder communication plan. Attendees: David, Mike, Sarah, plus Acme CTO and 2 engineers. Last meeting's action items: David to present backoff strategy, Sarah to contact Acme account rep.",
    people: ["David Park", "Mike Torres", "Sarah Chen"],
    date: "2025-10-17",
    project: "Acme Migration",
  },
  {
    id: "10",
    type: "email",
    source: "Outlook",
    title: "Action items from design call",
    content:
      "Following up on our design team call: 1) Lisa to finalize search UI components by Thursday, 2) Mike to prepare user testing plan for next sprint, 3) Schedule design review for the proactive reminder feature on Friday. Also, we need to align on the timeline view — Sarah wants it included in the November beta. Let me know if any conflicts.",
    people: ["Lisa Wang", "Mike Torres", "Sarah Chen"],
    date: "2025-10-15",
    project: "AI Search",
  },
  {
    id: "11",
    type: "chat",
    source: "Teams #pricing-discussion",
    title: "Pricing feedback from sales",
    content:
      "Mike: Just got off a call with enterprise sales. They love the tiered model but want more flexibility on the Enterprise tier — specifically custom integrations and dedicated support. Lisa: Makes sense. Can we add a 'Custom' tier above Enterprise? Sarah: Let's discuss in Thursday's leadership meeting. The $40/user price point is already aggressive.",
    people: ["Mike Torres", "Lisa Wang", "Sarah Chen"],
    date: "2025-09-20",
    project: "Pricing",
  },
  {
    id: "12",
    type: "meeting",
    source: "Teams Recording",
    title: "All-Hands — October",
    content:
      "Sarah's update: AI search beta launching internally next month. Acme migration 70% complete — may need 1 extra week. Q4 hiring ramping up — 6 engineers joining AI search team. Mike's update: Sales pipeline looks strong. Enterprise interest in Echo is high. Lisa's update: Design system v2 shipping next week. New Fluent components ready for AI search UI.",
    people: ["Sarah Chen", "David Park", "Lisa Wang", "Mike Torres"],
    date: "2025-10-10",
    project: "AI Search",
  },
];

export function searchMockData(query: string): EchoItem[] {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter((t) => t.length > 2);

  const scored = mockData.map((item) => {
    let score = 0;
    const searchable = `${item.title} ${item.content} ${item.people.join(" ")} ${item.project || ""} ${item.source}`.toLowerCase();

    for (const term of terms) {
      if (searchable.includes(term)) score += 2;
    }

    // Boost for project name match
    if (item.project && q.includes(item.project.toLowerCase())) score += 5;

    // Boost for people match
    for (const person of item.people) {
      if (q.includes(person.toLowerCase().split(" ")[0])) score += 3;
    }

    return { item, score };
  });

  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).map((s) => s.item);
}

export function formatSources(items: EchoItem[]): string {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const label = item.type === "meeting" ? "meeting recording" : item.type;
    counts[label] = (counts[label] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([type, count]) => `${count} ${type}${count > 1 ? "s" : ""}`)
    .join(", ");
}
