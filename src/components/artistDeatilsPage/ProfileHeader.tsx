import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { LazyImage } from "@/components/ui/LazyImage";
import { Button } from "@/components/ui/button";

type Stats = {
  events: number;
  experience: string;
};

interface ProfileHeaderProps {
  image: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  stats: Stats;
  price?: number;
  onBookClick?: () => void;
}

export const ProfileHeader = ({ image, name, category, rating, location, stats, price, onBookClick }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Mobile Instagram Style Header */}
      <div className="flex md:hidden items-center gap-6 px-2">
        <div className="relative shrink-0">
          <LazyImage
            src={image}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-2 border-accent/30 p-1 bg-background"
            skeletonClassName="rounded-full"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full border-2 border-background flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="flex-1 flex justify-around items-center text-center">
          <div>
            <div className="font-bold text-lg text-white">{stats.events}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Events</div>
          </div>
          <div>
            <div className="font-bold text-lg text-white">{stats.experience}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Years</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-0.5 font-bold text-lg text-white">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              {rating}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Rating</div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (Hidden on Mobile) */}
      <div className="hidden md:flex flex-row items-start gap-6 text-left">
        <div className="relative shrink-0">
          <LazyImage
            src={image}
            alt={name}
            className="w-32 h-32 rounded-2xl object-cover border-2 border-accent/30"
            skeletonClassName="rounded-2xl"
          />
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="flex-1">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent mb-3 text-left">
            {name}
          </CardTitle>

          <div className="flex flex-wrap items-center justify-start gap-4 mb-4">
            <Badge className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30 text-accent">
              {category}
            </Badge>
          </div>

          <div className="flex justify-between items-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-foreground/80 text-lg">{location}</span>
            </div>
            {typeof price === 'number' && (
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-sm hover:bg-white/[0.08] transition-all duration-300 group cursor-default">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">Starting</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-medium text-accent/80">₹</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-500">{price}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-start gap-8 text-center">
            <div>
              <div className="font-bold text-2xl text-accent">{stats.events}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Events</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-primary">{stats.experience}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Years Exp</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 font-bold text-2xl text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                {rating}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details & Buttons for Mobile */}
      <div className="md:hidden space-y-4 px-2">
        <div>
          <h1 className="text-xl font-bold text-white mb-0.5">{name}</h1>
          <p className="text-sm text-accent/90 font-medium mb-1">{category}</p>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs">{location}</span>
          </div>
        </div>

        {typeof price === 'number' && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 w-full text-center justify-center">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Pricing</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xs font-medium text-accent">₹</span>
              <span className="text-base font-bold text-white">{price}</span>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <Button
            className="flex-1 h-10 bg-gradient-to-r from-primary to-accent font-bold text-sm shadow-lg shadow-primary/20"
            onClick={onBookClick}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};


