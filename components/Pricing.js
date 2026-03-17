import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";

export function Pricing() {
  const includes = [
    "Ads management",
    "Landing pages",
    "Optimization",
    "Reporting",
    "Local targeting (Victoria, BC)",
    "Fast setup under 7 days",
  ];

  return (
    <AnimatedSection id="pricing" className="scroll-mt-24 py-16 sm:py-20 bg-slate-50/60">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Pricing"
              title="Simple, clear pricing"
              subtitle="One monthly plan. No contracts. No confusing add-ons."
            />
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-900">AI Lead Engine</div>
                  <div className="mt-1 text-xs text-slate-500">For roofing companies in Victoria, BC</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-semibold tracking-tight text-slate-900">$1500</div>
                  <div className="text-xs text-slate-500">per month</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {includes.map((it) => (
                  <div key={it} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckIcon className="mt-0.5 text-emerald-600" />
                    <span>{it}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#demo" className="inline-flex flex-1">
                  <Button as="span" className="w-full">
                    Start Getting Leads
                  </Button>
                </a>
                <a href="#how" className="inline-flex">
                  <Button as="span" variant="secondary" className="w-full">
                    See how it works
                  </Button>
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Ad spend is separate (paid directly to the ad platform). We manage and optimize everything.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}

