import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import { EventsFilters } from "@/components/events/EventsFilters";
import { useQuery } from "@tanstack/react-query";
import { fetchEventsList, type EventListItem } from "@/api/events";
import { API_BASE_URI } from "@/api/client";
import { EventsGridSkeleton } from "@/components/skeletons/EventsGridSkeleton";


const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ['eventsList'],
    queryFn: fetchEventsList,
  });

  const allEvents = data?.events || [];

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

  const cities = ["all", ...Array.from(new Set(allEvents.map(event => event.location)))];
  const categories = ["all", ...Array.from(new Set(allEvents.map(event => event.category || "Other")))];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "all" || event.location === selectedCity;
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    
    return matchesSearch && matchesCity && matchesCategory;
  });

    // Scroll to top when navigating to this page or switching event IDs
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }, []);  

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-dark/30 moving-bg"></div>
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-accent/10 rotate-45 floating-card"
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="text-center mb-16 fade-in-scale">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 glass-modern rounded-full border border-accent/30">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-sm font-bold text-accent uppercase tracking-wider">Discover Events</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold font-heading mb-6 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent leading-tight">
            All Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience unforgettable moments at the hottest events
          </p>
        </div>

        {isLoading ? (
          <div className="mb-10">
            <EventsFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              cities={[]} // Empty array for cities while loading
              categories={[]} // Empty array for categories while loading
            />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-destructive">Failed to load filters.</div>
        ) : (
          <EventsFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            cities={cities}
            categories={categories}
          />
        )}

        {/* Events Grid */}
        {isLoading && <EventsGridSkeleton />}

        {error && !isLoading && (
          <div className="text-center py-16">
            <div className="glass-modern rounded-2xl p-12 max-w-md mx-auto">
              <p className="text-2xl font-semibold text-destructive mb-2">Failed to Load Events</p>
              <p className="text-muted-foreground">Please try again later.</p>
            </div>
          </div>
        )}

        {!isLoading && !error && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="h-full">
                <EventCard
                  event={{
                    id: parseInt(event.id),
                    title: event.title,
                    date: event.date,
                    time: event.time,
                    venue: event.venue,
                    city: event.location,
                    price: event.price,
                    image: getImageUrl(event.image),
                    status:
                      event.status === "Selling Fast" ||
                      event.status === "Available" ||
                      event.status === "Limited"
                        ? event.status
                        : "Available", // Default to "Available" if status is not a valid type
                    attendance: event.attendance || "N/A",
                    category: event.category || "Other",
                  }}
                  index={index}
                  onViewDetails={(id) => navigate(`/events/${event.id}`)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-32 fade-in-scale">
            <div className="glass-modern rounded-3xl p-16 max-w-2xl mx-auto border border-white/10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">No events found</h3>
              <p className="text-xl text-muted-foreground">Try adjusting your filters to discover more events</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
