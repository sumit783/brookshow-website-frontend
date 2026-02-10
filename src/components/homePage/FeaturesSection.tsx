import { Shield, CreditCard, Smartphone } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Artists & Events",
    description: "All artists and events are thoroughly verified for your peace of mind and quality assurance."
  },
  {
    icon: CreditCard,
    title: "Easy Bookings & Secure Payments",
    description: "Simple booking process with secure payment gateways ensuring safe transactions."
  },
  {
    icon: Smartphone,
    title: "Real-time Updates & QR Ticketing",
    description: "Get instant updates and access your tickets through secure QR codes on your mobile device."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="countdown-section py-16 md:py-28 lg:py-32 md:px-6 relative overflow-hidden">
      {/* Moving Background */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-primary rounded-full opacity-20 floating-card"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 
            className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-6 bg-clip-text text-transparent"
             style={{ backgroundImage: "linear-gradient(90deg, rgb(251, 191, 36) 0%, rgb(129, 140, 248) 50%, rgb(244, 114, 182) 100%)" }}
          >
            Why BrookShow?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the future of talent booking with our innovative platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="countdown-item group fade-in-scale"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-8 flex justify-center w-full relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth pulse-glow">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold font-heading mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-lg relative z-10">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};