import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ArtistProfile from "@/pages/ArtistProfile";
import EventDetails from "@/pages/EventDetails";
import Artists from "./pages/Artists";
import Events from "./pages/Events";
import Contact from "./pages/Contact";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="artists" element={<Artists />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="artists/:id" element={<ArtistProfile />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};


