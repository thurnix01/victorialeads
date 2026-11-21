import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const PLANS = [
  {
    name: "Exclusive Starter",
    price: "$795",
    blurb: "Category lock · Meta · capture",
    featured: false,
    points: [
      "One trade per service area (exclusive)",
      "Lead capture + instant Outlook/Sheets notifications",
      "Client confirmation email + lead log",
      "Managed Meta creative & campaign support",
      "Ad spend billed separately to Meta",
    ],
  },
  {
    name: "Revenue Builder",
    price: "$1,500",
    blurb: "Full stack · Google + Meta · creative",
    featured: true,
    points: [
      "Everything in Exclusive Starter",
      "Google Ads + Meta creative (AI copy + Figma)",
      "Campaign brief workflow when you’re ready to launch",
      "AI follow-up sequences while you’re on the tools",
      "Weekly optimization toward booked jobs",
    ],
  },
];

export function Pricing() {
  return (
    <AnimatedSection id="pricing" className="scroll-mt-24 bg-fog py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Pricing</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Exclusive by area. Two clear levels.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            One business per trade per service area—so you’re never buying the same lead as your competitor. Ad spend
            is billed separately to the platforms.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.featured
                  ? "border border-ink bg-ink p-7 text-white sm:p-10"
                  : "border border-ink/15 bg-white p-7 sm:p-10"
              }
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p
                    className={
                      plan.featured
                        ? "font-display text-xl font-bold text-white"
                        : "font-display text-xl font-bold text-ink"
                    }
                  >
                    {plan.name}
                  </p>
                  <p className={plan.featured ? "mt-1 text-sm text-white/55" : "mt-1 text-sm text-ink/50"}>
                    {plan.blurb}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={
                      plan.featured
                        ? "font-display text-4xl font-extrabold tracking-tight text-white"
                        : "font-display text-4xl font-extrabold tracking-tight text-ink"
                    }
                  >
                    {plan.price}
                  </p>
                  <p className={plan.featured ? "text-sm text-white/50" : "text-sm text-ink/50"}>per month</p>
                </div>
              </div>

              <ul className="mt-8 space-y-3 text-sm">
                {plan.points.map((point) => (
                  <li
                    key={point}
                    className={
                      plan.featured ? "flex gap-3 text-white/75" : "flex gap-3 text-ink/75"
                    }
                  >
                    <span
                      className={
                        plan.featured
                          ? "mt-1.5 h-1.5 w-1.5 shrink-0 bg-signal"
                          : "mt-1.5 h-1.5 w-1.5 shrink-0 bg-sea"
                      }
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#demo" className="inline-flex flex-1">
                  <Button
                    as="span"
                    className="w-full"
                    variant={plan.featured ? "primary" : "secondary"}
                  >
                    Book a free demo
                  </Button>
                </a>
                {plan.featured ? (
                  <a href="/start-your-campaign/" className="inline-flex flex-1">
                    <Button as="span" variant="light" className="w-full">
                      Campaign brief
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border border-ink/10 bg-fog/60 p-5 sm:p-6">
          <p className="font-display text-base font-bold text-ink">Launch commitment</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">
            If we don’t get your lead capture and follow-up live within 7 days of a completed campaign brief (assuming
            you provide assets and approvals on time), your first month is on us. Category exclusivity starts when you
            kick off.
          </p>
        </div>
      </Container>
    </AnimatedSection>
  );
}
