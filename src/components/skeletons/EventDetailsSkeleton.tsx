import { Skeleton } from "@/components/ui/skeleton";

export const EventDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-dark pt-20">
      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full bg-muted/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 container mx-auto max-w-7xl h-full flex items-end pb-16">
          <div className="w-full">
            <Skeleton className="h-8 w-32 mb-4 bg-muted/30" /> {/* Back Button */}
            <Skeleton className="h-12 w-3/4 mb-4 bg-muted/30" /> {/* Title */}
            <Skeleton className="h-6 w-1/2 mb-2 bg-muted/20" /> {/* Artist */}
            <Skeleton className="h-6 w-1/4 bg-muted/20" /> {/* Status */}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-8 w-1/3 bg-muted/30" /> {/* Description Title */}
            <Skeleton className="h-24 w-full bg-muted/20" /> {/* Description */}
            <Skeleton className="h-6 w-1/4 bg-muted/30" /> {/* Lineup Title */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full bg-muted/20" />
              <Skeleton className="h-10 w-full bg-muted/20" />
              <Skeleton className="h-10 w-full bg-muted/20" />
              <Skeleton className="h-10 w-full bg-muted/20" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-48 w-full bg-muted/20 rounded-lg" /> {/* Card */}
            <Skeleton className="h-12 w-full bg-muted/30 rounded-lg" /> {/* Button */}
          </div>
        </div>
      </div>

      {/* Recommended Events Skeleton */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <Skeleton className="h-10 w-1/3 mb-8 bg-muted/30" /> {/* Recommended Events Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full bg-muted/20 rounded-lg" />
            <Skeleton className="h-64 w-full bg-muted/20 rounded-lg" />
            <Skeleton className="h-64 w-full bg-muted/20 rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
};
