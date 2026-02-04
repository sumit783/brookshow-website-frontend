import { Link, NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export const Navbar = () => {
  const { pathname, hash } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const linkBase = "text-foreground hover:text-accent transition-smooth font-medium";
  const mobileLinkBase = "text-xl text-foreground hover:text-accent transition-smooth font-semibold py-2 border-b border-white/10";
  
  const isHomeActive = pathname === "/" && (hash === "" || hash === undefined || hash === "home");
  const isArtistsActive = pathname === "/artists" || (pathname === "/" && hash === "artists");
  const isEventsActive = pathname === "/events" || (pathname === "/" && hash === "events");
  const isContactActive = pathname === "/contact" || (pathname === "/" && hash === "#contact");

  const navLinks = [
    { name: "Home", path: "/", isActive: isHomeActive },
    { name: "Artists", path: "/artists", isActive: isArtistsActive },
    { name: "Events", path: "/events", isActive: isEventsActive },
    { name: "Contact", path: "/contact", isActive: isContactActive },
  ];

  const token = localStorage.getItem("token");
  let userInitial = "U";
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        const user = JSON.parse(userStr);
        if (user.displayName) userInitial = user.displayName[0].toUpperCase();
    }
  } catch (e) {
    // ignore
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl">
      <div className="moving-bg bg-gradient-dark opacity-50 absolute inset-0"></div>
      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg shadow-glow"></div>
            <span className="text-xl font-bold font-heading text-foreground">
              BrookShow
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={`${linkBase} ${link.isActive ? "text-accent" : ""}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
             {token ? (
                 <Link to="/profile">
                     <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground">{userInitial}</AvatarFallback>
                     </Avatar>
                 </Link>
             ) : (
                <div className="hidden sm:block">
                  <Link to="/signup">
                      <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          Get Started
                      </Button>
                  </Link>
                </div>
             )}

             {/* Mobile Menu Trigger */}
             <div className="md:hidden">
               <Sheet open={isOpen} onOpenChange={setIsOpen}>
                 <SheetTrigger asChild>
                   <Button variant="ghost" size="icon" className="text-foreground">
                     <Menu className="h-6 w-6" />
                     <span className="sr-only">Toggle menu</span>
                   </Button>
                 </SheetTrigger>
                 <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-white/10 w-full sm:max-w-xs">
                   <SheetHeader className="text-left mb-8">
                     <SheetTitle className="text-2xl font-bold font-heading text-foreground">
                        BrookShow
                     </SheetTitle>
                   </SheetHeader>
                   <div className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <NavLink 
                          key={link.name} 
                          to={link.path} 
                          onClick={() => setIsOpen(false)}
                          className={`${mobileLinkBase} ${link.isActive ? "text-accent" : ""}`}
                        >
                          {link.name}
                        </NavLink>
                      ))}
                      {!token && (
                        <Link to="/signup" onClick={() => setIsOpen(false)} className="pt-4">
                           <Button className="w-full bg-gradient-primary border-0">
                             Get Started
                           </Button>
                        </Link>
                      )}
                   </div>
                 </SheetContent>
               </Sheet>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};