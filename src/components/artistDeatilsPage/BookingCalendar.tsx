import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Calendar as CalendarIcon } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchArtistServices, type ArtistService, fetchBookingPrice, bookArtist, verifyArtistBookingPayment } from "@/api/artists";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";

interface BookingCalendarProps {
  artistName: string;
  price?: number;
  artistId: string;
  isDialogView?: boolean;
  onSuccess?: () => void;
}

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const BookingCalendar = ({ artistName, price, artistId, isDialogView, onSuccess }: BookingCalendarProps) => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<ArtistService | undefined>(undefined);
  const [eventName, setEventName] = useState<string>("");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const { data: servicesData, isLoading: isLoadingServices, error: servicesError } = useQuery({
    queryKey: ['artistServices', artistId],
    queryFn: () => fetchArtistServices(artistId),
    enabled: !!artistId,
  });

  // Format dates for API
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const startDate = dateRange?.from;
  const endDate = dateRange?.to || dateRange?.from; // If no end date, use start date

  const formattedStartDate = startDate ? formatDate(startDate) : '';
  const formattedEndDate = endDate ? formatDate(endDate) : '';

  // Time slots
  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "19:00", "20:00"
  ];

  // Mock booked dates
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

  // Build ISO strings for API
  const startDateIso = startDate && selectedTime
    ? new Date(`${formattedStartDate}T${selectedTime}`).toISOString()
    : null;

  // End time uses the same selected time as start time
  const endDateIso = endDate && selectedTime
    ? new Date(`${formattedEndDate}T${selectedTime}`).toISOString()
    : null;

  const {
    data: priceData,
    isFetching: isFetchingPrice,
    error: priceError,
  } = useQuery({
    queryKey: ['bookingPriceRange', artistId, selectedService?.id || '690f3db5c1c7c8c6abe0cb2e', startDateIso, endDateIso],
    queryFn: () => fetchBookingPrice(
      artistId,
      (selectedService?.id || '690f3db5c1c7c8c6abe0cb2e'),
      startDateIso!,
      endDateIso!,
    ),
    enabled: !!artistId && !!selectedService && !!startDateIso && !!endDateIso,
    retry: false,
  });

  const bookArtistMutation = useMutation({
    mutationFn: () => bookArtist(artistId, {
      serviceId: selectedService?.id || '690f3db5c1c7c8c6abe0cb2e',
      startDate: startDateIso!,
      endDate: endDateIso!,
      eventName: eventName || "Event",
      advanceAmount: priceData?.advance || 0,
      totalPrice: priceData?.price || 0,
      paidAmount: priceData?.advance || 0,
    }),
    onSuccess: async (resp) => {
      if (resp.success && resp.booking && resp.razorpayOrder) {
        // Load Razorpay script
        const res = await loadRazorpayScript();
        if (!res) {
          toast.error("Razorpay SDK failed to load. Please check your internet connection.");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: resp.razorpayOrder.amount,
          currency: resp.razorpayOrder.currency,
          name: "BrookShow",
          description: `Booking for ${artistName}`,
          order_id: resp.razorpayOrder.id,
          handler: async (response: any) => {
            try {
              const verifyRes = await verifyArtistBookingPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.success) {
                toast.success("Payment successful! Booking confirmed.");
                setIsBookingDialogOpen(false);
                if (onSuccess) onSuccess();
                navigate(`/bookings/${resp.booking?._id}`);
              } else {
                toast.error(verifyRes.message || "Payment verification failed.");
              }
            } catch (err: any) {
              console.error(err);
              toast.error(err.response?.data?.message || "Payment verification failed.");
            }
          },
          theme: {
            color: "#6366f1",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else if (resp.success && resp.booking) {
        toast.success(resp.message || "Booking confirmed.");
        setIsBookingDialogOpen(false);
        if (onSuccess) onSuccess();
        navigate(`/bookings/${resp.booking._id}`);
      } else {
        toast.error(resp.message || "Something went wrong.");
      }
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to place booking. Please try again.");
    },
  });

  const handleBookArtist = () => {
    if (!selectedService || !startDateIso || !endDateIso || !priceData?.success) return;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { state: { redirectTo: window.location.pathname } });
      return;
    }
    setIsBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedService || !startDateIso || !endDateIso) return;
    bookArtistMutation.mutate();
  };

  const isBookingInFlight = bookArtistMutation.status === "pending";

  const content = (
    <div className="space-y-6">
      {/* Service Selection */}
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

      {/* Calendar with Date Range */}
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          Event Date Range
        </h4>
        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            disabled={(date) =>
              date < new Date() || isDateBooked(date)
            }
            className="rounded-md border border-white/10 pointer-events-auto bg-background/50"
            numberOfMonths={1}
          />
        </div>
      </div>

      {/* Date Range Info */}
      {dateRange?.from && (
        <div className="text-center p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="font-semibold">
              {dateRange.from.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
              {dateRange.to && dateRange.to.getTime() !== dateRange.from.getTime() && (
                <> - {dateRange.to.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</>
              )}
            </span>
          </div>
          <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
            {dateRange.to && dateRange.to.getTime() !== dateRange.from.getTime()
              ? `${Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} days`
              : 'Single day'}
          </Badge>
        </div>
      )}

      {/* Time Slots - Only Start Time */}
      {dateRange?.from && (
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Event Start Time
          </h4>
          <p className="text-sm text-muted-foreground mb-3">End time will be set to the same time on the end date</p>
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 gap-2">
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

      {/* Price & Availability Result */}
      {(isFetchingPrice || priceData || priceError) && (
        <div className="p-4 rounded-lg border border-accent/30 bg-accent/10 space-y-3">
          {isFetchingPrice && (
            <p className="text-muted-foreground">Checking availability...</p>
          )}
          {priceError && (
            <p className="text-destructive">Failed to fetch price. Please try again.</p>
          )}
          {priceData?.success && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <Badge className={priceData.available ? "bg-green-500/10 text-green-300 border-green-400/30" : "bg-red-500/10 text-red-300 border-red-400/30"}>
                  {priceData.available ? "Available" : "Not available"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Base Price:</span>
                <span className="font-semibold">₹{priceData.basePrice.toLocaleString('en-IN')} / {priceData.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Price:</span>
                <span className="font-bold">₹{priceData.price.toLocaleString('en-IN')}</span>
              </div>
              {typeof priceData.advance === 'number' && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Advance:</span>
                  <span className="font-semibold">₹{priceData.advance.toLocaleString('en-IN')}</span>
                </div>
              )}
              {priceData.duration && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Start: {new Date(priceData.duration.start).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                  <div>End: {new Date(priceData.duration.end).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                </div>
              )}
              {priceData.message && (
                <p className="text-sm">{priceData.message}</p>
              )}
              {!priceData.available && priceData.conflicts && (
                <div className="text-sm text-muted-foreground space-y-1">
                  {priceData.conflicts.bookings?.length ? (
                    <div>Conflicting bookings: {priceData.conflicts.bookings.length}</div>
                  ) : null}
                  {priceData.conflicts.calendarBlocks?.length ? (
                    <div>Calendar blocks: {priceData.conflicts.calendarBlocks.length}</div>
                  ) : null}
                </div>
              )}
              <Button
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500"
                disabled={!priceData.available}
                onClick={handleBookArtist}
              >
                Book Artist (₹{priceData.advance})
              </Button>
            </>
          )}
        </div>
      )}

    </div>
  );

  return (
    <>
      {isDialogView ? (
        content
      ) : (
        <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl border border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
              Book {artistName}
            </CardTitle>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Select date range and start time for your event</p>
            </div>
          </CardHeader>
          <CardContent>
            {content}
          </CardContent>
        </Card>
      )}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Event Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="eventName">Event Name</Label>
            <p className="text-sm text-muted-foreground">better name help artist remember your event</p>
            <Input
              id="eventName"
              placeholder="e.g. Wedding Reception"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBooking}
              disabled={isBookingInFlight}
            >
              {isBookingInFlight ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};