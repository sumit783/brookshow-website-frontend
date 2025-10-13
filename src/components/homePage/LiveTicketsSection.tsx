import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import ticket1 from "@/assets/ticket-1.jpg";
import ticket2 from "@/assets/ticket-2.jpg";
import ticket3 from "@/assets/ticket-3.jpg";

const liveEvents = [
  {
    id: 1,
    title: "Electronic Nights Festival",
    artist: "Luna Eclipse & Friends",
    date: "March 15, 2025",
    time: "8:00 PM",
    venue: "Downtown Arena",
    location: "Los Angeles, CA",
    price: "$89",
    attendance: "2.5K+ going",
    image: ticket1,
    status: "Selling Fast"
  },
  {
    id: 2,
    title: "Neon Dreams Concert",
    artist: "Digital Nexus Live",
    date: "March 22, 2025",
    time: "9:00 PM",
    venue: "Electric Club",
    location: "Miami, FL",
    price: "$65",
    attendance: "1.8K+ going",
    image: ticket2,
    status: "Available"
  },
  {
    id: 3,
    title: "Jazz & Soul Evening",
    artist: "Sophia Grace Quartet",
    date: "March 28, 2025",
    time: "7:30 PM",
    venue: "Blue Note Lounge",
    location: "New York, NY",
    price: "$125",
    attendance: "850+ going",
    image: ticket3,
    status: "Limited"
  }
];

export const LiveTicketsSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 md:py-28 lg:py-32 sm:px-6 relative overflow-hidden">
      {/* Moving Background */}
      <div className="absolute inset-0 bg-gradient-dark/20 moving-bg"></div>
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-accent/10 rotate-45 floating-card"
            style={{
              width: `${15 + Math.random() * 25}px`,
              height: `${15 + Math.random() * 25}px`,
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
            Live Tickets
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get tickets to the hottest live events and concerts happening now
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 items-stretch">
          {liveEvents.map((event, index) => (
            <div 
              key={event.id}
              className="group relative fade-in-scale h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Premium Animated Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary to-secondary rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute -inset-0.25 bg-gradient-to-br from-primary via-accent to-primary rounded-[1.4rem] opacity-70 group-hover:opacity-95 transition-all duration-500"></div>
              
              {/* Main Premium Card */}
              <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl rounded-[1.3rem] overflow-hidden border border-white/15 group-hover:border-accent/40 shadow-xl group-hover:shadow-primary/25 transition-all duration-700 transform md:group-hover:scale-[1.02] h-full flex flex-col">
                {/* Enhanced Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-44 sm:h-52 md:h-56 object-cover group-hover:scale-110 transition-all duration-1000 filter group-hover:brightness-110 group-hover:saturate-110"
                  />
                  
                  {/* Dynamic Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  {/* Premium Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xl transition-all duration-300 border border-white/30 backdrop-blur-xl ${
                      event.status === 'Selling Fast' 
                        ? 'bg-gradient-to-r from-red-500/90 to-pink-500/90 text-white shadow-red-500/30' 
                        : event.status === 'Limited'
                        ? 'bg-gradient-to-r from-yellow-400/90 to-orange-500/90 text-black shadow-yellow-500/30'
                        : 'bg-gradient-to-r from-green-400/90 to-emerald-500/90 text-white shadow-green-500/30'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  
                  {/* Enhanced Price Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-background/90 to-background/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/30 shadow-lg">
                    <span className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      {event.price}
                    </span>
                  </div>
                  
                  {/* Premium Ticket Icon */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-accent/80 to-primary/80 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <div className="w-8 h-8 bg-gradient-to-br from-white to-white/80 rounded-lg shadow-inner"></div>
                  </div>
                </div>
                
                {/* Enhanced Content Section */}
                <div className="p-6 bg-gradient-to-t from-background/98 to-background/95 flex-1 flex flex-col">
                  {/* Event Title & Artist */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold font-heading mb-3 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent leading-tight">
                      {event.title}
                    </h3>
                    
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full border border-accent/30 backdrop-blur-sm">
                      <span className="text-accent font-bold text-sm">
                        {event.artist}
                      </span>
                    </div>
                  </div>
                  
                  {/* Premium Event Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="col-span-2 bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-accent/30 transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 mr-2 text-accent" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Event Date</span>
                      </div>
                      <span className="text-base font-bold text-foreground">{event.date}</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-accent/30 transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 mr-2 text-accent" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Time</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{event.time}</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-accent/30 transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 mr-2 text-accent" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Attending</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{event.attendance}</span>
                    </div>
                    
                    <div className="col-span-2 bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-accent/30 transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 mr-2 text-accent" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Venue</span>
                      </div>
                      <span className="text-base font-bold text-foreground">{event.venue}, {event.location}</span>
                    </div>
                  </div>
                  
                  {/* Premium CTA Button pinned to bottom */}
                  <div className="mt-auto">
                    <Button 
                      variant="ticket" 
                      size="lg" 
                      className="group relative w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-accent transition-all duration-500 shadow-lg hover:shadow-primary/30 border border-white/20 overflow-hidden"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <span className="relative z-10">View Details</span>
                      {/* subtle shimmer */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </Button>
                  </div>
                </div>
                
                {/* Premium Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="xl" className="glass-modern hover-neon">
            Browse All Events
          </Button>
        </div>
      </div>
    </section>
  );
};