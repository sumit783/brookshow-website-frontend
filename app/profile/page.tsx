"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserProfile, UserProfileResponse } from "@/api/user";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UserInfoSection } from "@/components/profile/UserInfoSection";
import { TicketsSection } from "@/components/profile/TicketsSection";
import { BookingsSection } from "@/components/profile/BookingsSection";
import { SEO } from "@/components/SEO";

const Profile = () => {
  const router = useRouter();
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
    router.push("/signin");
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
