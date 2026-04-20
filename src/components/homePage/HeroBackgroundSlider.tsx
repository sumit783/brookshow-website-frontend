import { useState, useEffect } from "react";
import { ModernSlider } from "@/components/homePage/ModernSlider";
import { LazyImage } from "@/components/ui/LazyImage";
import { HeroImage, listHeroImages } from "@/api/hero";

// Local fallbacks in case API is empty or loading
import djCard from "@/assets/pexels-alex-andrews-271121-1983046.jpg";
import artistCard from "@/assets/pexels-marc-schulte-656598-2952834.jpg";
import eventCard from "@/assets/pexels-teddy-2263436.jpg";
import bandCard from "@/assets/pexels-wendywei-1190298.jpg";

const fallbacks = [
  { _id: 'f1', title: "DJ Performance", desktopUrl: djCard, tabletUrl: djCard, mobileUrl: djCard },
  { _id: 'f2', title: "Artist Studio", desktopUrl: artistCard, tabletUrl: artistCard, mobileUrl: artistCard },
  { _id: 'f3', title: "Event Planning", desktopUrl: eventCard, tabletUrl: eventCard, mobileUrl: eventCard },
  { _id: 'f4', title: "Live Band", desktopUrl: bandCard, tabletUrl: bandCard, mobileUrl: bandCard },
];

export const HeroBackgroundSlider = ({ onLoaded }: { onLoaded?: () => void }) => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Determine initial device type
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Fetch dynamic hero images
    const fetchImages = async () => {
      try {
        const fetched = await listHeroImages();
        if (fetched && fetched.length > 0) {
          setImages(fetched);
        }
      } catch (error) {
        console.error("Failed to fetch hero images:", error);
      } finally {
        setIsLoading(false);
        // Signal that hero is ready after API response
        // buffer for cursive animation to at least start/look good
        setTimeout(() => {
          onLoaded?.();
        }, 1500);
      }
    };

    fetchImages();

    return () => window.removeEventListener('resize', handleResize);
  }, [onLoaded]);

  // Use ONLY API images as requested. 
  // We keep fallbacks only as a structural safety if images are empty.
  const displayImages = images.length > 0 ? images : [];

  const slideElements = displayImages.map((bg) => {
    // Select URL based on device type
    let imageUrl = bg.desktopUrl;
    if (deviceType === 'mobile' && bg.mobileUrl) imageUrl = bg.mobileUrl;
    else if (deviceType === 'tablet' && bg.tabletUrl) imageUrl = bg.tabletUrl;

    return (
      <div key={bg._id} className="relative w-full h-full">
        <LazyImage
          src={imageUrl}
          alt={bg.title}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>
    );
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black/20">
      {displayImages.length > 0 && (
        <ModernSlider
          slidesPerView={1}
          spaceBetween={0}
          autoplay={true}
          navigation={false}
          pagination={true}
          effect="slide"
          loop={true}
          speed={1000}
          className="w-full h-full"
          pauseOnHover={false}
        >
          {slideElements}
        </ModernSlider>
      )}
    </div>
  );
};