import { SEO } from "@/components/SEO";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <SEO 
        title="Terms & Conditions"
        description="Read the terms and conditions for using the BrookShow platform."
        canonical="https://brookshow.com/terms"
      />
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold font-heading mb-8 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
          Terms & Conditions
        </h1>
        
        <div className="glass-modern rounded-3xl p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using BrookShow, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of these terms, do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Platform Usage</h2>
            <p>
              BrookShow is a marketplace that connects users with artists and event organizers. We facilitate bookings and ticketing but are not the provider of the artistic services themselves.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Bookings and Payments</h2>
            <p>
              All bookings made through the platform are subject to availability. Payments are processed securely through our third-party payment gateways. By making a booking, you agree to pay the specified amount, including any applicable taxes and service fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Cancellation and Refunds</h2>
            <p>
              Cancellation and refund policies vary by artist and event. Please review the specific cancellation policy provided at the time of booking. BrookShow reserves the right to mediate disputes but the final refund authority lies with the service provider unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. QR Ticketing</h2>
            <p>
              Tickets for events are issued as secure QR codes. These codes are unique and valid for one-time entry at the specified venue and time. You are responsible for maintaining the security of your QR tickets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
            <p>
              All content on the BrookShow platform, including logos, text, graphics, and software, is the property of BrookShow or its content suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
            <p>
              BrookShow shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform or any services booked through the platform.
            </p>
          </section>

          <div className="text-sm border-t border-white/10 pt-8 mt-12">
            Last updated: March 12, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
