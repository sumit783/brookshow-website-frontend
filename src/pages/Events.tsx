import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import { EventsFilters } from "@/components/events/EventsFilters";
import ticket1 from "@/assets/ticket-1.jpg";
import ticket2 from "@/assets/ticket-2.jpg";
import ticket3 from "@/assets/ticket-3.jpg";

const allEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM",
    venue: "Central Park Arena",
    city: "New York",
    price: "$89",
    image: ticket1,
    status: "Selling Fast",
    attendance: "5.2K",
    category: "Festival"
  },
  {
    id: 2,
    title: "Electronic Nights",
    date: "July 22, 2024",
    time: "9:00 PM",
    venue: "Skyline Club",
    city: "Los Angeles",
    price: "$65",
    image: ticket2,
    status: "Available",
    attendance: "3.8K",
    category: "Electronic"
  },
  {
    id: 3,
    title: "Jazz Under the Stars",
    date: "August 5, 2024",
    time: "7:30 PM",
    venue: "Riverside Theater",
    city: "Chicago",
    price: "$45",
    image: ticket3,
    status: "Limited",
    attendance: "2.1K",
    category: "Jazz"
  },
  {
    id: 4,
    title: "Rock Revolution Tour",
    date: "August 12, 2024",
    time: "8:00 PM",
    venue: "Thunder Dome",
    city: "Austin",
    price: "$95",
    image: ticket1,
    status: "Available",
    attendance: "6.5K",
    category: "Rock"
  },
  {
    id: 5,
    title: "Hip Hop Showcase",
    date: "August 20, 2024",
    time: "10:00 PM",
    venue: "Urban Arena",
    city: "Atlanta",
    price: "$75",
    image: ticket2,
    status: "Selling Fast",
    attendance: "4.2K",
    category: "Hip Hop"
  },
  {
    id: 6,
    title: "Classical Evening",
    date: "September 1, 2024",
    time: "7:00 PM",
    venue: "Symphony Hall",
    city: "Boston",
    price: "$55",
    image: ticket3,
    status: "Available",
    attendance: "1.8K",
    category: "Classical"
  }
];

const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const cities = ["all", ...Array.from(new Set(allEvents.map(event => event.city)))];
  const categories = ["all", ...Array.from(new Set(allEvents.map(event => event.category)))];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "all" || event.city === selectedCity;
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="h-full">
              <EventCard
                event={event as any}
                index={index}
                onViewDetails={(id) => navigate(`/event/${id}`)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
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
