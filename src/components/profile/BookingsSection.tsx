import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { BookingSummary } from "@/api/user";

interface BookingsSectionProps {
  bookings: BookingSummary[];
}

export const BookingsSection = ({ bookings }: BookingsSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Calendar className="h-5 w-5" /> My Artist Bookings
      </h2>
      {bookings.length === 0 ? (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground font-medium">No bookings yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {bookings.map((booking: BookingSummary) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{booking.artist?.name || "Unknown Artist"}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] h-5">
                    {booking.service}
                  </Badge>
                  <Badge variant={booking.status === "confirmed" ? "secondary" : "outline"} className="text-[10px] h-5">
                    {booking.status}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(booking.date), "PPP p")}
                </div>
                <div className="flex flex-wrap gap-1">
                  {booking.artist?.category?.map((cat) => (
                    <Badge key={cat} variant="outline" className="text-[10px] h-5">
                      {cat}
                    </Badge>
                  ))}
                </div>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const start = booking.startDate || booking.date;
                      const end = booking.endDate || booking.date;
                      if (booking.id) {
                        navigate(`/bookings/${booking.id}?startDate=${encodeURIComponent(start)}&endDate=${encodeURIComponent(end)}`);
                      }
                    }}
                  >
                    View details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
