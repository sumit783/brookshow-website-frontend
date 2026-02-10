import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket as TicketIcon, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { TicketSummary } from "@/api/user";

interface TicketsSectionProps {
  tickets: TicketSummary[];
}

export const TicketsSection = ({ tickets }: TicketsSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <TicketIcon className="h-5 w-5" /> My Tickets
      </h2>
      {tickets.length === 0 ? (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <TicketIcon className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground font-medium">No tickets purchased yet</p>
            <Link to="/events">
              <Button variant="link" className="mt-2">Browse Events</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tickets.map((ticket) => (
            <Link to={`/ticket/${ticket.id}`} key={ticket.id}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{ticket.event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(ticket.event.date), "PPP p")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div className="text-sm space-y-1">
                      <p className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {ticket.event.venue}
                      </p>
                      <p>
                        <span className="font-medium">{ticket.ticketType}</span> x {ticket.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{ticket.totalPrice}</p>
                      <Badge variant={ticket.isValid ? "secondary" : "destructive"} className="mt-1">
                        {ticket.isValid ? "Valid" : "Invalid"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
