import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut, Mail, Phone } from "lucide-react";
import { UserProfile } from "@/api/user";

interface UserInfoSectionProps {
  user: UserProfile;
  onLogout: () => void;
}

export const UserInfoSection = ({ user, onLogout }: UserInfoSectionProps) => {
  return (
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
          {/* <div className="pt-2">
            <Badge variant="outline">{user.role}</Badge>
          </div> */}
        </div>
        <Button variant="destructive" size="sm" onClick={onLogout} className="flex gap-2">
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </CardContent>
    </Card>
  );
};
