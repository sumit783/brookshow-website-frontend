import { Badge } from "@/components/ui/badge";

interface SpecialtiesProps {
  specialties: string[];
}

export const Specialties = ({ specialties }: SpecialtiesProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-accent">Specialties</h3>
      <div className="flex flex-wrap gap-3">
        {specialties.map((specialty, idx) => (
          <Badge
            key={idx}
            variant="outline"
            className="px-4 py-2 bg-gradient-to-r from-primary/80 to-accent/80 text-white border-white/20 text-sm font-semibold"
          >
            {specialty}
          </Badge>
        ))}
      </div>
    </div>
  );
};


