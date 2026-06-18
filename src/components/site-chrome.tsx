import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/70 backdrop-blur sticky top-0 z-40">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-display text-lg font-semibold"
          >
            IV
          </span>
          <span className="font-display text-lg tracking-tight">
            Interview<span className="text-primary">Vault</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/experiences"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            activeProps={{ className: "text-foreground bg-accent" }}
          >
            Browse
          </Link>
          <Link
            to="/submit"
            className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Submit yours
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/60">
      <div className="container-page flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />{" "}
          Curated from 100+ real experiences.
        </p>
        <p>© {new Date().getFullYear()} InterviewVault. Not affiliated with any company listed.</p>
      </div>
    </footer>
  );
}
