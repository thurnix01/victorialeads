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
        className="absolute inset-0 bg-cover bg-[position:35%_center] sm:bg-center"
        style={{ backgroundImage: "url(/Victoria-aerial-view.jpg)" }}
        role="img"
        aria-label="Aerial view of Victoria Inner Harbour and the Parliament Buildings"
      />
      <div
        className="absolute inset-0 bg-gradient-to-l from-ink via-ink/88 to-ink/25 sm:via-ink/80 sm:to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay" aria-hidden />

      <Container className="relative flex min-h-[min(92vh,920px)] flex-col justify-end pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div className="ml-auto max-w-3xl animate-fade-up text-right">
          <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Victoria Leads
          </p>
          <div className="ml-auto mt-3 h-1 w-16 origin-right animate-line-grow bg-signal" />

          <h1 className="mt-8 ml-auto max-w-2xl text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
            Fill the calendar with booked jobs—not random clicks.
          </h1>

          <p className="mt-5 ml-auto max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Exclusive by trade and area—so you’re the only plumber or HVAC firm we run in your zone. Leads hit you on
            the tools. Spend stays tied to booked jobs across Victoria and the Island south.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <a href="#demo" className="inline-flex sm:order-2">
              <Button as="span" variant="signal" className="w-full sm:w-auto">
                Book a free demo
              </Button>
            </a>
            <a href="/start-your-campaign/" className="inline-flex sm:order-1">
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
