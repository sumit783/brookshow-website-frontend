import React, { useEffect, useState } from "react";

interface IntroLoaderProps {
  isLoading: boolean;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 800); // Matches the fade-out duration
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#070708] transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isFadingOut ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Cursive Writing SVG */}
        <svg
          viewBox="0 0 600 150"
          className="w-[300px] sm:w-[500px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="cursive-path"
            d="M50,100 C70,40 100,40 120,100 C130,130 140,130 150,100 M150,100 C160,70 180,70 190,100 M190,100 C200,130 210,130 220,100 M220,100 C230,70 250,70 260,100 M260,100 C270,130 280,130 290,100 M290,100 C300,70 320,70 330,100 M330,100 C340,130 350,130 360,100 M360,100 C370,70 390,70 400,100 M400,100 C410,130 420,130 430,100 M430,100 C440,70 460,70 470,100 M470,100 C480,130 490,130 500,100"
            className="cursive-draw"
            stroke="url(#gradient-text)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* We'll use a better path for the actual BrookShow text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="cursive-text text-5xl sm:text-7xl"
            fill="none"
            stroke="url(#gradient-text)"
            strokeWidth="1.5"
            style={{ fontFamily: "'Dancing Script', cursive", filter: "drop-shadow(0 0 8px rgba(179, 12, 93, 0.5))" }}
          >
            BrookShow
          </text>

          <defs>
            <linearGradient id="gradient-text" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtitle */}
        <div className={`mt-8 text-white/40 text-xs sm:text-sm tracking-[0.3em] uppercase transition-all duration-1000 delay-500 font-medium ${isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          Empowering Talents
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

        .cursive-text {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-text 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
        }

        @keyframes draw-text {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
            fill: url(#gradient-text);
            fill-opacity: 0.1;
          }
        }

        .cursive-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-line 3s ease-in-out forwards;
          opacity: 0.3;
        }

        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};
