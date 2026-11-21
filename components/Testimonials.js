import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

/** Process proof — honest until real client quotes exist. Avoids fake star testimonials. */
const MILESTONES = [
  {
    label: "Week 1",
    title: "You’re not guessing anymore",
    body: "We lock what you sell, where you work, and where leads land—so every ad and reply points at the same job.",
  },
  {
    label: "Week 1–2",
    title: "Leads can start coming in",
    body: "Capture and follow-up are live. Creative is ready. Flip campaigns on when you want volume.",
  },
  {
    label: "Ongoing",
    title: "You see what’s booking work",
    body: "Short weekly check-ins on leads, cost, and booked jobs—not a vanity dashboard you’ll never open.",
  },
];

export function Testimonials() {
  return (
    <AnimatedSection id="proof" className="scroll-mt-24 bg-paper py-20 sm:py-28">
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
