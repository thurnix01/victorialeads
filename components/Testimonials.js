import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { StarIcon } from "@/components/icons";

function Stars() {
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

function Quote({ name, company, quote, result }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-900/5">
      <Stars />
      <p className="mt-4 text-sm leading-relaxed text-slate-700">“{quote}”</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-brand-900">{name}</div>
          <div className="text-xs text-slate-500">{company}</div>
        </div>
        <div className="rounded-xl bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 ring-1 ring-teal-600/15">
          {result}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <AnimatedSection id="proof" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Results"
          title="Local service businesses thrive on predictable leads"
          subtitle="Illustrative examples—replace with your real client stories as you collect them."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Quote
            name="Mike R."
            company="Victoria-area contractor"
            quote="We went from uneven weeks to consistent inbound leads. Follow-up is easier when the system qualifies people before they reach us."
            result="34 leads / 30 days"
          />
          <Quote
            name="Sarah T."
            company="Westshore trade services"
            quote="The pages and messaging are clear. We’re booking more estimates without chasing cold traffic that was never going to buy."
            result="$22 CPL"
          />
          <Quote
            name="Jordan K."
            company="Saanich home services"
            quote="Setup was fast. We finally have a pipeline we can talk about with numbers—not just gut feel."
            result="+28% conv."
          />
        </div>
      </Container>
    </AnimatedSection>
  );
}
