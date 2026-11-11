"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/api/user";
import { logoutUser } from "@/api/client";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UserInfoSection } from "@/components/profile/UserInfoSection";
import { TicketsSection } from "@/components/profile/TicketsSection";
import { BookingsSection } from "@/components/profile/BookingsSection";
import { SEO } from "@/components/SEO";

const Profile = () => {
  const { data: profileResponse, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });

  const profileData = profileResponse?.success ? profileResponse : null;
  const loading = isLoading;

  useEffect(() => {
    if (error) {
      const status = (error as any)?.response?.status || (error as any)?.status;
      if (status !== 401) {
        toast.error("Failed to load profile");
      }
    } else if (profileResponse && !profileResponse.success) {
      toast.error("Failed to load profile");
    }
  }, [error, profileResponse]);

  const handleLogout = () => {
    logoutUser({ redirectToLogin: true });
    toast.success("Logged out successfully");
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

  const { user, tickets, bookings } = profileData;

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl space-y-8">
      <SEO 
        title="My Profile - BrookShow"
        description="Manage your BrookShow account, view bookings, and update your profile details."
      />
      {/* User Info Section */}
      <UserInfoSection user={user} onLogout={handleLogout} />

      <Separator />

      {/* Tickets Section */}
      <TicketsSection tickets={tickets} />

      <Separator />

      {/* Bookings Section */}
      <BookingsSection bookings={bookings} />
    </div>
  );
};

export default Profile;
