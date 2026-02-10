import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArtistJoinDialog } from "./ArtistJoinDialog";
import { EventPlannerJoinDialog } from "./EventPlannerJoinDialog";

export const JoinSection = () => {
  const [artistOpen, setArtistOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  return (
    <section className="countdown-section py-12 sm:py-16 md:py-24 lg:py-32 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark moving-bg"></div>
      
      <div className="relative z-10 container mx-auto max-w-5xl text-center">
        <div className="glass-modern rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-strong fade-in-scale">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading mb-4 sm:mb-6 md:mb-8 bg-clip-text text-transparent leading-tight"
            style={{ backgroundImage: "linear-gradient(90deg, rgb(251, 191, 36) 0%, rgb(129, 140, 248) 50%, rgb(244, 114, 182) 100%)" }}
          >
            Join BrookShow Today
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Whether you're a talented artist or an experienced event planner, 
            join our community and showcase your skills to the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-stretch sm:items-center">
            <Button 
              variant="join" 
              size="xl" 
              className="pulse-glow w-full sm:w-auto min-w-[200px] text-white" 
              style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)", color: "white", border: "none" }}
              onClick={() => setArtistOpen(true)}
            >
              Join as Artist
            </Button>
            <Button 
              variant="join" 
              size="xl" 
              className="w-full sm:w-auto min-w-[200px] text-white" 
              style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)", color: "white", border: "none" }}
              onClick={() => setPlannerOpen(true)}
            >
              Join as Event Planner
            </Button>
          </div>
        </div>
      </div>
      <ArtistJoinDialog open={artistOpen} onOpenChange={setArtistOpen} />
      <EventPlannerJoinDialog open={plannerOpen} onOpenChange={setPlannerOpen} />
    </section>
  );
};