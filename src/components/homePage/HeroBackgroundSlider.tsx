import { ModernSlider } from "@/components/homePage/ModernSlider";
import { LazyImage } from "@/components/ui/LazyImage";
import djCard from "@/assets/pexels-alex-andrews-271121-1983046.jpg";
import artistCard from "@/assets/pexels-marc-schulte-656598-2952834.jpg";
import eventCard from "@/assets/pexels-teddy-2263436.jpg";
import bandCard from "@/assets/pexels-wendywei-1190298.jpg";

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