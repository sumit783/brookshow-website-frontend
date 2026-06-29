import { useState, useRef, ImgHTMLAttributes,useEffect } from "react";
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
  fallbackSrc,
  className = "",
  skeletonClassName = "",
  onError,
  ...props
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const hasFallback = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(e);
    } else if (fallbackSrc && !hasFallback.current) {
      // Only apply fallback once — prevents infinite loop if fallback also fails
      hasFallback.current = true;
      (e.target as HTMLImageElement).src = fallbackSrc;
    }
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <Skeleton className={`absolute inset-0 ${skeletonClassName}`} />
      )}
      <img
        ref={imgRef}
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
