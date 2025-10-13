import { ModernSlider } from "@/components/homePage/ModernSlider";
import djCard from "@/assets/dj-card.jpg";
import artistCard from "@/assets/artist-card.jpg";
import eventCard from "@/assets/event-card.jpg";
import bandCard from "@/assets/band-card.jpg";

const cards = [
  { id: 1, image: djCard, title: "DJ Performance", category: "Electronic Music" },
  { id: 2, image: artistCard, title: "Artist Studio", category: "Creative Arts" },
  { id: 3, image: eventCard, title: "Event Planning", category: "Luxury Events" },
  { id: 4, image: bandCard, title: "Live Band", category: "Rock Performance" },
  { id: 5, image: djCard, title: "Festival DJ", category: "Festival Vibes" },
  { id: 6, image: artistCard, title: "Portrait Artist", category: "Fine Arts" },
];

export const FloatingCards = () => {
  const cardElements = cards.map((card) => (
    <div key={card.id} className="relative group">
      <div className="glass-modern rounded-2xl overflow-hidden shadow-strong hover-glow transition-smooth">
        <div className="relative">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-lg font-bold">{card.title}</h4>
            <p className="text-sm text-accent">{card.category}</p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="relative h-full flex items-center">
        <ModernSlider
          slidesPerView={4}
          spaceBetween={30}
          autoplay={true}
          navigation={false}
          pagination={false}
          className="w-full opacity-20"
        >
          {cardElements}
        </ModernSlider>
      </div>
    </div>
  );
};