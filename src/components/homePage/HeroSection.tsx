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
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="glass-modern rounded-3xl p-16 shadow-strong backdrop-blur-xl fade-in-scale">
          <h1 className="text-6xl font-hero mb-8 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent leading-tight">
            Empowering Talents, Ensuring Trust
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover & book trusted Artists, DJs, Event Planners & more
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button variant="ticket" size="xl" className="min-w-56 pulse-glow" onClick={() => navigate("/events")}>
              Book Ticket
            </Button>
            <Button variant="hero" size="xl" className="min-w-56" onClick={() => navigate("/artists")}>
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