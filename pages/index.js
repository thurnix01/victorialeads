import Head from "next/head";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const title = "AI Lead Engine for Roofing Companies | Victoria, BC";
  const description =
    "Get more roofing jobs in Victoria without hiring a marketing team. Our AI system generates, tests, and optimizes your ads, landing pages, and leads automatically.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <div id="top" className="min-h-screen">
        <Header />

        <main>
          <Hero />
          <Problem />
          <Solution />
          <HowItWorks />
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