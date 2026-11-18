import {
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Text,
} from "@hyper-elements/react";
import { release } from "../src/data/release";
import type { Release } from "../src/data/release";
import { ledgerTheme } from "../src/theme";
import { ChangeTable, LedgerStrip } from "../src/components/shared";

/**
 * OUTPUT 3 — The sign-off release notes (Document root -> print HTML via
 * render(), PDF via renderPdf() from @hyper-elements/react/pdf).
 *
 * The formal record: one A4 sheet per team that must sign the release
 * off. Each sheet carries the same change table the email sent, the
 * release's ledger strip, and lines for a name, a signature and a date —
 * written for a human with a pen, not a browser print button.
 */
export function ReleaseNotesDocument({ rel = release }: { rel?: Release }) {
  return (
    <Document
      theme={ledgerTheme}
      size="A4"
      margin={42}
      title={`${rel.product} ${rel.version} — sign-off release notes`}
      lang="en"
      style={{ gap: 20 }}
    >
      <PageHeader style={{ padding: { bottom: 10 } }}>
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <LedgerStrip changes={rel.changes} cell={8} />
          <Text style={{ fontWeight: 700, fontSize: 11 }}>
            {rel.product} {rel.version} — {rel.codename} · Sign-off release
            notes · {rel.date}
          </Text>
        </Row>
      </PageHeader>
      <PageFooter style={{ padding: { top: 10 } }}>
        <Text style={{ fontSize: 10, color: "#4d5c6a" }}>
          Sheet <PageNumber /> of <PageNumber total /> · One release file
          rendered this record · Ledgerline · {rel.date}
        </Text>
      </PageFooter>

      {rel.teams.map((team) => (
        <Document.Page key={team} style={{ gap: 16 }}>
          <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
            <Column style={{ gap: 4 }}>
              <Heading level={1} style={{ fontSize: 26 }}>
                Release notes
              </Heading>
              <Text>
                For {team} sign-off · {rel.product} {rel.version} ·{" "}
                {rel.date}
              </Text>
            </Column>
            <Text style={{ apply: ["stamp"], color: "#1d4ed8" }}>
              SIGN-OFF
            </Text>
          </Row>

          <Text>{rel.summary}</Text>

          <ChangeTable rel={rel} />

          <Column style={{ gap: 10 }}>
            <Heading level={3}>Sign-off</Heading>
            <Text>
              {team} confirms these notes match the build they reviewed.
              Breaking changes RL-1011 and RL-1009 were read aloud in the
              release meeting; dissent, if any, is recorded below the line.
            </Text>
            <Text>
              Name ______________________ · Signature ______________________
              · Date ____________
            </Text>
            <Text>
              Dissent / conditions
              ______________________________________________________
            </Text>
          </Column>

          <Column
            style={{
              gap: 6,
              padding: { top: 12 },
              border: { top: "1px dashed #4d5c6a" },
            }}
          >
            <Text style={{ fontWeight: 700 }}>
              Thank you — this sheet joins the permanent release record.
            </Text>
            <Text>
              File it with the release. When a customer quotes a ledger id,
              this is the document that answers.
            </Text>
          </Column>
        </Document.Page>
      ))}
    </Document>
  );
}

ReleaseNotesDocument.PreviewProps = { rel: release };
export default ReleaseNotesDocument;
