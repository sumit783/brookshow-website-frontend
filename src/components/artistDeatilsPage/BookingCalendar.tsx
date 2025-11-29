import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchArtistServices, type ArtistService, checkArtistAvailability } from "@/api/artists";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingCalendarProps {
  artistName: string;
  price?: number;
  artistId: string;
}

export const BookingCalendar = ({ artistName, price, artistId }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<ArtistService | undefined>(undefined);

  const { data: servicesData, isLoading: isLoadingServices, error: servicesError } = useQuery({
    queryKey: ['artistServices', artistId],
    queryFn: () => fetchArtistServices(artistId),
    enabled: !!artistId,
  });

  const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

  const { data: availabilityData, isLoading: isLoadingAvailability } = useQuery({
    queryKey: ['artistAvailability', artistId, selectedService?.id, formattedDate, selectedTime],
    queryFn: () => checkArtistAvailability(artistId, selectedService!.id, formattedDate, selectedTime),
    enabled: !!artistId && !!selectedService && !!selectedDate && !!selectedTime,
  });

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
    if (selectedDate && selectedTime && selectedService && availabilityData?.available) {
      // Handle booking logic here
      const totalAmount = selectedService.price_for_user;
      const advanceAmount = selectedService.advance;
      console.log('Booking:', { 
        date: selectedDate, 
        time: selectedTime, 
        artist: artistName, 
        service: selectedService,
        totalAmount: totalAmount,
        advanceAmount: advanceAmount,
      });
      alert(`Booking request sent for ${selectedService.category} on ${selectedDate.toDateString()} at ${selectedTime}. Total: ₹${totalAmount.toLocaleString('en-IN')}, Advance: ₹${advanceAmount.toLocaleString('en-IN')}`);
    } else if (!availabilityData?.available) {
      alert("Artist is not available for the selected time slot.");
    } else if (!selectedService) {
      alert("Please select a service.");
    }
  };

  return (
    <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
          Book {artistName}
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Select a date and time for your event</p>
          {/* {typeof price === 'number' && (
            <Badge variant="outline" className="bg-green-500/10 text-green-300 border-green-400/30">
              From ${price}
            </Badge>
          )} */}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Selection */}
        {isLoadingServices && <p>Loading services...</p>}
        {servicesError && <p className="text-destructive">Failed to load services.</p>}
        {servicesData?.success && servicesData.services.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Select a Service</h4>
            <Select onValueChange={(value) => {
              const service = servicesData.services.find(s => s.id === value);
              setSelectedService(service);
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {servicesData.services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.category} - ₹{service.price_for_user.toLocaleString('en-IN')}/{service.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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
            {typeof (selectedService?.price_for_user || price) === 'number' && (
              <div className="mt-2 text-sm text-foreground/80">
                Estimated price: <span className="font-semibold">₹{(selectedService?.price_for_user || price || 0).toLocaleString('en-IN')}</span>
                {selectedService && (
                  <div className="mt-1">
                    <p>Total Price: <span className="font-semibold">₹{selectedService.price_for_user.toLocaleString('en-IN')}</span></p>
                    <p>Advance Payment: <span className="font-semibold">₹{selectedService.advance.toLocaleString('en-IN')}</span></p>
                  </div>
                )}
              </div>
            )}

            {/* Availability Status */}
            {selectedService && selectedDate && selectedTime && (
              isLoadingAvailability ? (
                <p className="text-muted-foreground mt-2">Checking availability...</p>
              ) : availabilityData?.success ? (
                availabilityData.available ? (
                  <Badge className="mt-2 bg-green-500/10 text-green-300 border-green-400/30">Available</Badge>
                ) : (
                  <Badge className="mt-2 bg-red-500/10 text-red-300 border-red-400/30">Not Available</Badge>
                )
              ) : (
                <p className="text-destructive mt-2">Failed to check availability.</p>
              )
            )}
          </div>
        )}

        {/* Booking Button */}
        {selectedDate && selectedTime && selectedService && availabilityData?.available && (
          <Button 
            onClick={handleBooking}
            className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500"
          >
            Book Artist
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