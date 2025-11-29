import { Calendar, MapPin } from "lucide-react";

interface EventMainContentProps {
  description: string;
  venue: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
}

export const EventMainContent = ({ description, venue, fullAddress, latitude, longitude }: EventMainContentProps) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  
  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="glass-modern p-8 rounded-2xl">
        <h2 className="text-2xl font-bold font-heading mb-4 text-gradient">About This Event</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* <div className="glass-modern p-8 rounded-2xl">
        <h2 className="text-2xl font-bold font-heading mb-4 text-gradient">Lineup</h2>
        <div className="grid grid-cols-2 gap-4">
          {lineup.map((artist, index) => (
            <div key={index} className="bg-muted/20 rounded-xl p-4 border border-white/10">
              <p className="font-bold text-foreground">{artist}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="glass-modern p-8 rounded-2xl">
        <h2 className="text-2xl font-bold font-heading mb-4 text-gradient">Location</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-accent mt-1" />
            <div>
              <p className="font-bold text-foreground text-lg">{venue}</p>
              <p className="text-muted-foreground">{fullAddress}</p>
            </div>
          </div>
          <div 
            className="aspect-video bg-muted/20 rounded-xl border border-white/10 overflow-hidden cursor-pointer"
            onClick={() => window.open(googleMapsUrl, '_blank')}
          >
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&output=embed`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};


