import { Award, Calendar, Gamepad2, Gift, MapPin, Users } from "lucide-react";

import EventCard from "../EventCard";
import EventTicketCard from "../EventTicketCard";

interface LivePreviewProps {
  currentStep: number;
  formData: any;
}

const LivePreview = ({ currentStep, formData }: LivePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const mockEventData = {
    id: 1,
    title: formData.eventName || "Your Event Title",
    price: formData.ticketPrice === "Free" ? "FREE" : "$25.00",
    date: {
      month: formData.startDate
        ? formatDate(formData.startDate).split(" ")[0]
        : "MAY",
      day: formData.startDate
        ? formatDate(formData.startDate).split(" ")[1]
        : "18",
    },
    image:
      formData.selectedImage ||
      "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
    attendeeCount: 22,
    location: formData.location || "San Francisco, CA",
  };

  return (
    <div className="sticky top-20">
      <div className="bg-card rounded-lg border p-6 shadow-sm">
        {currentStep === 1 && (
          <div>
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Live Preview: Event Card
            </h3>
            <EventCard event={mockEventData} />
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Live Preview: NFT Ticket
            </h3>
            <div className="flex justify-center">
              <EventTicketCard
                eventName={formData.eventName || "Web3 Developer Meetup"}
                selectedImage={formData.selectedImage}
                eventDate={formData.startDate}
                location={formData.location || "San Francisco"}
                nftName={formData.nftName || "Web3 Developer Meetup"}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-foreground mb-6 text-lg font-semibold">
              Live Preview: Full Event Page
            </h3>
            <div className="space-y-4">
              {/* Event Banner */}
              <div className="relative h-32 overflow-hidden rounded-lg">
                <img
                  src={
                    formData.selectedImage ||
                    "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png"
                  }
                  alt="Event banner"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="font-semibold">
                    {formData.eventName || "Your Event"}
                  </h4>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3">
                <div className="text-muted-foreground flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formData.startDate
                    ? new Date(formData.startDate).toLocaleDateString()
                    : "Date TBD"}
                </div>
                <div className="text-muted-foreground flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  {formData.location || "Location TBD"}
                </div>
                <div className="text-muted-foreground flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  {formData.capacity === "Limited"
                    ? "Limited Capacity"
                    : "Unlimited Capacity"}
                </div>
              </div>

              {/* Engagement Features */}
              <div className="border-t pt-3">
                <p className="text-muted-foreground mb-2 text-xs">
                  Event Features:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.enableRaffles && (
                    <div className="bg-primary/10 text-primary flex items-center rounded px-2 py-1 text-xs">
                      <Gift className="mr-1 h-3 w-3" />
                      Live Raffles
                    </div>
                  )}
                  {formData.enableTrivia && (
                    <div className="bg-primary/10 text-primary flex items-center rounded px-2 py-1 text-xs">
                      <Gamepad2 className="mr-1 h-3 w-3" />
                      Interactive Trivia
                    </div>
                  )}
                  {formData.autoDeliverPOAPs && (
                    <div className="bg-primary/10 text-primary flex items-center rounded px-2 py-1 text-xs">
                      <Award className="mr-1 h-3 w-3" />
                      POAP Rewards
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
