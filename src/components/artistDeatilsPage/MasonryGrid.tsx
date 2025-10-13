import { useState } from "react";
import { Play, ExternalLink, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface MediaItem {
  src: string;
  type: 'image' | 'video';
  id: string;
}

interface MasonryGridProps {
  images: string[];
  videos: string[];
}

export const MasonryGrid = ({ images, videos }: MasonryGridProps) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Combine and shuffle media items
  const mediaItems: MediaItem[] = [
    ...images.map((src, idx) => ({ src, type: 'image' as const, id: `img-${idx}` })),
    ...videos.map((src, idx) => ({ src, type: 'video' as const, id: `vid-${idx}` }))
  ].sort(() => Math.random() - 0.5);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {mediaItems.map((item, idx) => (
          <div 
            key={item.id}
            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg border border-white/10 hover:border-accent/30 transition-all duration-300"
            onClick={() => setSelectedMedia(item)}
          >
            {item.type === 'image' ? (
              <div className="relative">
                <img
                  src={item.src}
                  alt={`Portfolio ${idx + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ height: `${200 + Math.random() * 200}px` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={item.src}
                  alt={`Video ${idx + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ height: `${250 + Math.random() * 150}px` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-gray-800 ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="px-2 py-1 bg-black/70 text-white text-xs font-semibold rounded-full">
                    VIDEO
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Media Viewer Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/90 border-none">
          {selectedMedia && (
            <div className="relative">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.src}
                  alt="Portfolio item"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              ) : (
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <img
                    src={selectedMedia.src}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};