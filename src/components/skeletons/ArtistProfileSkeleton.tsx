import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const ArtistProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Hero Section Skeleton */}
        <section className="relative py-16 md:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="relative z-10 container mx-auto max-w-7xl">
            {/* Back Button Skeleton */}
            <Skeleton className="h-10 w-32 mb-8 rounded-md bg-muted/20" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Artist Info Skeleton */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-2xl border border-white/10">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Profile Image */}
                      <Skeleton className="w-32 h-32 rounded-full bg-muted/30" />
                      
                      <div className="flex-1 space-y-4 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div>
                            <Skeleton className="h-8 w-48 mb-2 bg-muted/30" />
                            <Skeleton className="h-6 w-32 bg-muted/20" />
                          </div>
                          <Skeleton className="h-10 w-24 rounded-full bg-muted/20" />
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <Skeleton className="h-5 w-24 bg-muted/20" />
                          <Skeleton className="h-5 w-32 bg-muted/20" />
                        </div>
                        
                        <div className="flex gap-8 pt-2">
                          <div>
                            <Skeleton className="h-6 w-8 mb-1 bg-muted/30" />
                            <Skeleton className="h-4 w-16 bg-muted/20" />
                          </div>
                          <div>
                            <Skeleton className="h-6 w-16 mb-1 bg-muted/30" />
                            <Skeleton className="h-4 w-20 bg-muted/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* About Section */}
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32 mb-2 bg-muted/30" />
                      <Skeleton className="h-4 w-full bg-muted/20" />
                      <Skeleton className="h-4 w-full bg-muted/20" />
                      <Skeleton className="h-4 w-3/4 bg-muted/20" />
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    {/* Specialties */}
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32 mb-2 bg-muted/30" />
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-8 w-24 rounded-full bg-muted/20" />
                        <Skeleton className="h-8 w-32 rounded-full bg-muted/20" />
                        <Skeleton className="h-8 w-20 rounded-full bg-muted/20" />
                      </div>
                    </div>
                    
                    <Separator className="bg-white/10" />
                  </CardContent>
                </Card>
              </div>

              {/* Booking Calendar Skeleton */}
              <div>
                <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-2xl border border-white/10 h-[500px]">
                  <CardHeader>
                    <Skeleton className="h-6 w-40 bg-muted/30" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-full w-full rounded-md bg-muted/10" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section Skeleton */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-48 mx-auto mb-4 bg-muted/30" />
              <Skeleton className="h-6 w-96 mx-auto bg-muted/20" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-64 w-full rounded-lg bg-muted/20" />
              <Skeleton className="h-80 w-full rounded-lg bg-muted/20" />
              <Skeleton className="h-64 w-full rounded-lg bg-muted/20" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
