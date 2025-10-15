import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Calendar } from "lucide-react";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artist4 from "@/assets/artist-4.jpg";

const topArtists = [
  {
    id: 1,
    name: "Luna Eclipse",
    category: "Electronic DJ",
    rating: 4.9,
    location: "Los Angeles, CA",
    image: artist1,
    specialties: ["House", "Techno", "Progressive"],
    price: 750
  },
  {
    id: 2,
    name: "Marcus Stone",
    category: "Rock Guitarist",
    rating: 4.8,
    location: "Nashville, TN",
    image: artist2,
    specialties: ["Rock", "Blues", "Alternative"],
    price: 600
  },
  {
    id: 3,
    name: "Sophia Grace",
    category: "Vocalist",
    rating: 5.0,
    location: "New York, NY",
    image: artist3,
    specialties: ["Jazz", "Soul", "R&B"],
    price: 820
  },
  {
    id: 4,
    name: "Digital Nexus",
    category: "Producer",
    rating: 4.7,
    location: "Miami, FL",
    image: artist4,
    specialties: ["EDM", "Synthwave", "Ambient"],
    price: 500
  }
];

export const TopArtistsSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 md:py-28 lg:py-32 sm:px-6 relative overflow-hidden">
      {/* Moving Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-dark/10 moving-bg"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-accent/20 rounded-full floating-card"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Top Artists
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover verified artists who deliver exceptional performances
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 items-stretch">
          {topArtists.map((artist, index) => (
            <div 
              key={artist.id}
              className="group relative fade-in-scale h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute -inset-0.25 bg-gradient-to-r from-accent via-primary to-accent rounded-[1.4rem] opacity-60 group-hover:opacity-90 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl rounded-[1.3rem] overflow-hidden border border-white/10 group-hover:border-accent/30 shadow-xl group-hover:shadow-accent/20 transition-all duration-700 transform md:group-hover:scale-[1.02] h-full flex flex-col">
                {/* Image Section with Enhanced Effects */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-110 transition-all duration-1000 filter group-hover:brightness-110"
                  />
                  
                  {/* Premium Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  {/* Floating Rating Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400/90 to-orange-500/90 backdrop-blur-xl rounded-xl px-3 py-2 border border-yellow-300/30 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-white fill-current" />
                      <span className="text-sm font-bold text-white">{artist.rating}</span>
                    </div>
                  </div>
                  
                  {/* Premium Status Indicator */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-accent/80 to-primary/80 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-white to-white/80 rounded-full shadow-inner"></div>
                  </div>
                  
                  {/* Bottom Gradient Enhancement */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                </div>
                
                {/* Enhanced Content Section */}
                <div className="relative p-6 bg-gradient-to-t from-background/98 to-background/95 flex-1 flex flex-col">
                  {/* Artist Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold font-heading mb-2 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent leading-tight">
                      {artist.name}
                    </h3>
                    
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full border border-accent/30 backdrop-blur-sm">
                      <span className="text-accent font-bold text-xs tracking-wide uppercase">
                        {artist.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Location with Enhanced Styling */}
                  <div className="flex items-center mb-4 p-2 bg-gradient-to-r from-muted/30 to-muted/20 rounded-lg border border-white/10">
                    <MapPin className="w-4 h-4 mr-2 text-accent" />
                    <span className="text-foreground/80 font-medium text-sm">{artist.location}</span>
                  </div>
                  
                  {/* Premium Specialty Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {artist.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-primary/80 to-accent/80 text-white rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  
                  
                  {/* Premium CTA Button at Bottom */}
                  <div className="mt-auto">
                  {/* {typeof (artist as any).price === 'number' && (
                    <div className="mb-6">
                      <span className="w-full justify-center inline-flex items-center px-3 py-1 rounded-full font-semibold bg-green-500/15 text-green-300 border border-green-400/30">
                        From ${(artist as any).price}
                      </span>
                    </div>
                  )} */}
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="group relative w-full h-12 text-base font-bold rounded-xl overflow-hidden bg-gradient-to-r from-primary to-accent transition-all duration-500 shadow-lg hover:shadow-xl border border-white/20"
                      onClick={() => navigate(`/artists/${artist.id}`)}
                    >
                      {/* Animated border glow */}
                      <div
                        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0.08), rgba(255,255,255,0.0), rgba(255,255,255,0.12))" }}
                      />
                      {/* Subtle dot pattern on hover */}
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10px_10px,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:12px_12px] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                      {/* Shimmer sweep */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                      <span className="relative z-10">View Details</span>
                    </Button>
                  </div>
                </div>
                
                {/* Subtle Animation Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button onClick={() => navigate("/artists")} variant="outline" size="xl" className="glass-modern hover-neon">
            View All Artists
          </Button>
        </div>
      </div>
    </section>
  );
};