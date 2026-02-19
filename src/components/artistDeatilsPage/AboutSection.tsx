import { useState } from "react";

interface AboutSectionProps {
  bio: string;
}

export const AboutSection = ({ bio }: AboutSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const WORD_LIMIT = 10;

  const words = bio.split(/\s+/);
  const isTooLong = words.length > WORD_LIMIT;
  const truncatedBio = words.slice(0, WORD_LIMIT).join(" ") + "...";

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-accent">About</h3>
      <div className="relative">
        {/* Desktop View: Always Full */}
        <p className="hidden md:block text-foreground/80 leading-relaxed text-lg">
          {bio}
        </p>

        {/* Mobile View: Truncatable */}
        <p className="md:hidden text-foreground/80 leading-relaxed text-lg transition-all duration-300">
          {isTooLong && !isExpanded ? truncatedBio : bio}
        </p>

        {isTooLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden mt-2 text-accent hover:text-primary font-semibold text-sm transition-colors duration-200 flex items-center gap-1 group"
          >
            {isExpanded ? "Read Less" : "Read More"}
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              {isExpanded ? "↑" : "→"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};


