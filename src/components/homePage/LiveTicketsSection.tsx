import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, type Event } from "@/api/events";
import { API_BASE_URI } from "@/api/client";
import { LiveTicketsSkeleton } from "@/components/skeletons/LiveTicketsSkeleton";

export const LiveTicketsSection = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

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

  const formatPrice = (price: string) => {
    const numPrice = parseInt(price, 10);
    if (isNaN(numPrice)) return price;
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  return (
    <section className="sm:px-6 relative overflow-hidden">
      {/* ... existing background code */}
      
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-hero mb-6 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Live Tickets
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get tickets to the hottest live events and concerts happening now
          </p>
        </div>
        
        {isLoading && <LiveTicketsSkeleton />}

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">Failed to load events. Please try again later.</p>
          </div>
        )}

        {data?.success && data.events && data.events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 items-stretch">
            {data.events.slice(0, 3).map((event: Event, index: number) => (
              <div 
                key={event.id}
                className="group relative fade-in-scale h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated Gradient Border on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary to-accent rounded-2xl opacity-0 group-hover:opacity-60 blur transition-opacity duration-500"></div>
                
                {/* Main Card - Standard Design */}
                <div className="relative glass-modern rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/40 shadow-lg group-hover:shadow-xl transition-all duration-500 h-full flex flex-col transform group-hover:scale-[1.03]">
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-48 flex-shrink-0">
                    <img
                      src={getImageUrl(event.image)}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Event';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        event.status === 'Selling Fast' 
                          ? 'bg-red-500/90 text-white border-red-400/30' 
                          : event.status === 'Limited'
                          ? 'bg-yellow-400/90 text-black border-yellow-300/30'
                          : 'bg-green-400/90 text-white border-green-300/30'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 glass rounded-lg px-3 py-1.5 border border-white/20">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(event.price)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="relative p-6 flex-1 flex flex-col bg-background/95">
                    {/* Hover Gradient Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
                    
                    {/* Event Title */}
                    <div className="mb-4 relative z-10">
                      <h3 className="text-xl font-bold font-heading text-foreground mb-2 leading-tight group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent group-hover:to-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                        {event.title}
                      </h3>
                    </div>
                    
                    {/* Event Details */}
                    <div className="space-y-3 mb-5 relative z-10">
                      <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        <Calendar className="w-4 h-4 mr-2 text-accent flex-shrink-0 group-hover:text-primary transition-colors duration-500" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        <Clock className="w-4 h-4 mr-2 text-accent flex-shrink-0 group-hover:text-primary transition-colors duration-500" />
                        <span className="font-medium">{event.time}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        <MapPin className="w-4 h-4 mr-2 text-accent flex-shrink-0 group-hover:text-primary transition-colors duration-500" />
                        <span className="font-medium">{event.venue}, {event.location}</span>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="mt-auto relative z-10">
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="w-full rounded-lg bg-gradient-primary text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg group-hover:shadow-glow"
                        onClick={() => navigate(`/events/${event.id}`)}
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

        {data?.success && (!data.events || data.events.length === 0) && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No live events available at the moment.</p>
          </div>
        )}
        
        <div className="text-center">
          <Button variant="outline" size="xl" className="glass-modern hover-neon">
            Browse All Events
          </Button>
        </div>
      </div>
    </section>
  );
};