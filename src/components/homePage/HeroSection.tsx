import { Button } from "@/components/ui/button";
import { HeroBackgroundSlider } from "./HeroBackgroundSlider";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <HeroBackgroundSlider />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 md:px-6">
        <div className="glass-modern rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-16 shadow-strong backdrop-blur-xl fade-in-scale">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-hero mb-4 md:mb-8 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent p-2 leading-2xl">
            Empowering Talents, Ensuring Trust
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover & book trusted Artists, DJs, Event Planners & more
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <Button variant="ticket" size="xl" className="w-full md:w-1/4 sm:min-w-56 pulse-glow" onClick={() => navigate("/events")}>
              Book Ticket
            </Button>
            <Button variant="hero" size="xl" className="w-full md:w-1/4 sm:min-w-56" onClick={() => navigate("/artists")}>
              Book Artist
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};