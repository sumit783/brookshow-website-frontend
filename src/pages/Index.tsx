import { useState } from "react";
import { HeroSection } from "@/components/homePage/HeroSection";
import { TopArtistsSection } from "@/components/homePage/TopArtistsSection";
import { LiveTicketsSection } from "@/components/homePage/LiveTicketsSection";
import { FeaturesSection } from "@/components/homePage/FeaturesSection";
import { JoinSection } from "@/components/homePage/JoinSection";
import { SEO } from "@/components/SEO";
import { IntroLoader } from "@/components/IntroLoader";

const Index = () => {
  return (
    <>
      <SEO 
        title="BrookShow - Empowering Talents, Ensuring Trust"
        description="Discover & book trusted Artists, DJs, Event Planners & more. Join BrookShow for verified artists, secure payments, and real-time QR ticketing."
        canonical="https://brookshow.com"
      />
      
      {/* Preloader - manages its own session-based state */}
      <IntroLoader />

      <HeroSection />
      <TopArtistsSection />
      <LiveTicketsSection />
      <FeaturesSection />
      <JoinSection />
    </>
  );
};

export default Index;
