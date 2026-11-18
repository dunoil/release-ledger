import { Column, Row, Text, defineElement, prop, token } from "@hyper-elements/react";
import { typeColour, typeInk, typeLabel } from "../data/release";
import type { ChangeType } from "../data/release";

/**
 * `ledger.ChangeEntry` — one change, as a ruled ledger row: a colour bar
 * for its type, its title and detail, and its ledger id in mono.
 *
 * A custom element because the entry is the kit's unit of reuse: the page
 * lists nine of them, and a mistyped change type or a missing ledger id
 * should be a diagnostic with a path, not a broken page. Props are typed
 * with the prop.* builders, so the checker and the editor both enforce
 * them.
 */
export const ChangeEntryCard = defineElement({
  type: "ledger.ChangeEntry",
  label: "Change entry",
  description:
    "One change in the release: type, scope, title, detail and its ledger id.",
  props: {
    entryId: prop.text({ label: "Ledger id", required: true }),
    kind: prop.choice(["added", "changed", "fixed", "breaking"] as const, {
      label: "Change type",
      default: "added",
    }),
    scope: prop.text({ label: "Scope", required: true }),
    title: prop.text({ label: "Title", required: true }),
    detail: prop.text({ label: "Detail", required: true }),
  },
  render: ({ entryId, kind, scope, title, detail }) => {
    const type = kind as ChangeType;
    return (
      <Column
        style={{
          gap: 8,
          backgroundColor: token("colors.paper"),
          border: { width: 1, style: "solid", color: token("colors.border") },
          borderRadius: 8,
          padding: 18,
        }}
      >
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <Column
            style={{
              backgroundColor: typeColour[type],
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
          <Text
            style={{
              color: typeInk[type],
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {typeLabel[type]}
          </Text>
          <Text style={{ apply: ["quiet"] }}>{scope}</Text>
          <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
            {entryId}
          </Text>
        </Row>
        <Text style={{ fontWeight: 700, fontSize: 16 }}>{title}</Text>
        <Text style={{ fontSize: 14 }}>{detail}</Text>
      </Column>
    );
  },
});
