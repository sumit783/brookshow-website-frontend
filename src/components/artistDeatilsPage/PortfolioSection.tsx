import { MasonryGrid } from "@/components/artistDeatilsPage/MasonryGrid";
import { API_BASE_URI } from "@/api/client";

interface PortfolioSectionProps {
  artistName: string;
  images: string[];
  videos: string[];
}

export const PortfolioSection = ({ artistName, images, videos }: PortfolioSectionProps) => {
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    if (imagePath.startsWith('/')) return `${API_BASE_URI}${imagePath}`;
    return `${API_BASE_URI}/${imagePath}`;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            Explore {artistName}'s work and performances
          </p>
        </div>
        
        {images.length > 0 || videos.length > 0 ? (
          <MasonryGrid 
            images={images.map(img => getImageUrl(img))}
            videos={videos.map(vid => getImageUrl(vid))}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No portfolio items available yet</p>
          </div>
        )}
      </div>
    </section>
  );
};
