import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { LazyImage } from "@/components/ui/LazyImage";

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
}

export const ProfileHeader = ({ image, name, category, rating, location, stats, price }: ProfileHeaderProps) => {
  return (
    <div className="flex items-start gap-6">
      <div className="relative">
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
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent mb-3">
          {name}
        </CardTitle>

        <div className="flex items-center gap-4 mb-4">
          <Badge className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30 text-accent">
            {category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-bold text-lg">{rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent" />
          <span className="text-foreground/80 text-lg">{location}</span>
          </div>
          {typeof price === 'number' && (
            <Badge className="ml-3 text-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/40 text-green-300">
              From ${price}
            </Badge>
          )}
        </div>

        <div className="flex gap-8 text-center">
          <div>
            <div className="font-bold text-2xl text-accent">{stats.events}</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </div>
          <div>
            <div className="font-bold text-2xl text-primary">{stats.experience}</div>
            <div className="text-sm text-muted-foreground">Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};


