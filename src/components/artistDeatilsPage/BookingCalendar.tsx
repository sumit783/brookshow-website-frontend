import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";

interface BookingCalendarProps {
  artistName: string;
}

export const BookingCalendar = ({ artistName }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Mock available time slots
  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "19:00", "20:00"
  ];

  // Mock booked dates (you would fetch this from your backend)
  const bookedDates = [
    new Date(2024, 11, 15),
    new Date(2024, 11, 20),
    new Date(2024, 11, 25)
  ];

  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      // Handle booking logic here
      console.log('Booking:', { date: selectedDate, time: selectedTime, artist: artistName });
      alert(`Booking request sent for ${selectedDate.toDateString()} at ${selectedTime}`);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
          Book {artistName}
        </CardTitle>
        <p className="text-muted-foreground">Select a date and time for your event</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => 
              date < new Date() || isDateBooked(date)
            }
            className="rounded-md border border-white/10 pointer-events-auto bg-background/50"
          />
        </div>

        {/* Date Info */}
        {selectedDate && (
          <div className="text-center p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="font-semibold">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
              Available
            </Badge>
          </div>
        )}

        {/* Time Slots */}
        {selectedDate && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Available Time Slots
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className={selectedTime === time 
                    ? "bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary" 
                    : "hover:bg-accent/20"
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Summary (date + time) */}
        {selectedDate && selectedTime && (
          <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-accent/30">
            <div className="font-semibold mb-1">Selected</div>
            <div className="text-lg">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} 
              at {selectedTime}
            </div>
          </div>
        )}

        {/* Booking Button */}
        {selectedDate && selectedTime && (
          <Button 
            onClick={handleBooking}
            className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500"
          >
            Confirm Booking
          </Button>
        )}

        {/* Legend */}
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span>Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};