import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

const POINTS = [
  {
    title: "Clicks without booked work",
    body: "Traffic is cheap to buy and expensive to waste. If leads don’t become estimates and jobs, the ad account is just a bill.",
  },
  {
    title: "Follow-up that dies in the truck",
    body: "When you’re on a job site, slow replies lose the people who were ready to hire—today.",
  },
  {
    title: "Marketing that depends on you",
    body: "Referrals are great until they’re quiet. You need a system that keeps working while you deliver the work.",
  },
];

export function Problem() {
  return (
    <AnimatedSection id="problem" className="scroll-mt-24 border-b border-ink/10 bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">The real problem</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Busy crews. Empty calendars. Marketing that doesn’t pay for itself.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {POINTS.map((p) => (
                <li key={p.title} className="grid gap-2 py-7 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-8">
                  <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                  <p className="text-base leading-relaxed text-ink/65">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
