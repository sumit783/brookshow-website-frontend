import { useState, useEffect } from "react";
import { ModernSlider } from "@/components/homePage/ModernSlider";
import { LazyImage } from "@/components/ui/LazyImage";
import { HeroImage, listHeroImages } from "@/api/hero";

// Local Hero Assets (Responsive)
import desktop1 from "@/assets/desktop1.png";
import desktop2 from "@/assets/desktop2.png";
import tablet1 from "@/assets/tablet1.png";
import tablet2 from "@/assets/tablet2.png";
import phone1 from "@/assets/phone1.png";
import phone2 from "@/assets/phone2.png";

const localHeroes = [
  { _id: 'l1', title: "BrookShow Elite", desktopUrl: desktop1, tabletUrl: tablet1, mobileUrl: phone1 },
  { _id: 'l2', title: "BrookShow Premium", desktopUrl: desktop2, tabletUrl: tablet2, mobileUrl: phone2 },
];

export const HeroBackgroundSlider = () => {
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

    // Fetch dynamic hero images independently
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
      }
    };

    fetchImages();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Combine local responsive images with API images
  const displayImages = [...localHeroes, ...images];

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