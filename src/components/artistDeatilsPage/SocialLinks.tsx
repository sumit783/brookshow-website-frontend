import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube } from "lucide-react";

interface SocialLinksProps {
  instagram: string;
  twitter: string;
  youtube: string;
}

export const SocialLinks = ({ instagram, twitter, youtube }: SocialLinksProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-accent">Connect</h3>
      <div className="flex gap-4">
        <Button variant="outline" className="gap-2 glass-modern" asChild>
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5" />
            Instagram
          </a>
        </Button>
        <Button variant="outline" className="gap-2 glass-modern" asChild>
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5" />
            Twitter
          </a>
        </Button>
        <Button variant="outline" className="gap-2 glass-modern" asChild>
          <a href={youtube} target="_blank" rel="noopener noreferrer">
            <Youtube className="w-5 h-5" />
            YouTube
          </a>
        </Button>
      </div>
    </div>
  );
};


