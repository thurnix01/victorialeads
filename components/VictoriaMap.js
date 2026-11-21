import { useMemo, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import {
  MAP_VIEW_BOX,
  VICTORIA_ZONES,
  ZONE_DATA_NOTE,
  formatCount,
  zoneFill,
} from "@/lib/victoriaZones";

export function VictoriaMap() {
  const [activeId, setActiveId] = useState("victoria");
  const [hoverId, setHoverId] = useState(null);

  const active = useMemo(
    () => VICTORIA_ZONES.find((z) => z.id === activeId) || VICTORIA_ZONES[0],
    [activeId],
  );

  const ranked = useMemo(
    () => [...VICTORIA_ZONES].sort((a, b) => b.employers - a.employers),
    [],
  );

  // Draw larger / denser zones first so smaller municipalities stay clickable on edges
  const paintOrder = useMemo(
    () => [...VICTORIA_ZONES].sort((a, b) => b.employers - a.employers),
    [],
  );

  return (
    <AnimatedSection id="market-map" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">Greater Victoria</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              One trade per area—starting here.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Darker sea = denser local market. We lock{" "}
              <span className="text-white/90">one plumber, HVAC, electrician, or roofer per zone</span>—so you’re never
              buying the same lead as the truck next door. Leads hit you on the tools; spend stays tied to booked jobs.
            </p>

            <div className="mt-8 border border-white/15 bg-white/[0.04] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Selected zone</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">{active.name}</h3>
              {active.note ? <p className="mt-1 text-xs text-white/45">{active.note}</p> : null}
              <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-sea-bright">
                {formatCount(active.employers)}
              </p>
              <p className="mt-1 text-sm text-white/55">local business locations</p>
              <p className="mt-1 text-xs text-white/40">All industries—used as market density for trades competition.</p>
              <a href="#demo" className="mt-6 inline-flex w-full sm:w-auto">
                <Button as="span" variant="signal" className="w-full sm:w-auto">
                  Claim this zone for your trade
                </Button>
              </a>
            </div>

            <ol className="mt-6 max-h-52 space-y-1 overflow-y-auto pr-1 text-sm text-white/55 sm:max-h-64">
              {ranked.map((z, i) => (
                <li key={z.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setHoverId(z.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => setActiveId(z.id)}
                    className={[
                      "flex w-full items-baseline justify-between gap-3 rounded px-2 py-1.5 text-left transition",
                      activeId === z.id ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white/80",
                    ].join(" ")}
                  >
                    <span>
                      <span className="mr-2 tabular-nums text-white/35">{String(i + 1).padStart(2, "0")}</span>
                      {z.name}
                    </span>
                    <span className="tabular-nums text-sea-bright/90">{formatCount(z.employers)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden border border-white/10 bg-[#0a121a] p-2 sm:p-4">
              <svg
                viewBox={MAP_VIEW_BOX}
                className="h-auto w-full"
                role="img"
                aria-label="Interactive map of Capital Regional District municipalities"
              >
                <rect width="100%" height="100%" fill="#0a121a" />

                {paintOrder.map((zone) => {
                  const isHot = hoverId === zone.id || activeId === zone.id;
                  return (
                    <path
                      key={zone.id}
                      d={zone.path}
                      fill={zoneFill(zone.employers, hoverId === zone.id, activeId === zone.id)}
                      stroke={isHot ? "#c9851a" : "#0d1520"}
                      strokeWidth={isHot ? 1.75 : 0.9}
                      strokeLinejoin="round"
                      className="cursor-pointer transition-[fill,stroke] duration-150 ease-out"
                      onMouseEnter={() => setHoverId(zone.id)}
                      onMouseLeave={() => setHoverId(null)}
                      onClick={() => setActiveId(zone.id)}
                    />
                  );
                })}

                {VICTORIA_ZONES.map((zone) => {
                  const isHot = hoverId === zone.id || activeId === zone.id;
                  const short =
                    zone.name === "Central Saanich"
                      ? "C. Saanich"
                      : zone.name === "North Saanich"
                        ? "N. Saanich"
                        : zone.name === "View Royal"
                          ? "View Royal"
                          : zone.name;
                  return (
                    <text
                      key={`label-${zone.id}`}
                      x={zone.label.x}
                      y={zone.label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none select-none"
                      fill={isHot ? "#ffffff" : "rgba(255,255,255,0.78)"}
                      fontSize={zone.employers > 3000 ? 14 : zone.employers > 700 ? 12 : 10}
                      fontWeight="600"
                      style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                    >
                      {short}
                    </text>
                  );
                })}

                <g transform="translate(520, 720)">
                  <rect width="170" height="44" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                  <text
                    x="12"
                    y="18"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="11"
                    style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                  >
                    Greater Victoria, BC
                  </text>
                  <text
                    x="12"
                    y="34"
                    fill="rgba(255,255,255,0.4)"
                    fontSize="10"
                    style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                  >
                    N ↑ · CRD + Cowichan A/B/C
                  </text>
                </g>
              </svg>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/40">{ZONE_DATA_NOTE}</p>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
