import { useNavigate } from "react-router-dom";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { SimilarArtistsSkeleton } from "@/components/skeletons/SimilarArtistsSkeleton";
import { API_BASE_URI } from "@/api/client";
import { type SimilarArtist } from "@/api/artists";

interface SimilarArtistsSectionProps {
  artists: SimilarArtist[];
  isLoading: boolean;
  error: any;
}

export const SimilarArtistsSection = ({ artists, isLoading, error }: SimilarArtistsSectionProps) => {
  const navigate = useNavigate();

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    if (imagePath.startsWith('/')) return `${API_BASE_URI}${imagePath}`;
    return `${API_BASE_URI}/${imagePath}`;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Similar Artists
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            You may also like these similar artists
          </p>
        </div>

        {isLoading && <SimilarArtistsSkeleton />}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load similar artists. Please try again later.</p>
          </div>
        )}

        {artists && artists.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {artists.map((similarArtist: SimilarArtist) => (
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

        {(!artists || artists.length === 0) && !isLoading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No similar artists found.</p>
          </div>
        )}
      </div>
    </section>
  );
};
