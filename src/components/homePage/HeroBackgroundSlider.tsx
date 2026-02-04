import { ModernSlider } from "@/components/homePage/ModernSlider";
import { LazyImage } from "@/components/ui/LazyImage";
import djCard from "@/assets/dj-card.jpg";
import artistCard from "@/assets/artist-card.jpg";
import eventCard from "@/assets/event-card.jpg";
import bandCard from "@/assets/band-card.jpg";

const backgroundImages = [
  { id: 1, image: djCard, title: "DJ Performance" },
  { id: 2, image: artistCard, title: "Artist Studio" },
  { id: 3, image: eventCard, title: "Event Planning" },
  { id: 4, image: bandCard, title: "Live Band" },
];

export const HeroBackgroundSlider = () => {
  const slideElements = backgroundImages.map((bg) => (
    <div key={bg.id} className="relative w-full h-full">
      <LazyImage
        src={bg.image}
        alt={bg.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
    </div>
  ));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
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
      >
        {slideElements}
      </ModernSlider>
    </div>
  );
};