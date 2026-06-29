import { SEO } from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <SEO 
        title="Privacy Policy"
        description="Learn how BrookShow collects, uses, and protects your personal information."
        canonical="https://brookshow.com/privacy"
      />
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold font-heading mb-8 bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="glass-modern rounded-3xl p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p>
              Welcome to BrookShow. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at info@brookshow.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when registering at the BrookShow platform, expressing an interest in obtaining information about us or our products and services, when participating in activities on the platform or otherwise contacting us.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Personal Data: Name, email address, phone number, and location.</li>
              <li>Booking Information: Details about the artists you book or events you attend.</li>
              <li>Payment Data: We collect data necessary to process your payment if you make purchases, such as your payment instrument number. All payment data is stored by our payment processor (e.g., Razorpay).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our platform for a variety of business purposes described below:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To fulfill and manage your bookings.</li>
              <li>To send administrative information to you.</li>
              <li>To protect our platform and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Sharing Your Information</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. This includes sharing necessary details with artists you book or event organizers for the purpose of fulfilling the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may email us at info@brookshow.com.
            </p>
          </section>

          <div className="text-sm border-t border-white/10 pt-8 mt-12">
            Last updated: March 12, 2025
          </div>
        </div>
      </div>
    </div>
  );
}
