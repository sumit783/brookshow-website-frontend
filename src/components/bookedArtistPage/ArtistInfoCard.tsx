import { type UserBooking } from "@/api/artists";
import { API_BASE_URI } from "@/api/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MapPin, Calendar, Clock, CreditCard, Tag, XCircle } from "lucide-react";

interface ArtistInfoCardProps {
  booking: UserBooking;
  onCancel: (id: string) => void;
  isCancelling: boolean;
}

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  if (imagePath.startsWith("/")) {
    return `${API_BASE_URI}${imagePath}`;
  }
  return `${API_BASE_URI}/${imagePath}`;
};

export const ArtistInfoCard = ({
  booking,
  onCancel,
  isCancelling,
}: ArtistInfoCardProps) => {
  const artist = booking.artistId;
  const service = booking.serviceId;

  return (
    <Card className="overflow-hidden border-white/10 bg-card/50 backdrop-blur-sm">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-1 bg-muted/40 aspect-square md:aspect-auto">
          <img
            src={
              getImageUrl(artist.profileImage) ||
              "https://via.placeholder.com/400x400?text=Artist"
            }
            alt={artist.userId.displayName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold">
                  {artist.userId.displayName}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {artist.category.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Booking Details
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {service.category} service
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      {new Date(booking.startAt).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}{" "}
                      -{" "}
                      {new Date(booking.endAt).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>
                      {new Date(booking.startAt).toLocaleTimeString("en-IN", {
                        timeStyle: "short",
                      })}{" "}
                      onwards
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>
                      {artist.location.city}, {artist.location.state}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Payment Information
                </h4>
                <div className="space-y-2 bg-accent/5 p-3 rounded-lg border border-white/5">
                  <div className="flex justify-between text-sm">
                    <span>Total Amount:</span>
                    <span className="font-bold">
                      ₹{booking.totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Paid Amount:</span>
                    <span className="text-green-500 font-bold">
                      ₹{booking.paidAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Due Amount:</span>
                    <span className="text-destructive font-bold">
                      ₹
                      {(
                        booking.totalPrice - booking.paidAmount
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Separator className="my-2 bg-white/10" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="h-3 w-3" />
                    <span>
                      Payment Status:{" "}
                      <Badge
                        variant="outline"
                        className="ml-1 text-[10px] h-4 uppercase"
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-2">
              <p className="text-sm font-semibold">Artist Bio</p>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {artist.bio}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button className="flex-1 bg-gradient-to-r from-primary to-accent">
                Contact Artist
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-white/10 hover:bg-white/5"
              >
                Download Invoice
              </Button>

              {booking.status !== "cancelled" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex-1 gap-2 shadow-glow-destructive hover:shadow-neon-destructive transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel Booking
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background/95 backdrop-blur-xl border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        cancel your booking with {artist.userId.displayName}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white/5 border-white/10">
                        Keep Booking
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onCancel(booking._id)}
                        className="bg-destructive hover:bg-destructive/90"
                        disabled={isCancelling}
                      >
                        {isCancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
