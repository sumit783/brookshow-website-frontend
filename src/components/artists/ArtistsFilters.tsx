import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

type ArtistsFiltersProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedTalent: string;
  setSelectedTalent: (value: string) => void;
  cities: string[];
  talents: string[];
};

export const ArtistsFilters: React.FC<ArtistsFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedTalent,
  setSelectedTalent,
  cities,
  talents,
}) => {
  return (
    <div className="glass-ultra rounded-2xl p-8 mb-16 max-w-5xl mx-auto shadow-strong border border-white/10 fade-in-scale">
      <h2 className="text-2xl font-bold font-heading mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Refine Your Search
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 text-white transform -translate-y-1/2 w-5 h-5" />
          <Input
            placeholder="Search artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 glass border-white/20 focus:border-accent transition-smooth"
          />
        </div>

        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="h-12 glass border-white/20 hover:border-accent transition-smooth">
            <SelectValue placeholder="Filter by city" />
          </SelectTrigger>
          <SelectContent className="glass-modern border-white/20">
            {cities.map((city) => (
              <SelectItem key={city} value={city} className="hover:bg-accent/20">
                {city === "all" ? "All Cities" : city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTalent} onValueChange={setSelectedTalent}>
          <SelectTrigger className="h-12 glass border-white/20 hover:border-accent transition-smooth">
            <SelectValue placeholder="Filter by talent" />
          </SelectTrigger>
          <SelectContent className="glass-modern border-white/20">
            {talents.map((talent) => (
              <SelectItem key={talent} value={talent} className="hover:bg-accent/20">
                {talent === "all" ? "All Talents" : talent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ArtistsFilters;


