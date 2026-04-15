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
  const title = "Victoria Leads AI | Automated Lead Generation for Local Trades | Victoria, BC";
  const description =
    "Victoria Leads AI helps local trades and service-based businesses in Victoria, BC and surrounding areas generate more leads, improve follow-up, and turn marketing into measurable revenue through automated systems, ad creative, campaign support, and conversion-focused customer workflows.";

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
          <FinalCTA />
          <Problem />
          <Solution />
          <HowItWorks />
          <Features />
          <Testimonials />
          <Pricing />
        </main>

        <Footer />
      </div>
    </>
  );
}