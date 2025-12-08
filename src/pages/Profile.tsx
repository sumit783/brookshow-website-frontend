import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, UserProfileResponse } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, LogOut, Ticket as TicketIcon, Calendar, MapPin, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        if (data.success) {
          setProfileData(data);
        } else {
            toast.error("Failed to load profile");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profileData) {
    return (
        <div className="flex justify-center items-center h-screen pt-20">
            <p className="text-muted-foreground">Could not load profile data.</p>
        </div>
    );
  }

  const { user, tickets } = profileData;

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl space-y-8">
      {/* User Info Section */}
      <Card className="shadow-sm">
        <CardContent className="pt-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src="" />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
              {user.displayName ? user.displayName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left space-y-2">
            <div>
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email} {user.isEmailVerified && <Badge variant="secondary" className="ml-1 text-[10px] h-4">Verified</Badge>}
                </div>
                {user.phone && (
                    <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                         {user.countryCode} {user.phone}
                    </div>
                )}
              </div>
            </div>
            <div className="pt-2">
                 <Badge variant="outline">{user.role}</Badge>
            </div>
          </div>
          <Button variant="destructive" size="sm" onClick={handleLogout} className="flex gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Tickets Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
            <TicketIcon className="h-5 w-5" /> My Tickets
        </h2>
        {tickets.length === 0 ? (
            <Card className="bg-muted/50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <TicketIcon className="h-10 w-10 text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground font-medium">No tickets purchased yet</p>
                    <Link to="/events">
                         <Button variant="link" className="mt-2">Browse Events</Button>
                    </Link>
                </CardContent>
            </Card>
        ) : (
            <div className="grid gap-4 md:grid-cols-2">
                {tickets.map((ticket) => (
                    <Link to={`/ticket/${ticket.id}`} key={ticket.id}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">{ticket.event.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {format(new Date(ticket.event.date), "PPP p")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-end">
                                    <div className="text-sm space-y-1">
                                        <p className="flex items-center gap-1 text-muted-foreground">
                                            <MapPin className="h-3 w-3" /> {ticket.event.venue}
                                        </p>
                                        <p>
                                            <span className="font-medium">{ticket.ticketType}</span> x {ticket.quantity}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">₹{ticket.totalPrice}</p>
                                        <Badge variant={ticket.isValid ? "secondary" : "destructive"} className="mt-1">
                                            {ticket.isValid ? "Valid" : "Invalid"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
