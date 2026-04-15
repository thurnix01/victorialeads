import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";

const PACKAGE_ITEMS = [
  "Lead capture forms on client websites or landing pages",
  "Instant lead notifications",
  "Automated AI-powered email replies",
  "Automated follow-up sequences",
  "Lead tracking inside Supabase",
  "AI-generated Google Ads and social ad copy",
  "Figma-based ad creative production",
  "Campaign-ready assets for Google Ads and Meta",
  "Analytics tracking and performance review",
  "Ongoing optimization for better revenue results",
];

function Item({ text }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm shadow-slate-900/5 transition hover:border-teal-600/25 hover:shadow-md">
      <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-teal-50 ring-1 ring-teal-600/20">
        <CheckIcon className="text-teal-700" />
      </div>
      <p className="text-sm font-medium leading-snug text-slate-700">{text}</p>
    </div>
  );
}

export function Features() {
  return (
    <AnimatedSection id="features" className="scroll-mt-24 bg-slate-100/80 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="What it includes"
          title="Automated Lead Generation & Revenue Builder for Local Businesses"
          subtitle="These deliverables work together so you generate more leads, improve follow-up, and tie marketing to measurable revenue."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {PACKAGE_ITEMS.map((text) => (
            <Item key={text} text={text} />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
