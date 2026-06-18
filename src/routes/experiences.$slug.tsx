import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { OutcomeBadge, Pill } from "@/components/badges";
import { experiences, getExperience } from "@/data/experiences";

export const Route = createFileRoute("/experiences/$slug")({
  loader: ({ params }) => {
    const exp = getExperience(params.slug);
    if (!exp) throw notFound();
    return { exp } as { exp: import("@/data/experiences").Experience };
  },
  head: ({ loaderData }) => {
    const exp = loaderData?.exp;
    if (!exp) return { meta: [{ title: "Experience not found" }] };
    const title = `${exp.company} ${exp.level} ${exp.role} Interview Questions (${exp.date})`;
    const desc = `${exp.questions.length} real interview questions from a ${exp.company} ${exp.role} (${exp.level}) candidate — outcome: ${exp.outcome}. ${exp.tip}`;
    return {
      meta: [
        { title: `${title} — InterviewVault` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container-page flex-1 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold">Experience not found</h1>
        <p className="mt-3 text-muted-foreground">It may have been removed or never existed.</p>
        <Link
          to="/experiences"
          className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Browse all
        </Link>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ExperienceDetail,
});

function ExperienceDetail() {
  const { exp } = Route.useLoaderData();
  const related = experiences.filter((e) => e.company === exp.company && e.slug !== exp.slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-page py-10">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/experiences" className="hover:text-foreground hover:underline">
            ← Back to all experiences
          </Link>
        </nav>

        <article className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <OutcomeBadge outcome={exp.outcome} />
              <span className="text-xs text-muted-foreground">{exp.date}</span>
            </div>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              {exp.company} {exp.level} {exp.role} interview questions
            </h1>
            <p className="mt-3 text-muted-foreground">
              {exp.questions.length} questions across {exp.stages.length} stages.
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {exp.stages.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>

            <div className="mt-8 rounded-xl border-l-4 border-primary bg-paper p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Key tip
              </p>
              <p className="mt-1 font-display text-lg italic leading-snug">“{exp.tip}”</p>
            </div>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                The questions
              </h2>
              <ol className="mt-4 space-y-3">
                {exp.questions.map((q, i) => (
                  <QuestionRow key={i} index={i + 1} question={q} />
                ))}
              </ol>
            </section>

            {exp.sourceUrl && (
              <p className="mt-8 text-xs text-muted-foreground">
                Source:{" "}
                <a
                  href={exp.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {exp.sourceUrl}
                </a>
              </p>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-paper p-5 shadow-sm">
              <p className="font-display text-lg font-semibold">Had your own interview?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Help the next candidate. Takes 3 minutes.
              </p>
              <Link
                to="/submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Submit your experience
              </Link>
            </div>

            {related.length > 0 && (
              <div className="rounded-xl border border-border bg-paper p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  More from {exp.company}
                </p>
                <ul className="mt-3 space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to="/experiences/$slug"
                        params={{ slug: r.slug }}
                        className="block text-sm hover:text-primary"
                      >
                        <span className="font-medium">{r.level} {r.role}</span>
                        <span className="block text-xs text-muted-foreground">{r.date}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function QuestionRow({ index, question }: { index: number; question: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(question);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  };
  return (
    <li className="group flex items-start gap-4 rounded-xl border border-border bg-paper p-4 shadow-sm">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary font-display text-sm font-semibold text-secondary-foreground">
        {index}
      </span>
      <p className="flex-1 text-foreground/90 leading-relaxed">{question}</p>
      <button
        onClick={copy}
        className="shrink-0 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Copy question"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </li>
  );
}
