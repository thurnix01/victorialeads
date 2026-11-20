import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

const STACK = [
  { name: "Lead capture & notifications", value: "Included" },
  { name: "AI email replies + follow-up sequences", value: "Included" },
  { name: "Supabase lead tracking", value: "Included" },
  { name: "AI ad copy (Google & Meta)", value: "Included" },
  { name: "Figma ad creative production", value: "Included" },
  { name: "Campaign-ready assets", value: "Included" },
  { name: "Analytics & performance review", value: "Included" },
  { name: "Ongoing optimization", value: "Included" },
];

export function Features() {
  return (
    <AnimatedSection id="features" className="scroll-mt-24 border-y border-ink/10 bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">What’s included</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              The full stack—clearly listed.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              No mystery modules. Everything below is part of the monthly Victoria Builder package. Ad spend is paid
              directly to Google or Meta.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-ink/15">
              {STACK.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4"
                >
                  <span className="text-sm font-medium text-ink sm:text-base">{item.name}</span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-sea">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
