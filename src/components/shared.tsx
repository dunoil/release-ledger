import {
  Column,
  Grid,
  Heading,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { ChangeEntry, Release } from "../data/release";
import { countByType, typeColour, typeInk, typeLabel } from "../data/release";

/**
 * Shared components — plain functions returning elements, used under
 * several roots, which is exactly why the email, the page and the
 * sign-off sheet can never disagree about a change.
 */

/**
 * The LedgerStrip: one cell per change in the release, coloured by type,
 * in ledger order. Built from a Grid of Columns — never an Svg, never an
 * image — because an Email cannot hold an Svg and inboxes block images.
 * It is the release, drawn.
 */
export function LedgerStrip({
  changes,
  cell = 12,
}: {
  changes: ChangeEntry[];
  cell?: number;
}) {
  return (
    <Grid
      columns={5}
      style={{ gap: 3, width: 5 * cell + 12 }}
      stackOnMobile={false}
    >
      {changes.map((change) => (
        <Column
          key={change.id}
          style={{
            backgroundColor: typeColour[change.type],
            width: cell,
            height: cell,
            borderRadius: 2,
          }}
        />
      ))}
    </Grid>
  );
}

export function Wordmark({ rel }: { rel: Release }) {
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <LedgerStrip changes={rel.changes} cell={9} />
      <Column style={{ gap: 0 }}>
        <Text
          style={{ fontWeight: 800, fontSize: 17, letterSpacing: 1 }}
        >
          {rel.product.toUpperCase()}
        </Text>
        <Text style={{ apply: ["quiet"] }}>
          Release {rel.version} · {rel.codename}
        </Text>
      </Column>
    </Row>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

/** The four counts, as a ruled ledger line. Used by email, page, canvas. */
export function CountLine({ rel }: { rel: Release }) {
  const parts = (["added", "changed", "fixed", "breaking"] as const).map(
    (t) => `${countByType(rel.changes, t)} ${typeLabel[t].toLowerCase()}`,
  );
  return (
    <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
      {parts.join("  ·  ")}
    </Text>
  );
}

/** Every change, as a table with its ledger id — email and document.
 *  TableCells hold text and inline Spans directly, never a nested Text. */
export function ChangeTable({ rel }: { rel: Release }) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Change</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Type</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Ledger id</Span>
        </TableCell>
      </TableRow>
      {rel.changes.map((change) => (
        <TableRow key={change.id}>
          <TableCell>
            <Span style={{ fontWeight: 700, color: typeInk[change.type] }}>
              {change.title}
            </Span>{" "}
            — {change.scope}
          </TableCell>
          <TableCell>
            <Span style={{ color: typeInk[change.type], fontWeight: 700 }}>
              {typeLabel[change.type]}
            </Span>
          </TableCell>
          <TableCell>
            <Span style={{ apply: ["mono"] }}>{change.id}</Span>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

/** The breaking changes, called out on their own — email and page. */
export function BreakingBlock({ rel }: { rel: Release }) {
  const breaking = rel.changes.filter((c) => c.type === "breaking");
  if (breaking.length === 0) return null;
  return (
    <Column
      style={{
        gap: 10,
        padding: 18,
        backgroundColor: "#fdf0ef",
        border: { width: 1, style: "solid", color: "#e5484d" },
        borderRadius: 6,
      }}
    >
      <Text style={{ fontWeight: 800, color: typeInk.breaking }}>
        Read these first — {breaking.length} breaking changes
      </Text>
      {breaking.map((change) => (
        <Text key={change.id} style={{ fontSize: 14 }}>
          <Span style={{ apply: ["mono"], fontWeight: 700 }}>
            {change.id}
          </Span>{" "}
          <Span style={{ fontWeight: 700 }}>{change.title}.</Span>{" "}
          {change.detail}
        </Text>
      ))}
    </Column>
  );
}

export function KitFooter() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        Ledgerline · Every version, on the record · Changelog RSS and API
        available
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One release file rendered this — email, page, release notes and
        announcement card — with Hyper Elements.
      </Text>
    </Column>
  );
}

export function ReleaseHeading({ rel }: { rel: Release }) {
  return (
    <Column style={{ gap: 8 }}>
      <Eyebrow>{`Release ${rel.version} — ${rel.codename}`}</Eyebrow>
      <Heading level={1}>
        {rel.product} {rel.version} is on the record
      </Heading>
    </Column>
  );
}
