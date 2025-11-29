import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { BookingCalendar } from "@/components/artistDeatilsPage/BookingCalendar";
import { MasonryGrid } from "@/components/artistDeatilsPage/MasonryGrid";
import { ProfileHeader } from "@/components/artistDeatilsPage/ProfileHeader";
import { AboutSection } from "@/components/artistDeatilsPage/AboutSection";
import { Specialties } from "@/components/artistDeatilsPage/Specialties";
import { fetchArtistProfile, type ArtistProfile, fetchSimilarArtists, type SimilarArtist } from "@/api/artists";
import { API_BASE_URI } from "@/api/client";
import { ArtistProfileSkeleton } from "@/components/skeletons/ArtistProfileSkeleton";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { SimilarArtistsSkeleton } from "@/components/skeletons/SimilarArtistsSkeleton";

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: artistData, isLoading, error } = useQuery({
    queryKey: ['artistProfile', id],
    queryFn: () => fetchArtistProfile(id!),
    enabled: !!id,
  });

  const { data: similarArtistsData, isLoading: isLoadingSimilar, error: similarArtistsError } = useQuery({
    queryKey: ['similarArtists', id],
    queryFn: () => fetchSimilarArtists(id!),
    enabled: !!id,
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

  if (isLoading) {
    return <ArtistProfileSkeleton />;
  }

  if (error || !artistData || !artistData.success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {error ? 'Failed to load artist profile. Please try again later.' : 'The artist you are looking for does not exist.'}
          </p>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const artist = artistData;

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
                      image={getImageUrl(artist.image) || 'https://via.placeholder.com/400x400?text=Artist'}
                      name={artist.name}
                      category={artist.category}
                      rating={artist.rating}
                      location={artist.location}
                      stats={artist.stats}
                      price={artist.price}
                    />
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <AboutSection bio={artist.bio} />
                    <Separator className="bg-white/10" />
                    <Specialties specialties={artist.specialties} />
                    <Separator className="bg-white/10" />
                  </CardContent>
                </Card>
              </div>

              {/* Booking Calendar */}
              <div>
                <BookingCalendar artistName={artist.name} price={artist.price} artistId={artist.id} />
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
            
            {artist.portfolio.images.length > 0 || artist.portfolio.videos.length > 0 ? (
              <MasonryGrid 
                images={artist.portfolio.images.map(img => getImageUrl(img))}
                videos={artist.portfolio.videos.map(vid => getImageUrl(vid))}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No portfolio items available yet</p>
              </div>
            )}
          </div>
        </section>

        {/* Similar Artists */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
                Similar Artists
              </h2>
              <p className="text-xl text-muted-foreground">
                You may also like these similar artists
              </p>
            </div>

            {isLoadingSimilar && <SimilarArtistsSkeleton />}

            {similarArtistsError && (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load similar artists. Please try again later.</p>
              </div>
            )}

            {similarArtistsData?.success && similarArtistsData.artists && similarArtistsData.artists.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {similarArtistsData.artists.map((similarArtist: SimilarArtist) => (
                  <ArtistCard 
                    key={similarArtist.id}
                    artist={{
                      id: similarArtist.id,
                      name: similarArtist.name,
                      image: getImageUrl(similarArtist.image),
                      talent: similarArtist.category, // Map category to talent
                      rating: similarArtist.rating,
                      city: similarArtist.location, // Map location to city
                      price: similarArtist.price,
                    }}
                    onViewProfile={(artistId) => navigate(`/artists/${artistId}`)}
                  />
                ))}
              </div>
            )}

            {similarArtistsData?.success && (!similarArtistsData.artists || similarArtistsData.artists.length === 0) && !isLoadingSimilar && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No similar artists found.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtistProfile;