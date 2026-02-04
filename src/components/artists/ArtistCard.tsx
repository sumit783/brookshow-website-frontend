import React from "react";
import { LazyImage } from "@/components/ui/LazyImage";

type Artist = {
  id: string;
  name: string;
  talent: string;
  city: string;
  image: string;
  rating: number;
  price?: number;
};

type ArtistCardProps = {
  artist: Artist;
  index?: number;
  onViewProfile: (id: string) => void;
};

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, index = 0, onViewProfile }) => {
  return (
    <div
      className="glass-ultra rounded-2xl overflow-hidden shadow-strong border border-white/10 hover-glow transition-smooth cursor-pointer group fade-in-scale"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onViewProfile(artist.id)}
    >
      <div className="relative h-72 overflow-hidden">
        <LazyImage
          src={artist.image}
          alt={`${artist.name} - ${artist.talent}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
          skeletonClassName="rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-smooth"></div>

        <div className="absolute top-4 right-4 glass-modern px-3 py-1.5 rounded-full border border-white/20">
          <span className="text-sm font-bold text-white flex items-center gap-1">★ {artist.rating}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-smooth">{artist.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-white/90 font-medium bg-white/10 px-3 py-1 rounded-full text-sm">{artist.talent}</span>
            <span className="text-white/80 text-sm">{artist.city}</span>
          </div>
          
        </div>
      </div>

      <div className="px-5 py-4 flex items-center justify-between flex-col gap-2">
      {typeof artist.price === 'number' && (
            <div className="w-full">
              <span className="w-full justify-center inline-flex items-center px-2.5 py-0.5 rounded-full text-2xl font-semibold ">
                From <span className="text-accent ml-2"> ${artist.price}</span>
              </span>
            </div>
          )}
        {/* Keeping button for visual parity and accessibility; click handled on container too */}
        <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-strong hover:from-accent hover:to-primary h-11 px-8"
          onClick={(e) => { e.stopPropagation(); onViewProfile(artist.id); }}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ArtistCard;


