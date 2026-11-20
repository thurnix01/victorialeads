import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

/**
 * First viewport = one composition: brand, one outcome headline, one line, CTAs,
 * full-bleed trades imagery. No cards, pills, or fake dashboard overlays.
 */
export function Hero() {
  return (
    <section className="relative isolate min-h-[min(92vh,920px)] overflow-hidden bg-ink text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-trades.jpg)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/45"
        aria-hidden
      />
      <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay" aria-hidden />

      <Container className="relative flex min-h-[min(92vh,920px)] flex-col justify-end pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div className="max-w-3xl animate-fade-up">
          <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Victoria Leads
          </p>
          <div className="mt-3 h-1 w-16 origin-left animate-line-grow bg-signal" />

          <h1 className="mt-8 max-w-2xl text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
            Fill the calendar with booked jobs—not random clicks.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Done-for-you lead capture, AI follow-up, and campaign creative for trades and service businesses across
            Victoria, BC and surrounding areas.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#demo" className="inline-flex">
              <Button as="span" variant="signal" className="w-full sm:w-auto">
                Book a free demo
              </Button>
            </a>
            <a href="/start-your-campaign/" className="inline-flex">
              <Button
                as="span"
                variant="secondary"
                className="w-full border-white/30 text-white ring-white/35 hover:bg-white hover:text-ink sm:w-auto"
              >
                Start a campaign brief
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
