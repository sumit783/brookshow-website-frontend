import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import React from "react";

type EventItem = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: string;
  image: string;
  status: "Selling Fast" | "Available" | "Limited";
  attendance: string;
  category: string;
};

type EventCardProps = {
  event: EventItem;
  index?: number;
  onViewDetails: (id: number) => void;
};

export const EventCard: React.FC<EventCardProps> = ({ event, index = 0, onViewDetails }) => {
  return (
    <div
      className="group relative fade-in-scale h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary to-secondary rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"></div>

      <Card className="relative glass-ultra overflow-hidden border border-white/20 group-hover:border-accent/40 shadow-xl group-hover:shadow-glow transition-all duration-700 transform group-hover:scale-[1.02] rounded-[1.4rem] h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 filter group-hover:brightness-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

          <div className="absolute top-4 left-4">
            <Badge
              className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-white/30 backdrop-blur-xl ${
                event.status === "Selling Fast"
                  ? "bg-gradient-to-r from-red-500/90 to-pink-500/90 text-white"
                  : event.status === "Limited"
                  ? "bg-gradient-to-r from-yellow-400/90 to-orange-500/90 text-black"
                  : "bg-gradient-to-r from-green-400/90 to-emerald-500/90 text-white"
              }`}
            >
              {event.status}
            </Badge>
          </div>

          <div className="absolute top-4 right-4">
            <Badge className="px-4 py-2 rounded-xl text-xs font-bold bg-background/90 backdrop-blur-xl border border-white/30">
              {event.category}
            </Badge>
          </div>

          <div className="absolute bottom-4 right-4 bg-gradient-to-br from-accent to-primary rounded-2xl px-5 py-3 border border-white/30 shadow-lg backdrop-blur-xl">
            <span className="text-2xl font-bold text-white drop-shadow-glow">{event.price}</span>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-b from-background/95 to-background/98 flex flex-col flex-1">
          <h3 className="text-2xl font-bold font-heading mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent leading-tight group-hover:scale-105 transition-transform">
            {event.title}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 glass rounded-xl border border-white/10 hover:border-accent/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <span className="text-foreground font-medium">{event.date}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 glass rounded-xl border border-white/10 hover:border-accent/30 transition-all">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">{event.time}</span>
              </div>
              <div className="flex items-center gap-2 p-3 glass rounded-xl border border-white/10 hover:border-accent/30 transition-all">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">{event.attendance}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 glass rounded-xl border border-white/10 hover:border-accent/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium text-sm">{event.venue}</p>
                <p className="text-muted-foreground text-xs">{event.city}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <Button
              onClick={() => onViewDetails(event.id)}
              className="w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-accent transition-all duration-500 shadow-lg hover:shadow-glow transform hover:scale-[1.02] border border-white/20 relative overflow-hidden group"
            >
              <span className="relative z-10">View Details</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
      </Card>
    </div>
  );
};

export default EventCard;


