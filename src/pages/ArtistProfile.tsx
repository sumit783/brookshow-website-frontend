import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { BookingCalendar } from "@/components/artistDeatilsPage/BookingCalendar";
import { ProfileHeader } from "@/components/artistDeatilsPage/ProfileHeader";
import { AboutSection } from "@/components/artistDeatilsPage/AboutSection";
import { Specialties } from "@/components/artistDeatilsPage/Specialties";
import { fetchArtistProfile, type ArtistProfile, fetchSimilarArtists, type SimilarArtist, fetchArtistReviews, type ArtistReview } from "@/api/artists";
import { API_BASE_URI } from "@/api/client";
import { ArtistProfileSkeleton } from "@/components/skeletons/ArtistProfileSkeleton";
import { PortfolioSection } from "@/components/artistDeatilsPage/PortfolioSection";
import { ReviewsSection } from "@/components/artistDeatilsPage/ReviewsSection";
import { SimilarArtistsSection } from "@/components/artistDeatilsPage/SimilarArtistsSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

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

  const { data: reviewsData, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['artistReviews', id],
    queryFn: () => fetchArtistReviews(id!),
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
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 md:px-6 overflow-hidden">
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
              className="mb-6 sm:mb-8 glass-modern hover-neon gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Artists
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Artist Info - Sticky on xl screens, normal flow on others */}
              <div className="lg:col-span-2 xl:sticky xl:top-24 xl:self-start">
                <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-2xl border border-white/10">
                  <CardHeader>
                    <ProfileHeader
                      image={getImageUrl(artist.image) || 'https://avatar.iran.liara.run/public'}
                      name={artist.name}
                      category={artist.category}
                      rating={artist.rating}
                      location={artist.location}
                      stats={artist.stats}
                      price={artist.price}
                      onBookClick={() => setIsBookingDialogOpen(true)}
                    />
                  </CardHeader>

                  <CardContent className="space-y-4 sm:space-y-6">
                    <AboutSection bio={artist.bio} />
                    <Separator className="bg-white/10" />
                    <Specialties specialties={artist.specialties} />
                    <Separator className="bg-white/10" />
                  </CardContent>
                </Card>
              </div>

              {/* Booking Calendar - Desktop */}
              <div className="hidden lg:block">
                <BookingCalendar artistName={artist.name} price={artist.price} artistId={artist.id} />
              </div>
            </div>
          </div>
        </section>

        {/* Booking Dialog for Mobile/Tablet */}
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogContent className="sm:max-w-[500px] h-[90vh] sm:h-auto overflow-y-auto bg-background/95 backdrop-blur-xl border-white/10 p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Book {artist.name}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <BookingCalendar
                artistName={artist.name}
                price={artist.price}
                artistId={artist.id}
                isDialogView={true}
                onSuccess={() => setIsBookingDialogOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Portfolio Section */}
        <PortfolioSection
          artistName={artist.name}
          images={artist.portfolio.images}
          videos={artist.portfolio.videos}
        />

        {/* Reviews Section */}
        <ReviewsSection
          artistName={artist.name}
          reviews={reviewsData?.success ? reviewsData.reviews : []}
          isLoading={isLoadingReviews}
        />

        {/* Similar Artists */}
        <SimilarArtistsSection
          artists={similarArtistsData?.success ? similarArtistsData.artists : []}
          isLoading={isLoadingSimilar}
          error={similarArtistsError}
        />
      </div>
    </div>
  );
};

export default ArtistProfile;