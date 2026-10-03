/**
 * Shared presentational helpers for the Tokens/* stories. These render the
 * design tokens using the LIVE CSS variables from src/index.css (imported in
 * .storybook/preview.ts), so every swatch stays in sync with the token source
 * of truth and reacts to the light/dark toolbar. Not a *.stories file, so the
 * stories glob does not collect it.
 */
import * as React from "react";

export const Page: React.FC<{ title: string; intro?: string; children: React.ReactNode }> = ({
  title,
  intro,
  children,
}) => (
  <div style={{ font: "400 14px var(--sans, Inter, system-ui, sans-serif)", color: "var(--text-primary)", maxWidth: 920 }}>
    <h1 style={{ font: "700 28px/1.2 var(--sans, Inter, system-ui)", margin: "0 0 6px" }}>{title}</h1>
    {intro && <p style={{ color: "var(--text-secondary)", margin: "0 0 28px", maxWidth: 640 }}>{intro}</p>}
    {children}
  </div>
);

export const Section: React.FC<{ title: string; desc?: string; children: React.ReactNode }> = ({
  title,
  desc,
  children,
}) => (
  <section style={{ margin: "0 0 36px" }}>
    <h2 style={{ font: "600 13px var(--sans, Inter, system-ui)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 14px" }}>
      {title}
    </h2>
    {desc && <p style={{ color: "var(--text-secondary)", margin: "-8px 0 16px", fontSize: 13 }}>{desc}</p>}
    {children}
  </section>
);

/** A single color chip over a var() value, with name + resolved sublabel. */
export const Swatch: React.FC<{ value: string; name: string; sub?: string }> = ({ value, name, sub }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 92 }}>
    <div
      style={{
        height: 56,
        borderRadius: 8,
        background: value,
        border: "1px solid var(--border, rgba(0,0,0,.1))",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.02)",
      }}
    />
    <div style={{ fontSize: 12, fontWeight: 500 }}>{name}</div>
    {sub && <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--mono, ui-monospace, monospace)" }}>{sub}</div>}
  </div>
);

export const Grid: React.FC<{ children: React.ReactNode; min?: number }> = ({ children, min = 92 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: 14 }}>
    {children}
  </div>
);

export const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>{children}</div>
);
