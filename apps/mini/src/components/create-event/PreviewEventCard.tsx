import { Heart } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import { Card } from "@mint-up/ui/components/card";

interface PreviewEventCardProps {
  eventData: {
    id: number;
    title: string;
    price: string;
    date: {
      month: string;
      day: string;
    };
    image: string;
    attendeeCount: number;
    location: string;
  };
  onClick?: (e: React.MouseEvent) => void;
}
const PreviewEventCard = ({ eventData, onClick }: PreviewEventCardProps) => {
  return (
    <Card
      className="bg-card border-border mx-auto max-w-md cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div className="flex flex-col sm:h-32 sm:flex-row">
        {/* Image section */}
        <div className="w-full flex-shrink-0 sm:h-32 sm:w-32">
          <div className="relative h-48 w-full overflow-hidden sm:h-32 sm:w-32">
            <div
              className="from-primary/80 to-primary absolute inset-0 bg-gradient-to-br via-purple-600"
              style={{
                backgroundImage: `url(${eventData.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Date Badge */}
            <div className="bg-primary absolute left-2 top-2 rounded px-2 py-1 text-center text-xs text-black">
              <div className="text-[10px] font-semibold">
                {eventData.date.month}
              </div>
              <div className="text-sm font-bold leading-none">
                {eventData.date.day}
              </div>
            </div>

            {/* Favorite Icon */}
            <div className="absolute right-2 top-2 rounded-full bg-black/30 p-1 transition-colors hover:bg-black/50">
              <Heart className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="flex h-[120px] flex-1 flex-col justify-between p-2 sm:h-[128px] sm:p-4">
          {/* Event title and location */}
          <div className="flex-shrink-0 space-y-1">
            <h3 className="text-foreground line-clamp-2 text-sm font-semibold leading-tight sm:text-base">
              {eventData.title}
            </h3>
            <div className="text-muted-foreground truncate text-xs sm:text-sm">
              {eventData.location}
            </div>
          </div>

          {/* Organizer section */}
          <div className="flex flex-shrink-0 items-center space-x-2">
            <div className="from-primary/20 border-primary/30 text-primary flex h-5 w-5 items-center justify-center rounded-full border bg-gradient-to-br to-purple-600/20 text-[10px] font-bold sm:h-6 sm:w-6 sm:text-xs">
              JD
            </div>
            <span className="text-muted-foreground truncate text-xs sm:text-sm">
              By John Doe
            </span>
          </div>

          {/* Bottom section */}
          <div className="flex flex-shrink-0 items-center justify-between">
            {/* Attendee Avatars */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="flex -space-x-1">
                <div className="from-primary border-card h-5 w-5 rounded-full border-2 bg-gradient-to-br to-purple-600 sm:h-6 sm:w-6"></div>
                <div className="border-card h-5 w-5 rounded-full border-2 bg-gradient-to-br from-purple-600 to-pink-500 sm:h-6 sm:w-6"></div>
                <div className="border-card h-5 w-5 rounded-full border-2 bg-gradient-to-br from-pink-500 to-red-500 sm:h-6 sm:w-6"></div>
              </div>
              <span className="text-muted-foreground text-[10px] font-medium sm:text-xs">
                +{eventData.attendeeCount}
              </span>
            </div>

            {/* Action Button */}
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 px-2 py-1 text-[10px] font-semibold text-black sm:px-3 sm:text-xs"
            >
              Get Ticket
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default PreviewEventCard;
