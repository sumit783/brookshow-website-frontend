import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    // Handle form submission
    console.log("Contact form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark moving-bg opacity-30"></div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <Card className="glass-modern border-white/10 hover-scale">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg shadow-glow mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>info@brookshow.com</CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-modern border-white/10 hover-scale">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg shadow-glow mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>+1 (555) 123-4567</CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-modern border-white/10 hover-scale">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg shadow-glow mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Visit Us</CardTitle>
                <CardDescription>Addis Ababa, Ethiopia</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="glass-ultra border-white/10 shadow-strong max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...register("name")}
                      className="glass border-white/20"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      className="glass border-white/20"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What is this about?"
                    {...register("subject")}
                    className="glass border-white/20"
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    rows={6}
                    {...register("message")}
                    className="glass border-white/20"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}