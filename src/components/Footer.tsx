import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <img src={logo} alt="BrookShow Logo" className="w-auto h-14 object-contain" />
            {/* <span className="text-lg font-bold font-heading">BrookShow</span> */}
          </div>
          
          <p className="text-muted-foreground mb-6">
            © 2025 BrookShow — Empowering talents, ensuring trust
          </p>
          
          <div className="flex justify-center space-x-8">
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-accent transition-smooth"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-accent transition-smooth"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};