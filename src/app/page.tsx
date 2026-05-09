import { EchoSearch } from "@/components/echo-search";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-light/40 to-transparent dark:from-accent-light/20" />
        <div className="relative z-10 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Microsoft Echo
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Remember
            <span className="text-accent"> everything.</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Your AI-powered work memory. Find anything across email, chats,
            docs, meetings, and files — in seconds. Not keyword search.
            Conversational understanding of your entire work life.
          </p>

          {/* Search bar */}
          <div className="mt-10 w-full max-w-lg mx-auto">
            <EchoSearch />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Not search. <span className="text-accent">Understanding.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Echo connects the dots across your entire Microsoft 365 workspace —
            finding relationships you didn&apos;t know existed.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="Universal Search"
              description="Ask in natural language. Echo searches across every Microsoft 365 app simultaneously — email, Teams, OneDrive, Outlook, and more."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Connections"
              description="Echo surfaces relationships between emails, documents, meetings, and chats. See the full picture, not just fragments."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
              title="Timeline"
              description="A unified stream of your work life. Scroll back to any moment and see every meeting, email, edit, and message in context."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              }
              title="Synthesis"
              description="Ask Echo to summarize complex topics. It reads across Slack, email, meetings, and docs to give you one clear answer."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
              title="Proactive Reminders"
              description="Echo doesn't wait for you to ask. It surfaces what you need before meetings, flags follow-ups, and connects past context to current work."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              title="Privacy First"
              description="Your data stays yours. Echo processes context locally when possible. You control what it sees and can ask it to forget anything."
            />
          </div>
        </div>
      </section>

      {/* Demo section */}
      <section className="px-6 py-24 bg-surface dark:bg-surface/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            See Echo in action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            One question. Every answer.
          </p>

          <div className="mt-12 space-y-6">
            <DemoQuery
              query="What's the current status of the Acme migration?"
              sources={["3 emails", "2 Teams channels", "1 meeting recording", "4 documents"]}
              answer="The Acme migration is 70% complete. The database migration finished last Tuesday (email from David, Oct 14). The API layer is in progress — the team flagged a rate-limiting issue in yesterday's standup (Teams #acme-migration). Target completion is Nov 1, but Sarah mentioned in the Oct 10 all-hands that they may need an extra week."
            />
            <DemoQuery
              query="Show me every conversation about pricing changes"
              sources={["5 emails", "3 meetings", "7 Slack messages", "2 spreadsheets"]}
              answer="Found 17 items across 4 apps. Pricing was first discussed in the Jun 12 leadership meeting. The final model was agreed on in the Aug 3 email thread with Finance. The updated spreadsheet is in the Q4 Planning folder on OneDrive."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Stop searching.
            <br />
            <span className="text-accent">Start remembering.</span>
          </h2>
          <p className="mt-6 text-lg text-muted">
            Microsoft Echo is coming to Microsoft 365. Be the first to
            experience the future of work memory.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25">
              Join the waitlist
            </button>
            <button className="rounded-full border border-black/10 px-8 py-3.5 text-sm font-semibold transition-all hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
              Watch the demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 px-6 py-12 dark:border-white/5">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <div className="h-5 w-5 rounded bg-accent" />
            Microsoft Echo
          </div>
          <p>
            A concept by Microsoft. Built with Next.js + Vercel.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-surface p-6 transition-all hover:shadow-lg hover:shadow-accent/5 dark:border-white/5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function DemoQuery({
  query,
  sources,
  answer,
}: {
  query: string;
  sources: string[];
  answer: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-background p-6 dark:border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {sources.map((source) => (
          <span
            key={source}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            {source}
          </span>
        ))}
      </div>
      <div className="rounded-xl bg-surface p-4 text-sm leading-relaxed text-muted border border-black/5 dark:border-white/5">
        {answer}
      </div>
    </div>
  );
}
