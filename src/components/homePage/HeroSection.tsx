"use client";
import { Button } from "@/components/ui/button";
import { HeroBackgroundSlider } from "./HeroBackgroundSlider";
import { useRouter } from "next/navigation";
import downArrow from "@/assets/down-arrow.png";

export const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      {/* Container for Slider and Scroll Indicator */}
      <div className="relative w-full h-screen overflow-hidden bg-black/20">
        <HeroBackgroundSlider />
        
        {/* Scroll Indicator - Horizontally centered at the bottom */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center animate-bounce z-20 gap-2">
          <img src={downArrow.src} alt="Scroll Down" className="w-5 h-5 object-contain" />
          <span className="text-white/80 text-[10px] uppercase tracking-widest font-medium">Scroll Down</span>
        </div>
      </div>
      
      {/* Hero Content - Now below the slider */}
      <section className="countdown-section relative py-20 sm:py-24 md:py-32 flex items-center justify-center overflow-hidden bg-[#0A0A0B]">
        {/* Subtle background glow effect since we lost the slider background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-[100px] animate-pulse delay-700"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 md:px-6">
          <div className="glass-modern rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-16 shadow-strong backdrop-blur-xl fade-in-scale border border-white/5">
            <h1 
              className="text-3xl sm:text-5xl md:text-6xl font-hero mb-4 md:mb-8 bg-clip-text text-transparent p-2 leading-2xl"
              style={{ backgroundImage: "linear-gradient(90deg, rgb(251, 191, 36) 0%, rgb(129, 140, 248) 50%, rgb(244, 114, 182) 100%)" }}
            >
              Empowering Talents, Ensuring Trust
            </h1>
            
            <p className="text-base sm:text-lg md:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Discover & book trusted Artists, DJs, Event Planners & more
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
              <div className="group relative w-full md:w-1/4 sm:min-w-56">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary to-accent rounded-xl opacity-0 group-hover:opacity-75 blur-md transition-opacity duration-500"></div>
                <Button variant="ticket" size="xl" className="relative w-full pulse-glow" onClick={() => router.push("/events")}>
                  Book Ticket
                </Button>
              </div>
              <div className="group relative w-full md:w-1/4 sm:min-w-56">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary to-accent rounded-xl opacity-0 group-hover:opacity-75 blur-md transition-opacity duration-500"></div>
                <Button variant="hero" size="xl" className="relative w-full" onClick={() => router.push("/artists")}>
                  Book Artist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};