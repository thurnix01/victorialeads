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
  const title = "Victoria Leads | Booked jobs for local trades | Victoria, BC";
  const description =
    "Done-for-you lead capture, AI follow-up, and campaign creative for trades and service businesses in Victoria, BC. One monthly Revenue Builder system—not another DIY course.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <div id="top" className="min-h-screen bg-paper">
        <Header />
        <main>
          <Hero />
          <Problem />
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
