import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtistsFilters } from "@/components/artists/ArtistsFilters";
import { ArtistCard } from "@/components/artists/ArtistCard";

interface Artist {
  id: string;
  name: string;
  talent: string;
  city: string;
  image: string;
  rating: number;
  price?: number;
}

const allArtists: Artist[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    talent: "DJ",
    city: "New York",
    image: "@/assets/artist-1.jpg",
    rating: 4.8,
    price: 650
  },
  {
    id: "2",
    name: "Mike Chen",
    talent: "Singer",
    city: "Los Angeles",
    image: "@/assets/artist-2.jpg",
    rating: 4.9,
    price: 550
  },
  {
    id: "3",
    name: "Emma Davis",
    talent: "Dancer",
    city: "Chicago",
    image: "@/assets/artist-3.jpg",
    rating: 4.7,
    price: 480
  },
  {
    id: "4",
    name: "Alex Turner",
    talent: "DJ",
    city: "Miami",
    image: "@/assets/artist-4.jpg",
    rating: 4.6,
    price: 700
  },
  {
    id: "5",
    name: "Lisa Rodriguez",
    talent: "Singer",
    city: "New York",
    image: "@/assets/artist-1.jpg",
    rating: 4.9,
    price: 590
  },
  {
    id: "6",
    name: "David Kim",
    talent: "Band",
    city: "Los Angeles",
    image: "@/assets/artist-2.jpg",
    rating: 4.8,
    price: 900
  },
  {
    id: "7",
    name: "Sophie Martinez",
    talent: "Dancer",
    city: "Miami",
    image: "@/assets/artist-3.jpg",
    rating: 4.5,
    price: 450
  },
  {
    id: "8",
    name: "Ryan Cooper",
    talent: "DJ",
    city: "Chicago",
    image: "@/assets/artist-4.jpg",
    rating: 4.7,
    price: 620
  }
];

export default function Artists() {

 

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedTalent, setSelectedTalent] = useState<string>("all");

  const cities = ["all", ...Array.from(new Set(allArtists.map(a => a.city)))];
  const talents = ["all", ...Array.from(new Set(allArtists.map(a => a.talent)))];

  const filteredArtists = allArtists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "all" || artist.city === selectedCity;
    const matchesTalent = selectedTalent === "all" || artist.talent === selectedTalent;
    return matchesSearch && matchesCity && matchesTalent;
  });


        // Scroll to top when navigating to this page or switching event IDs
        // useEffect(() => {
        //   window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        // }, []); 

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
            cities={cities}
            talents={talents}
          />

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredArtists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                index={index}
                onViewProfile={(id) => navigate(`/artist/${id}`)}
              />
            ))}
          </div>

          {filteredArtists.length === 0 && (
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
