import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchBookingById,
  submitArtistReview,
  updateBookingStatus,
  fetchArtistReviews,
  payAdvance,
  verifyArtistBookingPayment,
} from "@/api/artists";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BookingHeader } from "@/components/bookedArtistPage/BookingHeader";
import { ArtistInfoCard } from "@/components/bookedArtistPage/ArtistInfoCard";
import { RatingReviewForm } from "@/components/bookedArtistPage/RatingReviewForm";
import { ReviewsList } from "@/components/bookedArtistPage/ReviewsList";
import { type BookArtistResponse } from "@/api/artists";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
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

  const artistId = data?.booking?.artistId?._id;

  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["artistReviews", artistId],
    queryFn: () => fetchArtistReviews(artistId!),
    enabled: !!artistId,
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
        refetchReviews();
      } else {
        toast.error(resp.message || "Failed to submit review");
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
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
      toast.error(
        err.response?.data?.message || "An error occurred while cancelling."
      );
    },
  });

  const payMutation = useMutation({
    mutationFn: (bookingId: string) => payAdvance(bookingId),
    onSuccess: async (resp: BookArtistResponse) => {
      if (resp.success && resp.booking && resp.razorpayOrder) {
        const res = await loadRazorpayScript();
        if (!res) {
          toast.error("Razorpay SDK failed to load.");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: resp.razorpayOrder.amount,
          currency: resp.razorpayOrder.currency,
          name: "BrookShow",
          description: `Advance Payment for booking`,
          order_id: resp.razorpayOrder.id,
          handler: async (response: any) => {
            try {
              const verifyRes = await verifyArtistBookingPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.success) {
                toast.success("Payment successful! Booking confirmed.");
                refetch();
              } else {
                toast.error(verifyRes.message || "Payment verification failed.");
              }
            } catch (err: any) {
              toast.error(err.response?.data?.message || "Payment verification failed.");
            }
          },
          theme: {
            color: "#6366f1",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        toast.error(resp.message || "Failed to initiate payment.");
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "An error occurred.");
    },
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
          <p className="text-xl font-semibold">
            {!booking ? "Booking not found" : "Failed to load booking details"}
          </p>
          <Button onClick={() => navigate("/profile")}>Back to Profile</Button>
        </div>
      </div>
    );
  }

  const artist = booking.artistId;

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
      message: comment,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <BookingHeader status={booking.status} onBack={() => navigate(-1)} />

        <ArtistInfoCard
          booking={booking}
          onCancel={(id) => cancelMutation.mutate(id)}
          isCancelling={cancelMutation.isPending}
          onPayNow={(id) => payMutation.mutate(id)}
          isPaying={payMutation.isPending}
        />
        <ReviewsList
          reviews={reviewsData?.reviews || []}
          totalReviews={reviewsData?.totalReviews || 0}
          isLoading={isLoadingReviews}
        />
        {booking.status === "confirmed" && (
          <RatingReviewForm
            rating={rating}
            hoveredRating={hoveredRating}
            comment={comment}
            isPending={reviewMutation.isPending}
            setRating={setRating}
            setHoveredRating={setHoveredRating}
            setComment={setComment}
            onSubmit={handleReviewSubmit}
          />
        )}

        
      </div>
    </div>
  );
};

export default BookedArtist;
