import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { BookingCalendar } from "@/components/artistDeatilsPage/BookingCalendar";
import { MasonryGrid } from "@/components/artistDeatilsPage/MasonryGrid";
import { ProfileHeader } from "@/components/artistDeatilsPage/ProfileHeader";
import { AboutSection } from "@/components/artistDeatilsPage/AboutSection";
import { Specialties } from "@/components/artistDeatilsPage/Specialties";
import { SocialLinks } from "@/components/artistDeatilsPage/SocialLinks";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artist4 from "@/assets/artist-4.jpg";

// Mock artist data (in a real app, this would come from an API)
const artistsData = {
  "1": {
    id: 1,
    name: "Luna Eclipse",
    category: "Electronic DJ",
    rating: 4.9,
    location: "Los Angeles, CA",
    image: artist1,
    specialties: ["House", "Techno", "Progressive"],
    bio: "Luna Eclipse is a renowned electronic DJ with over 8 years of experience in creating unforgettable musical experiences. Known for seamless mixing and high-energy performances that keep crowds dancing all night long. Her unique style blends progressive house with techno elements, creating an atmosphere that transcends ordinary club experiences.",
    socialMedia: {
      instagram: "https://instagram.com/lunaeclipse",
      twitter: "https://twitter.com/lunaeclipse",
      youtube: "https://youtube.com/lunaeclipse"
    },
    portfolio: {
      images: [artist1, artist2, artist3, artist4, artist1, artist2, artist3, artist4],
      videos: [artist3, artist4, artist1, artist2]
    },
    stats: {
      events: 340,
      experience: "8+ Years"
    }
  },
  "2": {
    id: 2,
    name: "Marcus Stone",
    category: "Rock Guitarist",
    rating: 4.8,
    location: "Nashville, TN",
    image: artist2,
    specialties: ["Rock", "Blues", "Alternative"],
    bio: "Marcus Stone brings raw energy and masterful guitar skills to every performance. A Nashville native with deep roots in blues and rock, he delivers powerful performances that resonate with audiences of all ages. His guitar work has been featured in numerous albums and live performances across the country.",
    socialMedia: {
      instagram: "https://instagram.com/marcusstone",
      twitter: "https://twitter.com/marcusstone",
      youtube: "https://youtube.com/marcusstone"
    },
    portfolio: {
      images: [artist2, artist1, artist4, artist3, artist2, artist1, artist4, artist3],
      videos: [artist1, artist2, artist3, artist4]
    },
    stats: {
      events: 220,
      experience: "12+ Years"
    }
  },
  "3": {
    id: 3,
    name: "Sophia Grace",
    category: "Vocalist",
    rating: 5.0,
    location: "New York, NY",
    image: artist3,
    specialties: ["Jazz", "Soul", "R&B"],
    bio: "Sophia Grace possesses a voice that can move souls and captivate hearts. With perfect pitch and emotional depth, she brings classic jazz and modern R&B to life in ways that leave audiences spellbound. Her performances are intimate yet powerful, creating connections that last long after the final note.",
    socialMedia: {
      instagram: "https://instagram.com/sophiagrace",
      twitter: "https://twitter.com/sophiagrace",
      youtube: "https://youtube.com/sophiagrace"
    },
    portfolio: {
      images: [artist3, artist4, artist1, artist2, artist3, artist4, artist1, artist2],
      videos: [artist4, artist3, artist2, artist1]
    },
    stats: {
      events: 156,
      experience: "10+ Years"
    }
  },
  "4": {
    id: 4,
    name: "Digital Nexus",
    category: "Producer",
    rating: 4.7,
    location: "Miami, FL",
    image: artist4,
    specialties: ["EDM", "Synthwave", "Ambient"],
    bio: "Digital Nexus is a cutting-edge music producer specializing in electronic soundscapes that transport listeners to another dimension. Known for innovative beats and atmospheric compositions that define modern electronic music. His productions have topped electronic charts and been featured in major festivals worldwide.",
    socialMedia: {
      instagram: "https://instagram.com/digitalnexus",
      twitter: "https://twitter.com/digitalnexus",
      youtube: "https://youtube.com/digitalnexus"
    },
    portfolio: {
      images: [artist4, artist3, artist2, artist1, artist4, artist3, artist2, artist1],
      videos: [artist2, artist1, artist4, artist3]
    },
    stats: {
      events: 280,
      experience: "6+ Years"
    }
  }
};

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const artist = id ? artistsData[id as keyof typeof artistsData] : null;

  // Scroll to top on route mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-dark/20 moving-bg"></div>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-accent/30 rounded-full floating-card"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 container mx-auto max-w-7xl">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="mb-8 glass-modern hover-neon gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Artists
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Artist Info */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-2xl border border-white/10">
                  <CardHeader>
                    <ProfileHeader
                      image={artist.image}
                      name={artist.name}
                      category={artist.category}
                      rating={artist.rating}
                      location={artist.location}
                      stats={artist.stats}
                    />
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <AboutSection bio={artist.bio} />
                    <Separator className="bg-white/10" />
                    <Specialties specialties={artist.specialties} />
                    <Separator className="bg-white/10" />
                    <SocialLinks 
                      instagram={artist.socialMedia.instagram}
                      twitter={artist.socialMedia.twitter}
                      youtube={artist.socialMedia.youtube}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Booking Calendar */}
              <div>
                <BookingCalendar artistName={artist.name} />
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
                Portfolio
              </h2>
              <p className="text-xl text-muted-foreground">
                Explore {artist.name}'s work and performances
              </p>
            </div>
            
            <MasonryGrid 
              images={artist.portfolio.images}
              videos={artist.portfolio.videos}
            />
          </div>
        </section>

        {/* Recommended Artists */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
                Recommended Artists
              </h2>
              <p className="text-xl text-muted-foreground">
                You may also like these similar performers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
              {Object.values(artistsData)
                .filter(a => a.id !== artist.id)
                .slice(0, 4)
                .map((rec, index) => (
                <div 
                  key={rec.id}
                  className="group relative fade-in-scale h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Animated Gradient Border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="absolute -inset-0.25 bg-gradient-to-r from-accent via-primary to-accent rounded-[1.4rem] opacity-60 group-hover:opacity-90 transition-all duration-500"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl rounded-[1.3rem] overflow-hidden border border-white/10 group-hover:border-accent/30 shadow-xl group-hover:shadow-accent/20 transition-all duration-700 transform md:group-hover:scale-[1.02] h-full flex flex-col">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-110 transition-all duration-1000 filter group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400/90 to-orange-500/90 backdrop-blur-xl rounded-xl px-3 py-2 border border-yellow-300/30 shadow-lg">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-white fill-current" />
                          <span className="text-sm font-bold text-white">{rec.rating}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-accent/80 to-primary/80 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <div className="w-6 h-6 bg-gradient-to-br from-white to-white/80 rounded-full shadow-inner"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 bg-gradient-to-t from-background/98 to-background/95 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold font-heading mb-2 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent leading-tight">
                          {rec.name}
                        </h3>
                        <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full border border-accent/30 backdrop-blur-sm">
                          <span className="text-accent font-bold text-xs tracking-wide uppercase">
                            {rec.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 p-2 bg-gradient-to-r from-muted/30 to-muted/20 rounded-lg border border-white/10">
                        <MapPin className="w-4 h-4 mr-2 text-accent" />
                        <span className="text-foreground/80 font-medium text-sm">{rec.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {rec.specialties.slice(0,3).map((s, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gradient-to-r from-primary/80 to-accent/80 text-white rounded-full text-xs font-semibold border border-white/20 backdrop-blur-sm"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <Button 
                          variant="hero" 
                          size="lg" 
                          className="group relative w-full h-12 text-base font-bold rounded-xl overflow-hidden bg-gradient-to-r from-primary to-accent transition-all duration-500 shadow-lg hover:shadow-xl border border-white/20"
                          onClick={() => navigate(`/artists/${rec.id}`)}
                        >
                          <div
                            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: "conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0.08), rgba(255,255,255,0.0), rgba(255,255,255,0.12))" }}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10px_10px,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:12px_12px] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                          <div className="pointer-events-none absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                          <span className="relative z-10">View Details</span>
                        </Button>
                      </div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtistProfile;