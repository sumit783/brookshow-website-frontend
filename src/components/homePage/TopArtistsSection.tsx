import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopArtists, type TopArtist } from "@/api/artists";
import { API_BASE_URI } from "@/api/client";
import { TopArtistsSkeleton } from "@/components/skeletons/TopArtistsSkeleton";
import { LazyImage } from "@/components/ui/LazyImage";

export const TopArtistsSection = () => {
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['topArtists'],
    queryFn: fetchTopArtists,
  });

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // If it starts with /, it's a relative path from the base URI
    if (imagePath.startsWith('/')) {
      return `${API_BASE_URI}${imagePath}`;
    }
    return `${API_BASE_URI}/${imagePath}`;
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 sm:px-6 relative overflow-hidden">
      {/* ... existing background code */}
      
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-hero mb-6 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Top <span className="text-primary font-hero">Artists</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover verified artists who deliver exceptional performances
          </p>
        </div>
        
        {isLoading && <TopArtistsSkeleton />}

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">Failed to load artists. Please try again later.</p>
          </div>
        )}

        {data?.success && data.artists && data.artists.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 items-stretch">
            {data.artists.map((artist: TopArtist, index: number) => (
            <div 
              key={artist.id}
              className="group relative fade-in-scale h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated Gradient Border on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary to-accent rounded-2xl opacity-0 group-hover:opacity-60 blur transition-opacity duration-500"></div>
              
              {/* Main Card - Professional Design */}
              <div className="relative glass-modern rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/40 shadow-lg group-hover:shadow-xl transition-all duration-500 h-full min-h-[480px] flex flex-col transform group-hover:scale-[1.03]">
                {/* Image Section */}
                <div className="relative overflow-hidden h-48 flex-shrink-0">
                  <LazyImage
                    src={getImageUrl(artist.image)}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    fallbackSrc="https://via.placeholder.com/400x300?text=Artist"
                    skeletonClassName="rounded-t-2xl"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 glass rounded-lg px-3 py-1.5 border border-white/20">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-white">{artist.rating}</span>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 glass rounded-lg border border-white/20 text-xs font-semibold text-white uppercase tracking-wide">
                      {artist.category}
                    </span>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="relative p-6 flex-1 flex flex-col bg-background/95">
                  {/* Hover Gradient Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
                  
                  {/* Artist Name */}
                  <div className=" relative z-10">
                    <h3 className="text-2xl font-bold font-heading text-foreground mb-2 leading-tight group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent group-hover:to-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {artist.name}
                    </h3>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center mb-4 text-muted-foreground relative z-10 group-hover:text-foreground transition-colors duration-500">
                    <MapPin className="w-4 h-4 mr-2 text-accent group-hover:text-primary transition-colors duration-500" />
                    <span className="text-sm font-medium">{artist.location}</span>
                  </div>
                  
                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                    {artist.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 bg-muted/50 rounded-md text-xs font-medium text-foreground/80 border border-border group-hover:bg-gradient-to-r group-hover:from-primary/20 group-hover:to-accent/20 group-hover:border-primary/40 group-hover:text-foreground transition-all duration-500"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Price Display - Standard INR Format */}
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 pb-4 border-b border-border">
                      <span className="text-2xl font-bold text-primary font-heading">
                        ₹{artist.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-muted-foreground">/event</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-auto relative z-10">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full rounded-lg bg-gradient-primary text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg group-hover:shadow-glow"
                      onClick={() => navigate(`/artists/${artist.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                
                {/* Top Gradient Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
            ))}
          </div>
        )}

        {data?.success && (!data.artists || data.artists.length === 0) && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No artists available at the moment.</p>
          </div>
        )}
        
        <div className="text-center">
          <Button onClick={() => navigate("/artists")} variant="outline" size="xl" className="glass-modern hover-neon">
            View All Artists
          </Button>
        </div>
      </div>
    </section>
  );
};