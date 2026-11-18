import { defineTheme } from "@hyper-elements/react";

/**
 * RELEASE LEDGER theme — "the ledger": cool paper, slate ink, one signal
 * blue, and a colour per change type (the data carries those). All-sans
 * with monospace stamps: the opposite pole from an editorial serif kit.
 *
 * One theme serves all four roots, so it carries NO `mobile` blocks
 * (phone styles are an error in a Document or a Canvas); Email and Page
 * templates set their own phone styles.
 */
export const ledgerTheme = defineTheme({
  colors: {
    background: "#eef1f4",
    paper: "#fbfcfe",
    foreground: "#101c28",
    muted: "#4d5c6a",
    primary: "#1d4ed8",
    primaryForeground: "#ffffff",
    border: "#ccd5de",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 28, xl: 44 },
  fontSizes: { sm: 12, md: 15, lg: 19, xl: 30 },
  lineHeights: { tight: 1.25, normal: 1.55 },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Inter, Helvetica, Arial, sans-serif",
    mono: "'Cascadia Code', Consolas, 'Courier New', monospace",
  },
  radii: { sm: 4, md: 8 },
  elements: {
    Heading: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
      fontWeight: 700,
      letterSpacing: -0.5,
      by: {
        level: {
          1: { fontSize: 32 },
          2: { fontSize: 22 },
          3: { fontSize: 16 },
        },
      },
    },
    Text: { fontSize: 15, lineHeight: 1.55 },
    Button: {
      backgroundColor: "#1d4ed8",
      fontWeight: 700,
      padding: [12, 22],
      borderRadius: 6,
      hover: { backgroundColor: "#173f9f" },
      variants: {
        secondary: {
          backgroundColor: "#fbfcfe",
          color: "#101c28",
          border: { width: 1, style: "solid", color: "#101c28" },
          hover: { backgroundColor: "#eef1f4" },
        },
        small: { fontSize: 13, padding: [8, 14] },
      },
    },
    Table: { border: { bottom: "1px solid #ccd5de" } },
    TableCell: { padding: [10, 8], fontSize: 13 },
  },
  styles: {
    card: {
      backgroundColor: "#fbfcfe",
      padding: 28,
      gap: 16,
      borderRadius: 8,
      border: { width: 1, style: "solid", color: "#ccd5de" },
    },
    quiet: { color: "#4d5c6a", fontSize: 12 },
    eyebrow: {
      color: "#1d4ed8",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    stamp: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
      padding: [5, 10],
      border: { width: 1, style: "dashed", color: "#1d4ed8" },
      borderRadius: 4,
    },
    mono: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 13,
    },
  },
  formats: {
    email: { elements: { Button: { borderRadius: 2 } } },
    document: {
      styles: { quiet: { fontSize: 10 } },
      elements: { Text: { fontSize: 11, lineHeight: 1.45 } },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof ledgerTheme;
  }
}
