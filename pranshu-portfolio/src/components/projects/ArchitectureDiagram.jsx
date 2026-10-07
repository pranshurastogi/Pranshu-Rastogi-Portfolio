"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, ArrowDownIcon, ShieldCheckIcon, LayersIcon } from "lucide-react";

/**
 * Visual system architecture for a project page, driven by `project.architecture`:
 *   { title, summary, pipeline: [{ title, text, tier }], principles: [{ title, text }],
 *     layers: [{ name, items: [] }], layersNote? }
 * `tier` colours each pipeline stage; unknown tiers fall back to "device".
 */
const TIERS = {
  device: { label: "On-device", color: "#39FF9E" },
  apple: { label: "Apple Intelligence", color: "#00F5FF" },
  guard: { label: "Safety gate", color: "#FBBF24" },
  cloud: { label: "Opt-in cloud", color: "#9F4EFF" },
};

const card = "rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)]";

const connector =
  "w-4 h-4 p-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)]";

function tierOf(stage) {
  return TIERS[stage.tier] || TIERS.device;
}

export default function ArchitectureDiagram({ architecture }) {
  const { title, summary, pipeline = [], principles = [], layers = [], layersNote } = architecture;
  const usedTiers = Object.entries(TIERS).filter(([key]) =>
    pipeline.some((s) => (s.tier || "device") === key)
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mt-16 scroll-mt-24"
      aria-labelledby="architecture-heading"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent-purple-text)] mb-2">
        System design
      </p>
      <h2 id="architecture-heading" className="scroll-mt-24 text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2">
        {title || "Architecture"}
      </h2>
      {summary && (
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-6">{summary}</p>
      )}

      {/* Pipeline */}
      {pipeline.length > 0 && (
        <div className={`${card} p-5 md:p-6 relative overflow-hidden`}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(57,255,158,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Legend */}
          <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
              Pipeline
            </span>
            {usedTiers.map(([key, t]) => (
              <span key={key} className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }} />
                {t.label}
              </span>
            ))}
          </div>

          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pipeline.map((stage, i) => {
              const t = tierOf(stage);
              const isLast = i === pipeline.length - 1;
              return (
                <motion.li
                  key={stage.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="relative rounded-xl border bg-[var(--bg-primary)] p-4 pt-3.5"
                  style={{ borderColor: `${t.color}26` }}
                >
                  <span
                    className="absolute inset-x-4 top-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
                  />
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-semibold text-black"
                      style={{ background: t.color }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: t.color }}>
                      {t.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{stage.title}</p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-1">{stage.text}</p>

                  {/* Flow connectors: down in the 1-col layout; right within a row of the
                      2-col (tablet) and 4-col (desktop) grids; down-left at row ends */}
                  {!isLast && (
                    <>
                      <ArrowDownIcon
                        className={`absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 ${connector} block ${
                          i % 2 === 1 ? "sm:block" : "sm:hidden"
                        } ${(i + 1) % 4 === 0 ? "lg:block" : "lg:hidden"}`}
                      />
                      {i % 2 === 0 && (
                        <ArrowRightIcon className={`hidden sm:block lg:hidden absolute top-1/2 -right-3 -translate-y-1/2 z-10 ${connector}`} />
                      )}
                      {(i + 1) % 4 !== 0 && (
                        <ArrowRightIcon className={`hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 ${connector}`} />
                      )}
                    </>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
        {/* Principles */}
        {principles.length > 0 && (
          <div className={`${card} p-5 lg:col-span-2`}>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheckIcon className="w-4 h-4 text-[var(--accent-lime)]" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                Design principles
              </p>
            </div>
            <ul className="space-y-3">
              {principles.map((p) => (
                <li key={p.title} className="rounded-xl border border-white/[0.05] bg-[var(--bg-primary)] px-4 py-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{p.title}</p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-0.5">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Layered system */}
        {layers.length > 0 && (
          <div className={`${card} p-5 ${principles.length ? "lg:col-span-3" : "lg:col-span-5"}`}>
            <div className="flex items-center gap-2 mb-4">
              <LayersIcon className="w-4 h-4 text-[var(--accent-cyan)]" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                System layers
              </p>
            </div>
            <div className="space-y-2">
              {layers.map((layer, i) => {
                // fade from cyan (top, user-facing) to purple (bottom, infrastructure)
                const mix = layers.length > 1 ? i / (layers.length - 1) : 0;
                const accent = `color-mix(in oklab, #00F5FF ${Math.round((1 - mix) * 100)}%, #9F4EFF)`;
                return (
                  <div
                    key={layer.name}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-xl border border-white/[0.05] bg-[var(--bg-primary)] px-3 py-2.5"
                    style={{ borderLeft: `3px solid ${accent}` }}
                  >
                    <span className="sm:w-32 flex-shrink-0 text-[11px] font-mono uppercase tracking-wider" style={{ color: accent }}>
                      {layer.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-[var(--text-secondary)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {layersNote && (
              <p className="text-xs text-[var(--text-muted)] mt-3">{layersNote}</p>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
