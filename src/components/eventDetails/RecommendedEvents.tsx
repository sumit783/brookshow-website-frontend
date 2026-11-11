"use client";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, type Event } from "@/api/events";
import { API_BASE_URI } from "@/api/client";

interface RecommendedEventsProps {
  events?: any;
  currentId: number | string;
}

export function RecommendedEvents({ currentId }: RecommendedEventsProps) {
  const router = useRouter();

  const { data: eventsData, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    if (imagePath.startsWith('/')) return `${API_BASE_URI}${imagePath}`;
    return `${API_BASE_URI}/${imagePath}`;
  };

  const allEvents: Event[] = eventsData?.events || [];
  const recommended = allEvents
    .filter((e) => String(e.id) !== String(currentId))
    .slice(0, 3);

  if (!isLoading && recommended.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Similar Events
          </h2>
          <p className="text-xl text-muted-foreground">You may also be interested in</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-[1.3rem] bg-white/5 animate-pulse h-96 border border-white/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {recommended.map((ev, index) => (
              <div
                key={ev.id}
                className="group relative fade-in-scale h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary to-secondary rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute -inset-0.25 bg-gradient-to-br from-primary via-accent to-primary rounded-[1.4rem] opacity-70 group-hover:opacity-95 transition-all duration-500"></div>

                <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl rounded-[1.3rem] overflow-hidden border border-white/15 group-hover:border-accent/40 shadow-xl group-hover:shadow-primary/25 transition-all duration-700 transform md:group-hover:scale-[1.02] h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(ev.image)}
                      alt={ev.title}
                      className="w-full h-44 sm:h-52 md:h-56 object-cover group-hover:scale-110 transition-all duration-1000 filter group-hover:brightness-110 group-hover:saturate-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xl transition-all duration-300 border border-white/30 backdrop-blur-xl ${
                        ev.status?.toLowerCase().replace(/\s+/g, '') === 'soldout'
                          ? 'bg-red-500/90 text-white border-red-500/50'
                          : ev.status === 'Selling Fast'
                          ? 'bg-gradient-to-r from-red-500/90 to-pink-500/90 text-white shadow-red-500/30'
                          : ev.status === 'Limited'
                            ? 'bg-gradient-to-r from-yellow-400/90 to-orange-500/90 text-black shadow-yellow-500/30'
                            : 'bg-gradient-to-r from-green-400/90 to-emerald-500/90 text-white shadow-green-500/30'
                        }`}>
                        {ev.status?.toLowerCase().replace(/\s+/g, '') === 'soldout' ? 'Sold Out' : ev.status}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 bg-gradient-to-br from-background/90 to-background/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/30 shadow-lg">
                      <span className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                        {ev.price?.replace('$', '₹')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-t from-background/98 to-background/95 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold font-heading mb-3 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent leading-tight">
                        {ev.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="col-span-2 bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 mr-2 text-accent" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Event Date</span>
                        </div>
                        <span className="text-base font-bold text-foreground">{ev.date}</span>
                      </div>
                      <div className="bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 mr-2 text-accent" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Time</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{ev.time}</span>
                      </div>
                      <div className="bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 mr-2 text-accent" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Location</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{ev.location}</span>
                      </div>
                      <div className="col-span-2 bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 mr-2 text-accent" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Venue</span>
                        </div>
                        <span className="text-base font-bold text-foreground">{ev.venue}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Button
                        variant="ticket"
                        size="lg"
                        className="group relative w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-accent transition-all duration-500 shadow-lg hover:shadow-primary/30 border border-white/20 overflow-hidden"
                        onClick={() => router.push(`/events/${ev.id}`)}
                      >
                        <span className="relative z-10">View Details</span>
                        <div className="pointer-events-none absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </Button>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecommendedEvents;
