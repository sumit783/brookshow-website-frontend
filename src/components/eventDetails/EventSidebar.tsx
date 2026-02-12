import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

interface EventSidebarProps {
  price: string;
  date: string;
  time: string;
  doors: string;
  location: string;
  onGetTickets: () => void;
}

export const EventSidebar = ({ price, date, time, doors, location, onGetTickets }: EventSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="glass-modern p-6 rounded-2xl sticky top-6">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground mb-2">Starting from</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            {price}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-muted/20 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-xs text-muted-foreground uppercase">Date</span>
            </div>
            <p className="font-bold text-foreground">{date}</p>
          </div>

          <div className="bg-muted/20 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-xs text-muted-foreground uppercase">Time</span>
            </div>
            <p className="font-bold text-foreground">{time}</p>
            <p className="text-sm text-muted-foreground">Entry: {doors}</p>
          </div>

          {/* <div className="bg-muted/20 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-xs text-muted-foreground uppercase">Attending</span>
            </div>
            <p className="font-bold text-foreground">{attendance}</p>
          </div> */}

          <div className="bg-muted/20 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-xs text-muted-foreground uppercase">Location</span>
            </div>
            <p className="font-bold text-foreground">{location}</p>
          </div>
        </div>

        <Button variant="ticket" size="lg" className="w-full" onClick={onGetTickets}>
          Get Tickets
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">18+ • Valid ID Required</p>
      </div>
    </div>
  );
};


