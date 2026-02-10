import { Star, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface RatingReviewFormProps {
  rating: number;
  hoveredRating: number;
  comment: string;
  isPending: boolean;
  setRating: (rating: number) => void;
  setHoveredRating: (rating: number) => void;
  setComment: (comment: string) => void;
  onSubmit: () => void;
}

export const RatingReviewForm = ({
  rating,
  hoveredRating,
  comment,
  isPending,
  setRating,
  setHoveredRating,
  setComment,
  onSubmit,
}: RatingReviewFormProps) => {
  return (
    <Card className="border-white/10 bg-card/30 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-accent" />
          Rate your experience
        </CardTitle>
        <CardDescription>
          Share your feedback to help other users and improve the booking
          experience.
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
            {rating > 0
              ? `You selected ${rating} stars`
              : "Click to select a rating"}
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
          onClick={onSubmit}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Send className="h-5 w-5 mr-2" />
          )}
          Submit Review
        </Button>
      </CardContent>
    </Card>
  );
};
