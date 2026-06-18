import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { OutcomeBadge, Pill } from "@/components/badges";
import { allStages, companies, experiences, levels, years } from "@/data/experiences";

type Search = {
  q?: string;
  company?: string;
  level?: string;
  stage?: string;
  year?: string;
};

export const Route = createFileRoute("/experiences/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    company: typeof s.company === "string" ? s.company : undefined,
    level: typeof s.level === "string" ? s.level : undefined,
    stage: typeof s.stage === "string" ? s.stage : undefined,
    year: typeof s.year === "string" ? s.year : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse interview experiences — InterviewVault" },
      {
        name: "description",
        content:
          "Browse and filter real interview experiences by company, role level, stage, and year.",
      },
    ],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = useMemo(() => {
    const q = search.q?.toLowerCase().trim() ?? "";
    return experiences.filter((e) => {
      if (search.company && e.company !== search.company) return false;
      if (search.level && e.level !== search.level) return false;
      if (search.stage && !e.stages.includes(search.stage)) return false;
      if (search.year && String(e.year) !== search.year) return false;
      if (!q) return true;
      const hay = [
        e.company,
        e.role,
        e.level,
        e.tip,
        ...e.stages,
        ...e.questions,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [search]);

  const update = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const activeFilters =
    [search.company, search.level, search.stage, search.year, search.q].filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-page py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Browse experiences
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} of {experiences.length} experiences
              {activeFilters > 0 ? ` — ${activeFilters} filter${activeFilters > 1 ? "s" : ""} active` : ""}
            </p>
          </div>
          {activeFilters > 0 && (
            <button
              onClick={() => navigate({ search: {} })}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-4 rounded-xl border border-border bg-paper p-4 shadow-sm lg:sticky lg:top-20 lg:self-start">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Search
              </label>
              <input
                value={search.q ?? ""}
                onChange={(e) => update({ q: e.target.value || undefined })}
                placeholder="Keyword…"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <FacetSelect
              label="Company"
              value={search.company ?? ""}
              onChange={(v) => update({ company: v || undefined })}
              options={companies}
            />
            <FacetSelect
              label="Level"
              value={search.level ?? ""}
              onChange={(v) => update({ level: v || undefined })}
              options={levels}
            />
            <FacetSelect
              label="Stage"
              value={search.stage ?? ""}
              onChange={(v) => update({ stage: v || undefined })}
              options={allStages}
            />
            <FacetSelect
              label="Year"
              value={search.year ?? ""}
              onChange={(v) => update({ year: v || undefined })}
              options={years.map(String)}
            />
          </aside>

          <section>
            {filtered.length === 0 ? (
              <EmptyState onReset={() => navigate({ search: {} })} />
            ) : (
              <ul className="space-y-4">
                {filtered.map((e) => (
                  <li key={e.slug}>
                    <Link
                      to="/experiences/$slug"
                      params={{ slug: e.slug }}
                      className="group block rounded-xl border border-border bg-paper p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-display text-xl font-semibold tracking-tight">
                            {e.company}{" "}
                            <span className="text-muted-foreground">· {e.level}</span>
                          </h2>
                          <p className="text-sm text-muted-foreground">{e.role}</p>
                        </div>
                        <OutcomeBadge outcome={e.outcome} />
                      </div>
                      <p className="mt-3 text-sm text-foreground/80 line-clamp-2">
                        “{e.questions[0]}”
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {e.stages.map((s) => (
                            <Pill key={s}>{s}</Pill>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{e.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function FacetSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      >
        <option value="">Any</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-paper p-10 text-center">
      <p className="font-display text-xl font-semibold">No matches yet</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Try removing a filter or broadening your search.
      </p>
      <button
        onClick={onReset}
        className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Clear filters
      </button>
    </div>
  );
}
