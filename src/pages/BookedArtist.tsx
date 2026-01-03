import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArtistProfile } from "@/api/artists";
import { API_BASE_URI } from "@/api/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, MapPin, Star } from "lucide-react";

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookedArtist", id],
    queryFn: () => fetchArtistProfile(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data || !data.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-xl font-semibold">Failed to load artist</p>
          <Button onClick={() => navigate("/profile")}>Back to Profile</Button>
        </div>
      </div>
    );
  }

  const artist = data;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{artist.rating.toFixed(1)}</span>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-1 bg-muted/40">
              <img
                src={getImageUrl(artist.image) || "https://via.placeholder.com/400x400?text=Artist"}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">{artist.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{artist.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {artist.location}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">{artist.bio}</div>
                <Separator />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="text-lg font-semibold">₹{artist.price.toLocaleString("en-IN")}</span>
                  <Badge variant="outline">{artist.stats.experience}</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {artist.specialties.map((spec) => (
                      <Badge key={spec} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Events handled: <span className="font-semibold">{artist.stats.events}</span>
                </div>
                {(startDateParam || endDateParam) && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    {startDateParam && (
                      <div>Start: {new Date(startDateParam).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div>
                    )}
                    {endDateParam && (
                      <div>End: {new Date(endDateParam).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div>
                    )}
                  </div>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookedArtist;

