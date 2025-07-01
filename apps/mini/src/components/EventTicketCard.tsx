import { Calendar, Clock, MapPin } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";

interface EventTicketCardProps {
  eventName?: string;
  selectedImage?: string | null;
  eventDate?: string;
  location?: string;
  nftName?: string;
  onMintClick?: () => void;
}

const EventTicketCard = ({
  eventName = "Web3 Developer Meetup",
  selectedImage,
  eventDate,
  location = "San Francisco",
  nftName = "Web3 Developer Meetup",
  onMintClick,
}: EventTicketCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Dec 15, 2024";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleMintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMintClick?.();
  };

  return (
    <div className="relative">
      {/* Background grid pattern */}
      <div className="absolute -inset-20 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Card stack container */}
      <div className="group relative cursor-pointer">
        {/* Main card */}
        <div className="bg-card relative h-96 w-80 overflow-hidden rounded-lg border shadow-2xl transition-all duration-300 group-hover:scale-105">
          {/* Header section */}
          <div className="flex items-start justify-between p-4 pb-2">
            <div className="flex items-center space-x-2">
              <span className="text-primary text-lg font-bold">MINT UP!</span>
              <span className="text-foreground text-sm font-light tracking-wider">
                EVENT #001
              </span>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">@TechMeetup</p>
            </div>
          </div>

          {/* Main artwork section */}
          <div className="relative mx-4 mb-4 h-32 overflow-hidden rounded-lg">
            {selectedImage ? (
              // Show user's uploaded image
              <div className="absolute inset-0">
                <img
                  src={selectedImage}
                  alt="Event artwork"
                  className="h-full w-full object-cover"
                />
                {/* Overlay to maintain readability */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            ) : (
              // Show default geometric artwork
              <>
                {/* Complex geometric artwork with brand colors */}
                <div className="from-primary/80 to-primary absolute inset-0 bg-gradient-to-br via-purple-600"></div>

                {/* Geometric shapes layer 1 */}
                <div className="absolute inset-0">
                  {/* Large triangle - top left */}
                  <div className="from-primary to-primary/80 absolute top-0 left-0 h-16 w-16 origin-top-left rotate-45 transform bg-gradient-to-br"></div>

                  {/* Purple diagonal band */}
                  <div className="absolute top-8 left-0 h-12 w-full -skew-y-12 transform bg-gradient-to-r from-purple-600 via-purple-500 to-transparent"></div>

                  {/* Accent triangle */}
                  <div className="from-primary/90 to-primary absolute top-4 right-8 h-8 w-8 rotate-12 transform bg-gradient-to-br"></div>

                  {/* Pink geometric shape */}
                  <div className="absolute top-12 right-4 h-6 w-12 -rotate-12 transform rounded-l-full bg-gradient-to-l from-pink-400 to-pink-500"></div>
                </div>

                {/* Geometric shapes layer 2 */}
                <div className="absolute inset-0">
                  {/* Grid lines overlay */}
                  <div className="border-primary/70 absolute top-6 left-4 h-12 w-12 border-t-2 border-l-2"></div>
                  <div className="border-primary/70 absolute top-8 left-6 h-8 w-8 border-r-2 border-b-2"></div>

                  {/* Teal geometric section */}
                  <div className="to-primary/60 absolute bottom-6 left-2 h-8 w-16 skew-x-12 transform bg-gradient-to-t from-teal-500"></div>

                  {/* Accent diagonal stripe */}
                  <div className="from-primary to-primary/60 absolute bottom-4 left-0 h-1 w-full -rotate-12 transform bg-gradient-to-r"></div>
                </div>

                {/* Texture overlays */}
                <div className="absolute inset-0 opacity-30">
                  {/* Dotted texture */}
                  <div
                    className="bg-primary/60 absolute bottom-1 left-1 h-6 w-12"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "4px 4px",
                    }}
                  ></div>

                  {/* Line texture */}
                  <div
                    className="absolute right-2 bottom-2 h-12 w-8 bg-purple-600/60"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 4px)",
                    }}
                  ></div>
                </div>
              </>
            )}
          </div>

          {/* Event details section - enhanced hierarchy */}
          <div className="space-y-3 px-4">
            {/* Event title - most prominent */}
            <h3 className="text-foreground text-xl leading-tight font-bold">
              {eventName}
            </h3>

            {/* Date and location - secondary info */}
            <div className="text-muted-foreground flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Calendar className="text-primary h-4 w-4" />
                <span className="text-sm font-medium">
                  {formatDate(eventDate)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="text-primary h-4 w-4" />
                <span className="text-sm font-medium">{location}</span>
              </div>
            </div>

            {/* Event type and pricing - clear hierarchy */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Clock className="text-primary h-4 w-4" />
                <div>
                  <div className="text-foreground text-base font-semibold">
                    Free Event
                  </div>
                  <div className="text-muted-foreground text-xs font-light">
                    NFT Ticket
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-primary text-2xl font-bold">FREE</div>
                <div className="text-muted-foreground text-xs font-light">
                  Mint Now
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section with mint button */}
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-3 text-base font-bold"
              onClick={handleMintClick}
            >
              Mint Your Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicketCard;
