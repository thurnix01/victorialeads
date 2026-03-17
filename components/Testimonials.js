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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Stars />
      <p className="mt-4 text-sm leading-relaxed text-slate-700">“{quote}”</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{company}</div>
        </div>
        <div className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
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
          title="Roofing contractors like predictable leads"
          subtitle="These are realistic placeholders to show how the page will look with social proof."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Quote
            name="Mike R."
            company="Victoria Roofing Co."
            quote="We went from random weeks to consistent inbound leads. The follow-up is easier when the leads are actually qualified."
            result="34 leads / 30 days"
          />
          <Quote
            name="Sarah T."
            company="Westshore Roofing"
            quote="The landing page is clean and the message is simple. We’re booking more estimates without chasing people."
            result="$22 CPL"
          />
          <Quote
            name="Jordan K."
            company="Saanich Roof Pros"
            quote="Setup was quick. The system keeps improving week to week and we can finally predict our pipeline."
            result="+28% conversion"
          />
        </div>
      </Container>
    </AnimatedSection>
  );
}

