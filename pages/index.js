import { Seo } from "@/components/Seo";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { TradeParallax } from "@/components/TradeParallax";
import { VictoriaMap } from "@/components/VictoriaMap";
import { Solution } from "@/components/Solution";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Seo title={SITE_TITLE} description={SITE_DESCRIPTION} path="/" />

      <div id="top" className="min-h-screen bg-paper">
        <Header />
        <main>
          <Hero />
          <Problem />
          <TradeParallax />
          <VictoriaMap />
          <HowItWorks />
          <Solution />
          <Features />
          <Testimonials />
          <Pricing />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
