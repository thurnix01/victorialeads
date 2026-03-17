import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { BoltIcon, ChartIcon, TargetIcon } from "@/components/icons";

function Card({ icon: Icon, title, body }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}

export function Features() {
  const items = [
    {
      icon: BoltIcon,
      title: "AI Ad Generation",
      body: "New ads and angles tested so you don’t stall when performance dips.",
    },
    {
      icon: TargetIcon,
      title: "Conversion‑Optimized Pages",
      body: "Fast, mobile-first landing pages built to turn visitors into leads.",
    },
    {
      icon: ChartIcon,
      title: "Lead Tracking Dashboard",
      body: "See what’s working and follow up faster with clean reporting.",
    },
    {
      icon: BoltIcon,
      title: "Ongoing Optimization",
      body: "Weekly iteration on targeting, copy, and offers to improve ROI.",
    },
    {
      icon: TargetIcon,
      title: "Local Targeting (Victoria, BC)",
      body: "Focused on homeowners in your service area—no wasted spend.",
    },
    {
      icon: BoltIcon,
      title: "Fast Setup (under 7 days)",
      body: "We move quickly so you can start generating leads this month.",
    },
  ];

  return (
    <AnimatedSection id="features" className="scroll-mt-24 py-16 sm:py-20 bg-slate-50/60">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to turn clicks into booked jobs"
          subtitle="A simple, done-for-you system designed for roofing companies—focused on results, not busywork."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title} icon={it.icon} title={it.title} body={it.body} />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}

