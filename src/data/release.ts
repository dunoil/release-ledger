/**
 * The release file — the kit's single source of truth.
 *
 * One release record renders the announcement email, the public release
 * page, the sign-off release notes (PDF) and the announcement cards.
 * Change `release` and every artefact agrees, because every artefact
 * reads this file.
 */

export type ChangeType = "added" | "changed" | "fixed" | "breaking";

export interface ChangeEntry {
  /** Stable ledger id, e.g. "RL-1042" — printed on the sign-off sheet. */
  id: string;
  type: ChangeType;
  /** Product area, e.g. "Billing". */
  scope: string;
  title: string;
  detail: string;
}

export interface Release {
  product: string;
  version: string;
  codename: string;
  date: string;
  /** One-paragraph summary used by the email and the page hero. */
  summary: string;
  changes: ChangeEntry[];
  teams: string[];
}

export interface Subscriber {
  firstName: string;
  plan: string;
  ref: string;
}

/** Ink per change type — dark enough for text on paper (≥ 4.5:1). */
export const typeInk: Record<ChangeType, string> = {
  added: "#0e7a3d",
  changed: "#1d4ed8",
  fixed: "#9a6206",
  breaking: "#b42318",
};

/** Bright per change type — for bars, dots and bands, never body text. */
export const typeColour: Record<ChangeType, string> = {
  added: "#22a355",
  changed: "#3b82f6",
  fixed: "#e9a426",
  breaking: "#e5484d",
};

export const typeLabel: Record<ChangeType, string> = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  breaking: "Breaking",
};

export const release: Release = {
  product: "Ledgerline",
  version: "4.2.0",
  codename: "Double Entry",
  date: "Tuesday 18 November 2026",
  summary:
    "The release we owed you: bank feeds that reconcile themselves, an audit trail you can hand to an accountant without flinching, and the two breaking changes clearly marked before anything else. Nine changes, each with a ledger id you can quote back to us.",
  teams: ["Engineering", "Support", "Finance Ops", "Compliance"],
  changes: [
    {
      id: "RL-1042",
      type: "added",
      scope: "Banking",
      title: "Self-reconciling bank feeds",
      detail:
        "Feeds now match transactions to invoices automatically and show their working. Anything unmatched lands in one review queue instead of three reports.",
    },
    {
      id: "RL-1037",
      type: "added",
      scope: "Reports",
      title: "Accountant-ready audit pack",
      detail:
        "One export with the trial balance, every journal entry and the full change history of each figure, signed with the release id of the data it came from.",
    },
    {
      id: "RL-1031",
      type: "added",
      scope: "Billing",
      title: "Proration previews",
      detail: "See exactly what a plan change will charge, day by day, before you confirm it. No more surprise invoices explained after the fact.",
    },
    {
      id: "RL-1028",
      type: "changed",
      scope: "Invoices",
      title: "Invoice numbers are now per-entity",
      detail:
        "Multi-entity accounts get independent sequences per entity. Existing numbers are untouched; the change applies from this release forward.",
    },
    {
      id: "RL-1025",
      type: "changed",
      scope: "Search",
      title: "Search covers attachments and notes",
      detail: "Receipts, PDFs and free-text notes are indexed alongside transactions, with the match highlighted in place.",
    },
    {
      id: "RL-1019",
      type: "fixed",
      scope: "Imports",
      title: "CSV imports no longer drop the last row",
      detail:
        "Files without a trailing newline silently lost their final transaction. Found because a customer counted. Fixed, with a regression test named after them.",
    },
    {
      id: "RL-1016",
      type: "fixed",
      scope: "Tax",
      title: "Rounding on multi-rate invoices",
      detail: "Invoices mixing two tax rates could be a cent out against the ledger total. The ledger total now wins, always.",
    },
    {
      id: "RL-1011",
      type: "breaking",
      scope: "API",
      title: "API v1 responses lose the `total_tax` alias",
      detail:
        "The deprecated alias for `tax_total` is removed in API v1 responses. The field itself is unchanged; update integrations that read the alias before upgrading.",
    },
    {
      id: "RL-1009",
      type: "breaking",
      scope: "Exports",
      title: "Legacy XLS export retired",
      detail:
        "The pre-2019 .xls exporter is removed. CSV and XLSX exports cover every report it produced; saved schedules were migrated automatically.",
    },
  ],
};

export const sampleSubscriber: Subscriber = {
  firstName: "Maya",
  plan: "Practice (12 seats)",
  ref: "LL-2041",
};

const FIRST = [
  "Maya", "Jonas", "Priya", "Tomas", "Aisha", "Leo", "Nina", "Omar",
  "Sofia", "Kenji", "Alba", "Ruth", "Ivan", "Cleo", "Hugo", "Mina",
  "Ezra", "Tara", "Paul", "Ines",
];
const PLANS = [
  "Solo", "Practice (4 seats)", "Practice (12 seats)", "Firm (30 seats)",
  "Firm (75 seats)",
];

/**
 * Deterministic subscriber generation — no clock, no randomness.
 * Regenerating the batch after fixing one record reproduces every other
 * record byte-for-byte, which is what makes a corrections pass honest.
 */
export function makeSubscribers(count: number): Subscriber[] {
  const out: Subscriber[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      firstName: FIRST[(i * 7 + 3) % FIRST.length],
      plan: PLANS[(i * 3 + 1) % PLANS.length],
      ref: `LL-${2000 + ((i * 37) % 900)}`,
    });
  }
  return out;
}

export function countByType(changes: ChangeEntry[], type: ChangeType): number {
  return changes.filter((c) => c.type === type).length;
}
