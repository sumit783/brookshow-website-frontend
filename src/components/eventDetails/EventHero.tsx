import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2 } from "lucide-react";

interface EventHeroProps {
  image: string;
  title: string;
  artist: string;
  status: string;
  onBack: () => void;
}

export const EventHero = ({ image, title, artist, status, onBack }: EventHeroProps) => {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>

      <Button variant="glass" size="icon" className="absolute top-6 left-6 z-20" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <Button variant="glass" size="icon">
          <Heart className="w-5 h-5" />
        </Button>
        <Button variant="glass" size="icon">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-4">
            <span
              className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-white/30 backdrop-blur-xl ${
                status === "Selling Fast"
                  ? "bg-gradient-to-r from-red-500/90 to-pink-500/90 text-white"
                  : status === "Limited"
                  ? "bg-gradient-to-r from-yellow-400/90 to-orange-500/90 text-black"
                  : "bg-gradient-to-r from-green-400/90 to-emerald-500/90 text-white"
              }`}
            >
              {status}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-accent font-bold">{artist}</p>
        </div>
      </div>
    </div>
  );
};


