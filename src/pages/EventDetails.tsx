import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RecommendedEvents from "@/components/eventDetails/RecommendedEvents";
import ticket1 from "@/assets/ticket-1.jpg";
import ticket2 from "@/assets/ticket-2.jpg";
import ticket3 from "@/assets/ticket-3.jpg";
import { EventHero } from "@/components/eventDetails/EventHero";
import { EventMainContent } from "@/components/eventDetails/EventMainContent";
import { EventSidebar } from "@/components/eventDetails/EventSidebar";
import { TicketDialog } from "@/components/eventDetails/TicketDialog";

const eventDetails = {
  "1": {
    id: 1,
    title: "Electronic Nights Festival",
    artist: "Luna Eclipse & Friends",
    date: "March 15, 2025",
    time: "8:00 PM",
    venue: "Downtown Arena",
    location: "Los Angeles, CA",
    fullAddress: "123 Arena Blvd, Los Angeles, CA 90015",
    price: "$89",
    attendance: "2.5K+ going",
    image: ticket1,
    status: "Selling Fast",
    description:
      "Join us for an unforgettable night of electronic music featuring Luna Eclipse and special guest DJs. Experience cutting-edge sound production and mesmerizing visual displays.",
    lineup: ["Luna Eclipse", "DJ Neon", "Bass Master", "Stellar Beats"],
    ageRestriction: "18+",
    doors: "7:00 PM",
  },
  "2": {
    id: 2,
    title: "Neon Dreams Concert",
    artist: "Digital Nexus Live",
    date: "March 22, 2025",
    time: "9:00 PM",
    venue: "Electric Club",
    location: "Miami, FL",
    fullAddress: "456 Ocean Drive, Miami, FL 33139",
    price: "$65",
    attendance: "1.8K+ going",
    image: ticket2,
    status: "Available",
    description:
      "Digital Nexus brings their chart-topping hits live for one night only. Get ready for a high-energy performance you won't forget.",
    lineup: ["Digital Nexus", "Synthwave", "Cyber Pulse"],
    ageRestriction: "21+",
    doors: "8:00 PM",
  },
  "3": {
    id: 3,
    title: "Jazz & Soul Evening",
    artist: "Sophia Grace Quartet",
    date: "March 28, 2025",
    time: "7:30 PM",
    venue: "Blue Note Lounge",
    location: "New York, NY",
    fullAddress: "789 Broadway, New York, NY 10003",
    price: "$125",
    attendance: "850+ going",
    image: ticket3,
    status: "Limited",
    description:
      "An intimate evening of smooth jazz and soulful melodies with the acclaimed Sophia Grace Quartet. Limited seating available.",
    lineup: ["Sophia Grace", "Marcus Johnson", "Lisa Chen", "Tony Williams"],
    ageRestriction: "All Ages",
    doors: "6:30 PM",
  },
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventDetails[id as keyof typeof eventDetails];
  const [openDialog, setOpenDialog] = useState(false);

  // Scroll to top when navigating to this page or switching event IDs
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [id]);  

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <EventHero
        image={event.image}
        title={event.title}
        artist={event.artist}
        status={event.status}
        onBack={() => navigate(-1)}
      />

      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <EventMainContent
            description={event.description}
            lineup={event.lineup}
            venue={event.venue}
            fullAddress={event.fullAddress}
          />
          <EventSidebar
            price={event.price}
            date={event.date}
            time={event.time}
            doors={event.doors}
            attendance={event.attendance}
            location={event.location}
            onGetTickets={() => setOpenDialog(true)}
          />
        </div>
      </div>
      <RecommendedEvents events={eventDetails} currentId={event.id} />
      <TicketDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        unitPrice={Number((event.price || "$0").replace(/[^0-9.]/g, ""))}
        currency={(event.price || "$").replace(/[0-9.\s]/g, "") || "$"}
        onPayNow={(data) => {
          console.log("Pay Now:", data);
          setOpenDialog(false);
        }}
      />
    </div>
  );
}
