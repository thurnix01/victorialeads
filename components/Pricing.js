import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";

const HIGHLIGHTS = [
  "Full Automated Lead Generation & Revenue Builder package",
  "Lead capture, notifications, AI email & follow-up sequences",
  "Supabase lead tracking + analytics & performance review",
  "AI ad copy, Figma creative, Google Ads & Meta-ready assets",
  "Campaign support and ongoing revenue-focused optimization",
];

export function Pricing() {
  return (
    <AnimatedSection id="pricing" className="scroll-mt-24 bg-slate-100/80 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Pricing"
              title="One clear monthly investment"
              subtitle="Everything in “What it includes” is part of the same system—automation, creative, campaign support, and optimization for local trades and service businesses in Victoria, BC and surrounding areas."
            />
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-lg shadow-slate-900/5 ring-1 ring-teal-600/10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-sm font-semibold text-brand-900">Victoria Leads AI — Full package</div>
                  <div className="mt-1 text-xs text-slate-500">Automated Lead Generation &amp; Revenue Builder</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-semibold tracking-tight text-brand-900">$1500</div>
                  <div className="text-xs text-slate-500">per month</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {HIGHLIGHTS.map((it) => (
                  <div key={it} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckIcon className="mt-0.5 shrink-0 text-teal-600" />
                    <span>{it}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#demo" className="inline-flex flex-1">
                  <Button as="span" className="w-full">
                    Book a free demo
                  </Button>
                </a>
                <a href="#features" className="inline-flex">
                  <Button as="span" variant="secondary" className="w-full">
                    Review full package
                  </Button>
                </a>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Ad spend is billed separately (paid directly to the ad platforms). We manage execution, creative, and
                optimization within the package above.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
