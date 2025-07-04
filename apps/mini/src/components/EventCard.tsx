import { useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import { Card } from "@mint-up/ui/components/card";

import EventQuickViewDialog from "./EventQuickViewDialog";

interface EventCardProps {
  event: {
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
}

const EventCard = ({ event }: EventCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleCardClick = () => {
    setIsQuickViewOpen(true);
  };

  const handleGetNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  // Convert event data for dialog
  const dialogEvent = {
    id: event.id,
    title: event.title,
    date: `${event.date.month} ${event.date.day}, 2024`,
    location: event.location,
    image: event.image,
    attendeeCount: event.attendeeCount,
  };

  return (
    <>
      <Card
        className="bg-card border-border cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-105"
        onClick={handleCardClick}
      >
        {/* Card Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="from-primary/80 to-primary absolute inset-0 bg-gradient-to-br via-purple-600"
            style={{
              backgroundImage: `url(${event.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Date Badge */}
          <div className="bg-primary absolute left-4 top-4 min-w-[60px] rounded-lg px-3 py-2 text-center text-black">
            <div className="text-xs font-semibold">{event.date.month}</div>
            <div className="text-lg font-bold leading-none">
              {event.date.day}
            </div>
          </div>

          {/* Favorite Icon */}
          <div className="absolute right-4 top-4 rounded-full bg-black/30 p-2 transition-colors hover:bg-black/50">
            <Heart className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Card Body */}
        <div className="space-y-3 p-4">
          <h3 className="text-foreground line-clamp-2 text-lg font-semibold leading-tight">
            {event.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm">
              {event.location}
            </div>
            <div className="text-primary text-xl font-bold">{event.price}</div>
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between pt-2">
            {/* Attendee Avatars */}
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="from-primary border-card h-7 w-7 rounded-full border-2 bg-gradient-to-br to-purple-600"></div>
                <div className="border-card h-7 w-7 rounded-full border-2 bg-gradient-to-br from-purple-600 to-pink-500"></div>
                <div className="border-card h-7 w-7 rounded-full border-2 bg-gradient-to-br from-pink-500 to-red-500"></div>
              </div>
              <span className="text-muted-foreground text-sm font-medium">
                +{event.attendeeCount}
              </span>
            </div>

            {/* Action Button */}
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 px-4 font-semibold text-black"
              onClick={handleGetNowClick}
            >
              Get Now
            </Button>
          </div>
        </div>
      </Card>

      <EventQuickViewDialog
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        event={dialogEvent}
      />
    </>
  );
};

export default EventCard;
