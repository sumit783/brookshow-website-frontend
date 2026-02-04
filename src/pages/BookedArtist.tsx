import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchBookingById, type UserBooking, submitArtistReview, updateBookingStatus } from "@/api/artists";
import { API_BASE_URI } from "@/api/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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
import { Loader2, MapPin, Star, Calendar, Clock, CreditCard, Tag, Send, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

const BookedArtist = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bookedArtist", id],
    queryFn: () => fetchBookingById(id!),
    enabled: !!id,
  });

  const reviewMutation = useMutation({
    mutationFn: (data: { artistId: string; rating: number; message: string }) =>
      submitArtistReview(data),
    onSuccess: (resp) => {
      if (resp.success) {
        toast.success("Review submitted successfully!");
        setRating(0);
        setComment("");
        refetch();
      } else {
        toast.error(resp.message || "Failed to submit review");
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  });

  const cancelMutation = useMutation({
    mutationFn: (bookingId: string) => updateBookingStatus(bookingId, "cancelled"),
    onSuccess: (resp) => {
      if (resp.success) {
        toast.success("Booking cancelled successfully.");
        refetch();
      } else {
        toast.error(resp.message || "Failed to cancel booking.");
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "An error occurred while cancelling.");
    }
  });

  const booking = data?.booking;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data || !data.success || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-xl font-semibold">{!booking ? "Booking not found" : "Failed to load booking details"}</p>
          <Button onClick={() => navigate("/profile")}>Back to Profile</Button>
        </div>
      </div>
    );
  }

  const artist = booking.artistId;
  const service = booking.serviceId;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleReviewSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("Please write at least 10 characters");
      return;
    }

    reviewMutation.mutate({
      artistId: artist._id,
      rating,
      message: comment
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Badge className={getStatusColor(booking.status)} variant="outline">
            {booking.status.toUpperCase()}
          </Badge>
        </div>

        <Card className="overflow-hidden border-white/10 bg-card/50 backdrop-blur-sm">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-1 bg-muted/40 aspect-square md:aspect-auto">
              <img
                src={getImageUrl(artist.profileImage) || "https://via.placeholder.com/400x400?text=Artist"}
                alt={artist.userId.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl font-bold">{artist.userId.displayName}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {artist.category.map(cat => (
                        <Badge key={cat} variant="secondary">{cat}</Badge>
                      ))}
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold">{(artist.rating || 0).toFixed(1)}</span>
                  </div> */}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Booking Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="font-medium">{service.category} service</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{new Date(booking.startAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })} - {new Date(booking.endAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{new Date(booking.startAt).toLocaleTimeString('en-IN', { timeStyle: 'short' })} onwards</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{artist.location.city}, {artist.location.state}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Payment Information</h4>
                    <div className="space-y-2 bg-accent/5 p-3 rounded-lg border border-white/5">
                      <div className="flex justify-between text-sm">
                        <span>Total Amount:</span>
                        <span className="font-bold">₹{booking.totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Paid Amount:</span>
                        <span className="text-green-500 font-bold">₹{booking.paidAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Due Amount:</span>
                        <span className="text-destructive font-bold">₹{(booking.totalPrice - booking.paidAmount).toLocaleString('en-IN')}</span>
                      </div>
                      <Separator className="my-2 bg-white/10" />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CreditCard className="h-3 w-3" />
                        <span>Payment Status: <Badge variant="outline" className="ml-1 text-[10px] h-4 uppercase">{booking.paymentStatus}</Badge></span>
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
                  <Button className="flex-1 bg-gradient-to-r from-primary to-accent">Contact Artist</Button>
                  <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5">Download Invoice</Button>
                  
                  {booking.status !== 'cancelled' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex-1 gap-2 shadow-glow-destructive hover:shadow-neon-destructive transition-all">
                          <XCircle className="w-4 h-4" />
                          Cancel Booking
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-background/95 backdrop-blur-xl border-white/10">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently cancel your booking with {artist.userId.displayName}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-white/5 border-white/10">Keep Booking</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => cancelMutation.mutate(booking._id)}
                            className="bg-destructive hover:bg-destructive/90"
                            disabled={cancelMutation.isPending}
                          >
                            {cancelMutation.isPending ? "Cancelling..." : "Yes, Cancel Booking"}
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

        {/* Rating & Review Section */}
        {booking.status === 'confirmed' && (
          <Card className="border-white/10 bg-card/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                 Rate your experience
              </CardTitle>
              <CardDescription>
                Share your feedback to help other users and improve the booking experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="transition-transform hover:scale-110 active:scale-90 p-1"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star 
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoveredRating || rating) 
                            ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" 
                            : "text-muted-foreground"
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {rating > 0 ? `You selected ${rating} stars` : "Click to select a rating"}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Your Review</label>
                <Textarea 
                  placeholder="Tell us about the performance, punctuality, and overall experience..."
                  className="min-h-32 bg-background/50 border-white/5 focus:border-accent/30 transition-all resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground text-right border-t border-white/5 pt-1">
                  At least 10 characters required
                </p>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent py-6 text-lg font-bold shadow-glow hover:shadow-neon transition-all"
                onClick={handleReviewSubmit}
                disabled={reviewMutation.isPending}
              >
                {reviewMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Send className="h-5 w-5 mr-2" />
                )}
                Submit Review
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookedArtist;

