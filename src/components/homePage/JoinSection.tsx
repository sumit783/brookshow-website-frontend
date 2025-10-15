import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArtistJoinDialog } from "./ArtistJoinDialog";
import { EventPlannerJoinDialog } from "./EventPlannerJoinDialog";

export const JoinSection = () => {
  const [artistOpen, setArtistOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark moving-bg"></div>
      
      <div className="relative z-10 container mx-auto max-w-5xl text-center">
        <div className="glass-modern rounded-3xl p-16 shadow-strong fade-in-scale">
          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-8 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Join BrookShow Today
          </h2>
          
          <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Whether you're a talented artist or an experienced event planner, 
            join our community and showcase your skills to the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button variant="join" size="xl" className="pulse-glow" onClick={() => setArtistOpen(true)}>
              Join as Artist
            </Button>
            <Button variant="join" size="xl" onClick={() => setPlannerOpen(true)}>
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