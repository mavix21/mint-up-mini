import { Calendar, MapPin } from "lucide-react";

import { AspectRatio } from "@mint-up/ui/components/aspect-ratio";
import { DialogHeader, DialogTitle } from "@mint-up/ui/components/dialog";

interface EventQuickViewHeaderProps {
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    image: string;
    attendeeCount: number;
  };
  onImageClick: () => void;
}
const EventQuickViewHeader = ({
  event,
  onImageClick,
}: EventQuickViewHeaderProps) => {
  return (
    <div className="space-y-4 px-2 pt-6">
      <div className="flex gap-4">
        {/* Event Image - Larger */}
        <div className="h-32 w-32 flex-shrink-0">
          <AspectRatio ratio={1}>
            <div
              className="from-primary/80 to-primary h-full w-full cursor-pointer rounded-lg bg-gradient-to-br via-purple-600 bg-cover bg-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundImage: `url(${event.image})`,
              }}
              onClick={onImageClick}
            >
              <div className="h-full w-full rounded-lg bg-black/20" />
            </div>
          </AspectRatio>
        </div>

        {/* Event Details */}
        <div className="flex-1 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-foreground text-left text-2xl font-bold leading-tight">
              {event.title}
            </DialogTitle>
          </DialogHeader>

          <div className="text-muted-foreground flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span className="text-sm font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-primary h-4 w-4" />
              <span className="text-sm font-medium">{event.location}</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="flex -space-x-2">
              <div className="from-primary border-card h-8 w-8 rounded-full border-2 bg-gradient-to-br to-purple-600"></div>
              <div className="border-card h-8 w-8 rounded-full border-2 bg-gradient-to-br from-purple-600 to-pink-500"></div>
              <div className="border-card h-8 w-8 rounded-full border-2 bg-gradient-to-br from-pink-500 to-red-500"></div>
            </div>
            <span>{event.attendeeCount} people have already registered.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventQuickViewHeader;
