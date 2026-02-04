import { Routes, Route, Navigate } from "react-router-dom";
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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};

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
        <Route 
          path="bookings/:id" 
          element={
            <ProtectedRoute>
              <BookedArtist />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};


