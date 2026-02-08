import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RecommendedEvents from "@/components/eventDetails/RecommendedEvents";
import { EventHero } from "@/components/eventDetails/EventHero";
import { EventMainContent } from "@/components/eventDetails/EventMainContent";
import { EventSidebar } from "@/components/eventDetails/EventSidebar";
import { TicketDialog } from "@/components/eventDetails/TicketDialog";
import { useQuery } from "@tanstack/react-query";
import { fetchEventDetails, type EventDetailsResponse } from "@/api/events";
import { API_BASE_URI } from "@/api/client";
import { EventDetailsSkeleton } from "@/components/skeletons/EventDetailsSkeleton";
import { buyTicket, verifyTicketPurchase } from "@/api/tickets";
import { toast } from "sonner";


const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const { data: eventData, isLoading, error } = useQuery({
    queryKey: ['eventDetails', id],
    queryFn: () => fetchEventDetails(id!),
    enabled: !!id,
  });

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    if (imagePath.startsWith('/')) {
      return `${API_BASE_URI}${imagePath}`;
    }
    return `${API_BASE_URI}/${imagePath}`;
  };

  // Scroll to top when navigating to this page or switching event IDs
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [id]);  

  if (isLoading) {
    return <EventDetailsSkeleton />;
  }

  if (error || !eventData || !eventData.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {error ? 'Failed to load event details. Please try again later.' : 'The event you are looking for does not exist.'}
          </p>
          <button 
            onClick={() => navigate('/events')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Go Back to Events
          </button>
        </div>
      </div>
    );
  }

  const event = eventData;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <EventHero
        image={getImageUrl(event.image)}
        title={event.title}
        artist={event.artist || "Unknown Artist"}
        status={event.status}
        onBack={() => navigate(-1)}
      />

      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <EventMainContent
            description={event.description}
            venue={event.venue}
            fullAddress={event.fullAddress}
            latitude={event.latitude}
            longitude={event.longitude}
          />
          <EventSidebar
            price={event.price}
            date={event.date}
            time={event.time}
            doors={event.doors}
            location={event.location}
            onGetTickets={() => setOpenDialog(true)}
          />
        </div>
      </div>
      <RecommendedEvents events={{}} currentId={Number(event.id)} /> {/* TODO: Implement actual recommended events fetching */}
      <TicketDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        eventId={event.id}
        currency={(event.price || "").replace(/[0-9.\s]/g, "") || "₹"}
        onPayNow={async (data) => {
          const token = localStorage.getItem("token");
          if (!token) {
              toast.error("Please sign in to buy tickets");
              navigate("/signin");
              return;
          }

          try {
             const response = await buyTicket({
                 ticketTypeId: data.ticketTypeId,
                 quantity: data.persons,
                 buyerName: data.name,
                 buyerPhone: data.phone.replace("+91 ", "") // Extract number only
             });

             if (response.success && response.ticket && response.razorpayOrder) {
                // Load Razorpay script
                const res = await loadRazorpayScript();
                if (!res) {
                    toast.error("Razorpay SDK failed to load. Please check your internet connection.");
                    return;
                }

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: response.razorpayOrder.amount,
                    currency: response.razorpayOrder.currency,
                    name: "BrookShow",
                    description: `Ticket Purchase for ${event.title}`,
                    order_id: response.razorpayOrder.id,
                    handler: async (resp: any) => {
                        try {
                            const verifyRes = await verifyTicketPurchase({
                                razorpay_order_id: resp.razorpay_order_id,
                                razorpay_payment_id: resp.razorpay_payment_id,
                                razorpay_signature: resp.razorpay_signature,
                            });

                            if (verifyRes.success) {
                                toast.success(verifyRes.message || "Ticket purchased successfully");
                                setOpenDialog(false);
                                navigate(`/ticket/${response.ticket._id}`);
                            } else {
                                toast.error(verifyRes.message || "Payment verification failed");
                            }
                        } catch (err: any) {
                            console.error("Verification error:", err);
                            toast.error(err.response?.data?.message || "Payment verification failed");
                        }
                    },
                    theme: {
                        color: "#6366f1",
                    },
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
             } else if (response.success && response.ticket) {
                 toast.success(response.message || "Ticket purchased successfully");
                 setOpenDialog(false);
                 navigate(`/ticket/${response.ticket._id}`);
             } else {
                 toast.error(response.message || "Failed to purchase ticket");
             }
          } catch (error: any) {
              console.error("Purchase error:", error);
              toast.error(error.response?.data?.message || "An error occurred while purchasing");
          }
        }}
      />
    </div>
  );
}
