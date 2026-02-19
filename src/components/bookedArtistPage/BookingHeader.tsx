import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BookingHeaderProps {
  status: string;
  onBack: () => void;
}

export const BookingHeader = ({ status, onBack }: BookingHeaderProps) => {


  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      
    </div>
  );
};
