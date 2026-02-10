import { type ArtistReview } from "@/api/artists";
import { API_BASE_URI } from "@/api/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { format } from "date-fns";

interface ReviewsListProps {
  reviews: ArtistReview[];
  totalReviews: number;
  isLoading: boolean;
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

export const ReviewsList = ({
  reviews,
  totalReviews,
  isLoading,
}: ReviewsListProps) => {
  return (
    <div className="pt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Artist Reviews</h3>
        {totalReviews > 0 && (
          <Badge variant="outline" className="bg-accent/5">
            {totalReviews} total
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <Card
              key={i}
              className="animate-pulse bg-card/30 border-white/5 h-40"
            />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review: ArtistReview) => (
            <Card
              key={review.id}
              className="bg-card/30 border-white/10 hover:border-accent/20 transition-all"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage
                      src={getImageUrl(review.clientImage)}
                      alt={review.clientName}
                    />
                    <AvatarFallback>
                      {review.clientName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{review.clientName}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {format(new Date(review.date), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic line-clamp-3">
                  "{review.message}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card/20 border-dashed border-white/10 p-8 text-center">
          <p className="text-muted-foreground">No reviews yet for this artist.</p>
        </Card>
      )}
    </div>
  );
};
