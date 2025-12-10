import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ArtistProfile from "@/pages/ArtistProfile";
import EventDetails from "@/pages/EventDetails";
import Artists from "./pages/Artists";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import TicketDetails from "@/pages/TicketDetails";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import Profile from "@/pages/Profile";
import BookedArtist from "@/pages/BookedArtist";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="ticket/:id" element={<TicketDetails />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="artists" element={<Artists />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="artists/:id" element={<ArtistProfile />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="bookings/:id" element={<BookedArtist />} />
        <Route path="profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};


