import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ArtistsFiltersProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedTalent: string;
  setSelectedTalent: (value: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
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
  dateRange,
  setDateRange,
  cities,
  talents,
}) => {
  return (
    <div className="glass-ultra rounded-2xl p-8 mb-16 max-w-6xl mx-auto shadow-strong border border-white/10 fade-in-scale">
      <h2 className="text-2xl font-bold font-heading mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Refine Your Search
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 text-white/50 group-focus-within:text-accent transform -translate-y-1/2 w-5 h-5 transition-smooth" />
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

        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "h-12 glass border-white/20 hover:border-accent transition-smooth justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-modern border-white/20" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ArtistsFilters;


