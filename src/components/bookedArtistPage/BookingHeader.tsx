import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BookingHeaderProps {
  status: string;
  onBack: () => void;
}

export const BookingHeader = ({ status, onBack }: BookingHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      <Badge className={getStatusColor(status)} variant="outline">
        {status.toUpperCase()}
      </Badge>
    </div>
  );
};
