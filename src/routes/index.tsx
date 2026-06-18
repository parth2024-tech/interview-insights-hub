import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { companies, experiences, levels, years } from "@/data/experiences";
import { OutcomeBadge } from "@/components/badges";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InterviewVault — Real interview questions, curated" },
      {
        name: "description",
        content:
          "Find real interview questions and outcomes from candidates at Google, Stripe, Meta, Amazon and more. No fluff, no logins.",
      },
      { property: "og:title", content: "InterviewVault" },
      {
        property: "og:description",
        content: "Search a curated vault of real interview experiences.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [company, setCompany] = useState("");
  const [level, setLevel] = useState("");
  const [year, setYear] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const search: Record<string, string> = {};
    if (q) search.q = q;
    if (company) search.company = company;
    if (level) search.level = level;
    if (year) search.year = year;
    navigate({ to: "/experiences", search });
  }

  const recent = experiences.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container-page pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {experiences.length} experiences and counting
            </span>
            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Real interview questions,
              <span className="italic text-primary"> from real candidates.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              A small, hand-curated vault. No subscription. No login. Just the questions you'll
              actually be asked.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-paper p-3 shadow-paper"
          >
            <div className="flex items-center gap-2 rounded-xl bg-background px-4 py-3">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by company, role, or keyword…"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <FilterSelect value={company} onChange={setCompany} label="Company" options={companies} />
              <FilterSelect value={level} onChange={setLevel} label="Level" options={levels} />
              <FilterSelect
                value={year}
                onChange={setYear}
                label="Year"
                options={years.map(String)}
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Find my interview
              </button>
            </div>
          </form>

          <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Try:</span>
            {["Google L4", "Stripe backend", "Amazon LP", "OpenAI"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQ(s);
                  navigate({ to: "/experiences", search: { q: s } });
                }}
                className="rounded-full border border-border bg-paper px-3 py-1 transition-colors hover:bg-accent"
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <section className="container-page pb-24">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Recently added
            </h2>
            <Link
              to="/experiences"
              className="text-sm font-medium text-primary hover:underline"
            >
              Browse all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {recent.map((e) => (
              <Link
                key={e.slug}
                to="/experiences/$slug"
                params={{ slug: e.slug }}
                className="group rounded-xl border border-border bg-paper p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight">
                      {e.company} · {e.level}
                    </p>
                    <p className="text-sm text-muted-foreground">{e.role}</p>
                  </div>
                  <OutcomeBadge outcome={e.outcome} />
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-foreground/80">
                  “{e.questions[0]}”
                </p>
                <p className="mt-3 text-xs text-muted-foreground">{e.date}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors hover:bg-accent focus:border-ring focus:ring-2 focus:ring-ring/30"
    >
      <option value="">{label} (any)</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
