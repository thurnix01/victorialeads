import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

export function Problem() {
  return (
    <AnimatedSection id="problem" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Marketing shouldn’t feel like gambling.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              If you’re busy running jobs, you don’t have time to babysit ads, rebuild pages, or chase leads.
              That’s why most roofing companies end up stuck with inconsistent work.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Tired of paying for ads that don’t convert?",
                  body: "Clicks aren’t the goal. Booked jobs are.",
                },
                {
                  title: "Relying on referrals and slow seasons?",
                  body: "Referrals are great—until they dry up.",
                },
                {
                  title: "No time to manage marketing?",
                  body: "You should be estimating and installing, not tweaking campaigns.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-sm font-semibold text-slate-900">{card.title}</div>
                  <div className="mt-2 text-sm text-slate-600">{card.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}

