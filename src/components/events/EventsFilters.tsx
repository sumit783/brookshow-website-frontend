import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";

type EventsFiltersProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  cities: string[];
  categories: string[];
};

export const EventsFilters: React.FC<EventsFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  cities,
  categories,
}) => {
  return (
    <div className="glass-ultra rounded-3xl p-8 mb-16 shadow-glow border border-white/10 slide-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent h-5 w-5 group-focus-within:scale-110 transition-transform" />
          <Input
            placeholder="Search events or venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 glass-modern border-white/20 focus:border-accent/50 transition-all text-lg rounded-xl"
          />
        </div>

        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="h-14 glass-modern border-white/20 hover:border-accent/50 transition-all text-lg rounded-xl">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent className="glass-ultra border-white/20">
            {cities.map((city) => (
              <SelectItem key={city} value={city} className="text-base">
                {city === "all" ? "All Cities" : city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-14 glass-modern border-white/20 hover:border-accent/50 transition-all text-lg rounded-xl">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="glass-ultra border-white/20">
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="text-base">
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EventsFilters;


