import { Skeleton } from "@/components/ui/skeleton";

export const LiveTicketsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 items-stretch">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="relative glass-modern rounded-2xl overflow-hidden border border-white/10 h-full flex flex-col"
        >
          {/* Image Skeleton */}
          <div className="h-48 w-full relative">
            <Skeleton className="h-full w-full bg-muted/20" />
            {/* Badges */}
            <Skeleton className="absolute top-4 left-4 h-8 w-24 rounded-lg bg-muted/30" />
            <Skeleton className="absolute top-4 right-4 h-8 w-16 rounded-lg bg-muted/30" />
          </div>
          
          {/* Content Skeleton */}
          <div className="p-6 flex-1 flex flex-col bg-background/95">
            {/* Title */}
            <Skeleton className="h-8 w-3/4 mb-4 bg-muted/30" />
            
            {/* Details */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 mr-2 rounded-full bg-muted/30" />
                <Skeleton className="h-4 w-1/2 bg-muted/30" />
              </div>
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 mr-2 rounded-full bg-muted/30" />
                <Skeleton className="h-4 w-1/3 bg-muted/30" />
              </div>
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 mr-2 rounded-full bg-muted/30" />
                <Skeleton className="h-4 w-2/3 bg-muted/30" />
              </div>
            </div>
            
            {/* Button */}
            <div className="mt-auto">
              <Skeleton className="h-12 w-full rounded-lg bg-muted/20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
