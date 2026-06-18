import { type ReactNode } from "react";
import type { Outcome } from "@/data/experiences";

export function OutcomeBadge({ outcome }: { outcome: Outcome }) {
  const styles: Record<Outcome, string> = {
    Offer: "bg-success/15 text-success border-success/25",
    Reject: "bg-destructive/10 text-destructive border-destructive/25",
    Unknown: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[outcome]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {outcome}
    </span>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
      {children}
    </span>
  );
}
