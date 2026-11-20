import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

/** Four-phase mechanism — same clarity as a sales funnel, applied to DFY delivery. */
const PHASES = [
  {
    n: "01",
    title: "Align on the offer",
    body: "We lock your service area, offer, CTA, and landing page so ads and follow-up point at the same job.",
  },
  {
    n: "02",
    title: "Stand up capture + follow-up",
    body: "Lead forms, instant notifications, and AI email sequences so hot leads don’t cool off while you’re on site.",
  },
  {
    n: "03",
    title: "Launch creative & campaigns",
    body: "Ad copy and Figma creative for Google and Meta—ready to run, not another brainstorm deck.",
  },
  {
    n: "04",
    title: "Measure and tighten",
    body: "Supabase tracking plus weekly optimization so spend moves toward booked revenue, not vanity metrics.",
  },
];

export function HowItWorks() {
  return (
    <AnimatedSection id="how" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">How it works</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From brief to booked work—in four clear phases.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            You stay on the tools. We install the revenue system: intake, automation, creative, and ongoing optimization.
          </p>
        </div>

        <ol className="mt-14 grid gap-0 border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase) => (
            <li
              key={phase.n}
              className="border-b border-white/15 px-0 py-8 md:border-b-0 md:border-r md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="font-display text-sm font-bold tracking-[0.2em] text-signal">{phase.n}</div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{phase.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{phase.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-white/50">Typical setup: under 7 days after we have your campaign brief.</p>
      </Container>
    </AnimatedSection>
  );
}
