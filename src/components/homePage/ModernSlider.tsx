import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface SliderProps {
  children: React.ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  effect?: 'slide' | 'coverflow';
  loop?: boolean;
  speed?: number;
  className?: string;
}

export const ModernSlider = ({
  children,
  slidesPerView = 3,
  spaceBetween = 30,
  autoplay = true,
  navigation = true,
  pagination = true,
  effect = 'slide',
  loop = false,
  speed = 600,
  className = ''
}: SliderProps) => {
  const navigationId = `navigation-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        slidesPerView={1}
        spaceBetween={spaceBetween}
        loop={loop}
        speed={speed}
        autoplay={autoplay ? {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true
        } : false}
        navigation={navigation ? {
          prevEl: `.${navigationId}-prev`,
          nextEl: `.${navigationId}-next`,
        } : false}
        pagination={pagination ? {
          clickable: true,
          dynamicBullets: true,
          bulletClass: 'modern-bullet',
          bulletActiveClass: 'modern-bullet-active'
        } : false}
        effect={effect}
        coverflowEffect={effect === 'coverflow' ? {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        } : undefined}
        breakpoints={{
          640: {
            slidesPerView: Math.min(2, slidesPerView),
          },
          768: {
            slidesPerView: Math.min(3, slidesPerView),
          },
          1024: {
            slidesPerView: slidesPerView,
          },
        }}
        className="modern-swiper"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="slide-in-up">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {navigation && (
        <>
          <button
            className={`${navigationId}-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 glass-modern rounded-full p-3 hover-neon transition-smooth group`}
          >
            <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-accent" />
          </button>
          <button
            className={`${navigationId}-next absolute right-4 top-1/2 -translate-y-1/2 z-10 glass-modern rounded-full p-3 hover-neon transition-smooth group`}
          >
            <ChevronRight className="w-6 h-6 text-foreground group-hover:text-accent" />
          </button>
        </>
      )}

      <style>{`
        .modern-swiper .swiper-pagination {
          bottom: -50px !important;
        }
        .modern-swiper .modern-bullet {
          width: 12px;
          height: 12px;
          margin: 0 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          opacity: 0.7;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .modern-swiper .modern-bullet-active {
          background: linear-gradient(135deg, #b30c5d 0%, #4f0bb0 100%);
          opacity: 1;
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(179, 12, 93, 0.6);
        }
        .modern-swiper .swiper-slide {
          transition: transform 0.3s ease;
        }
        .modern-swiper .swiper-slide:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};