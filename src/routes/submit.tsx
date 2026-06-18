import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit your interview experience — InterviewVault" },
      {
        name: "description",
        content:
          "Share your interview experience to help the next candidate. Takes about 3 minutes.",
      },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container-page flex-1 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pay it forward
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Submit your interview experience.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Three minutes of your time saves the next candidate weeks of guesswork. We review every
            submission before it goes live — no names, no PII.
          </p>

          <ol className="mt-10 space-y-4">
            {[
              ["Fill out the form", "Company, role, stages, the actual questions, your outcome, and one tip."],
              ["We clean it up", "An LLM extracts and structures your answer. A human moderator reviews."],
              ["It goes live", "Indexed, searchable, and shared — usually within 48 hours."],
            ].map(([title, desc], i) => (
              <li
                key={title}
                className="flex items-start gap-4 rounded-xl border border-border bg-paper p-5 shadow-sm"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-base font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-border bg-paper p-6 shadow-paper">
            <p className="font-display text-xl font-semibold">Open the submission form</p>
            <p className="mt-1 text-sm text-muted-foreground">
              We use a Google Form for submissions. It opens in a new tab.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="https://forms.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Open the form ↗
              </a>
              <Link
                to="/experiences"
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent"
              >
                Browse what's there first
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Replace this link with your actual Google Form URL before launch.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
