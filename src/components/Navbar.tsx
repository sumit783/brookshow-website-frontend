import { Link, NavLink, useLocation } from "react-router-dom";


export const Navbar = () => {
  const { pathname, hash } = useLocation();
  const linkBase = "text-foreground hover:text-accent transition-smooth";
  const isHomeActive = pathname === "/" && (hash === "" || hash === undefined || hash === "home");
  const isArtistsActive = pathname === "/" && hash === "artists";
  const isEventsActive = pathname === "/" && hash === "events";
  const isContactActive = pathname === "/" && hash === "#contact";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl">
      <div className="moving-bg bg-gradient-dark opacity-50 absolute inset-0"></div>
      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg shadow-glow"></div>
            <span className="text-xl font-bold font-heading text-foreground">
              BrookShow
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={() => `${linkBase} ${isHomeActive ? "text-accent" : ""}`}>Home</NavLink>
            <NavLink to="/artists" className={() => `${linkBase} ${isArtistsActive ? "text-accent" : ""}`}>Artists</NavLink>
            <NavLink to="/events" className={() => `${linkBase} ${isEventsActive ? "text-accent" : ""}`}>Events</NavLink>
            <NavLink to="/contact" className={() => `${linkBase} ${isContactActive ? "text-accent" : ""}`}>Contact</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};