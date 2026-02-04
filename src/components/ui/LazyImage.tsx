import { useState, ImgHTMLAttributes } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  skeletonClassName?: string;
}

export const LazyImage = ({
  src,
  alt,
  fallbackSrc = "https://via.placeholder.com/400x300?text=Image",
  className = "",
  skeletonClassName = "",
  onError,
  ...props
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(e);
    } else {
      // Set fallback image
      (e.target as HTMLImageElement).src = fallbackSrc;
    }
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <Skeleton className={`absolute inset-0 ${skeletonClassName}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};
