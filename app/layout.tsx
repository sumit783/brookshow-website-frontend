import type { Metadata } from 'next';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Providers from "./providers";
import "@/index.css"; // Ensure this path is correct based on where index.css is located

export const metadata: Metadata = {
  title: "BrookShow - Empowering Talents, Ensuring Trust",
  description: "Discover & book trusted Artists, DJs, Event Planners & more. Join BrookShow for verified artists, secure payments, and real-time QR ticketing.",
  keywords: "artists, DJs, event planners, booking, tickets, entertainment, verified artists, secure payments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/webp" href="/favicon.webp" />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
