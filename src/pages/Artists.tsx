import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtistsFilters } from "@/components/artists/ArtistsFilters";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { useQuery } from "@tanstack/react-query";
import { searchArtists, fetchSearchFilters } from "@/api/artists";
import { API_BASE_URI } from "@/api/client";
import { ArtistsGridSkeleton } from "@/components/skeletons/ArtistsGridSkeleton";
import { DateRange } from "react-day-picker";

export default function Artists() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedTalent, setSelectedTalent] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Fetch Filters
  const { data: filtersData } = useQuery({
    queryKey: ['artistSearchFilters'],
    queryFn: fetchSearchFilters,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['artists', searchQuery, selectedCity, selectedTalent, dateRange?.from, dateRange?.to],
    queryFn: () => searchArtists({
      name: searchQuery,
      location: selectedCity,
      talent: selectedTalent,
      startDate: dateRange?.from?.toISOString(),
      endDate: dateRange?.to?.toISOString(),
    }),
  });

  const allArtists = data?.artists || [];

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    if (imagePath.startsWith('/')) {
      return `${API_BASE_URI}${imagePath}`;
    }
    return `${API_BASE_URI}/${imagePath}`;
  };

  const cities = ["all", ...(filtersData?.cities || [])]; 
  const talents = ["all", ...(filtersData?.services || [])];

  return (
    <div className="min-h-screen bg-background">
      
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark moving-bg opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              Discover Talented Artists
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with extraordinary performers and entertainers for your next unforgettable event
            </p>
          </div>

          {/* Filters */}
          <ArtistsFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedTalent={selectedTalent}
            setSelectedTalent={setSelectedTalent}
            dateRange={dateRange}
            setDateRange={setDateRange}
            cities={cities}
            talents={talents}
          />

          {/* Artists Grid */}
          {isLoading && <ArtistsGridSkeleton />}

          {error && !isLoading && (
            <div className="text-center py-16">
              <div className="glass-modern rounded-2xl p-12 max-w-md mx-auto">
                <p className="text-2xl font-semibold text-destructive mb-2">Failed to Load Artists</p>
                <p className="text-muted-foreground">Please try again later.</p>
              </div>
            </div>
          )}

          {!isLoading && !error && allArtists.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {allArtists.map((artist, index) => (
                <ArtistCard
                  key={artist.id}
                  artist={{
                    id: artist.id,
                    name: artist.name,
                    talent: artist.category,
                    city: artist.location,
                    image: getImageUrl(artist.image),
                    rating: artist.rating,
                    price: artist.price,
                  }}
                  index={index}
                  onViewProfile={(id) => navigate(`/artists/${id}`)}
                />
              ))}
            </div>
          )}

          {!isLoading && !error && allArtists.length === 0 && (
            <div className="text-center py-16">
              <div className="glass-modern rounded-2xl p-12 max-w-md mx-auto">
                <p className="text-2xl font-semibold text-muted-foreground mb-2">No Artists Found</p>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
