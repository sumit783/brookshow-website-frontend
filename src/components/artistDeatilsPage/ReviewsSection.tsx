import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { API_BASE_URI } from "@/api/client";
import { type ArtistReview } from "@/api/artists";

interface ReviewsSectionProps {
  artistName: string;
  reviews: ArtistReview[];
  isLoading: boolean;
}

export const ReviewsSection = ({ artistName, reviews, isLoading }: ReviewsSectionProps) => {
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    if (imagePath.startsWith('/')) return `${API_BASE_URI}${imagePath}`;
    return `${API_BASE_URI}/${imagePath}`;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-accent/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Artist Reviews
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            See what clients are saying about {artistName}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-background/50 border-white/5 h-48" />
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review: ArtistReview) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1 h-full">
                    <Card className="bg-background/50 backdrop-blur-xl border-white/10 hover-neon transition-all duration-300 h-full">
                      <CardContent className="pt-6 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-12 w-12 border border-white/10">
                            <AvatarImage src={getImageUrl(review.clientImage)} alt={review.clientName} />
                            <AvatarFallback>{review.clientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-white">{review.clientName}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`}
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-2">
                                {format(new Date(review.date), 'MMM dd, yyyy')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground italic leading-relaxed">
                          "{review.message}"
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews yet for this artist.</p>
          </div>
        )}
      </div>
    </section>
  );
};
