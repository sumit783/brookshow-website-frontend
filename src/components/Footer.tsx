export const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gradient-primary rounded-md shadow-glow"></div>
            <span className="text-lg font-bold font-heading">BrookShow</span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            © 2025 BrookShow — Empowering talents, ensuring trust
          </p>
          
          <div className="flex justify-center space-x-8">
            <a 
              href="#privacy" 
              className="text-muted-foreground hover:text-accent transition-smooth"
            >
              Privacy Policy
            </a>
            <span className="text-muted-foreground">|</span>
            <a 
              href="#terms" 
              className="text-muted-foreground hover:text-accent transition-smooth"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};