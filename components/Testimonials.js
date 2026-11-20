import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

/** Process proof — honest until real client quotes exist. Avoids fake star testimonials. */
const MILESTONES = [
  {
    label: "Week 1",
    title: "Brief locked",
    body: "Offer, area, CTA, and landing URL confirmed. Tracking and notifications wired.",
  },
  {
    label: "Week 1–2",
    title: "System live",
    body: "Capture, AI follow-up, and creative assets ready. Campaigns can go live when you’re ready.",
  },
  {
    label: "Ongoing",
    title: "Numbers you can discuss",
    body: "Lead volume, cost per lead, and booked outcomes reviewed so spend stays tied to revenue.",
  },
];

export function Testimonials() {
  return (
    <AnimatedSection id="proof" className="scroll-mt-24 bg-fog py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">What to expect</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Proof is booked jobs—not a fake dashboard.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            We’re building Victoria-area case studies the honest way. Until then, here’s the delivery rhythm you’ll
            actually feel.
          </p>
        </div>

        <div className="mt-12 grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-3">
          {MILESTONES.map((m) => (
            <div key={m.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{m.label}</p>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{m.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
