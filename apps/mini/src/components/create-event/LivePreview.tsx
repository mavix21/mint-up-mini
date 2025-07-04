import { useState } from "react";
import { Award, Calendar, Gamepad2, Gift, MapPin, Users } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mint-up/ui/components/accordion";

import EventCard from "../EventCard";
import EventQuickViewDialog from "../EventQuickViewDialog";
import EventTicketCard from "../EventTicketCard";
import PreviewEventCard from "./PreviewEventCard";

interface LivePreviewProps {
  currentStep: number;
  formData: any;
}
const LivePreview = ({ currentStep, formData }: LivePreviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        ? formatDate(formData.startDate).split(" ")[0] || "MAY"
        : "MAY",
      day: formData.startDate
        ? formatDate(formData.startDate).split(" ")[1] || "18"
        : "18",
    },
    image:
      formData.selectedImage ||
      "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
    attendeeCount: 22,
    location: formData.location || "San Francisco, CA",
  };

  // Create event data for the dialog using form data
  const eventForDialog = {
    id: 1,
    title: formData.eventName || "Your Event Title",
    date: formData.startDate
      ? new Date(formData.startDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Date TBD",
    location: formData.location || "Location TBD",
    image:
      formData.selectedImage ||
      "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
    attendeeCount: 22,
  };
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentStep === 1) {
      setIsDialogOpen(true);
    }
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <div className="sticky top-20">
        <div className="bg-card rounded-lg border px-4 py-6 shadow-sm">
          <h3 className="text-foreground mb-4 text-lg font-semibold">
            Live Preview
          </h3>

          {currentStep === 1 && (
            <div>
              {/* Event Card Preview */}
              <PreviewEventCard
                eventData={mockEventData}
                onClick={handleCardClick}
              />
            </div>
          )}

          {currentStep === 2 && (
            <Accordion type="single" collapsible defaultValue="nft-ticket">
              <AccordionItem value="event-card">
                <AccordionTrigger className="text-sm font-medium">
                  Event Card Preview
                </AccordionTrigger>
                <AccordionContent>
                  <PreviewEventCard
                    eventData={mockEventData}
                    onClick={handleCardClick}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="nft-ticket" className="border-b-0">
                <AccordionTrigger className="text-sm font-medium">
                  NFT Ticket Preview
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-center">
                    <EventTicketCard
                      eventName={formData.eventName || "Web3 Developer Meetup"}
                      selectedImage={
                        formData.ticketArtwork || formData.selectedImage
                      }
                      eventDate={formData.startDate}
                      location={formData.location || "San Francisco"}
                      nftName={
                        formData.nftName ||
                        formData.eventName ||
                        "Web3 Developer Meetup"
                      }
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Event Card */}
              <div>
                <h4 className="text-foreground mb-3 text-sm font-medium">
                  Event Card
                </h4>
                <PreviewEventCard
                  eventData={mockEventData}
                  onClick={handleCardClick}
                />
              </div>

              {/* NFT Ticket */}
              <div>
                <h4 className="text-foreground mb-3 text-sm font-medium">
                  NFT Ticket
                </h4>
                <div className="flex justify-center">
                  <div className="origin-center scale-75">
                    <EventTicketCard
                      eventName={formData.eventName || "Web3 Developer Meetup"}
                      selectedImage={
                        formData.ticketArtwork || formData.selectedImage
                      }
                      eventDate={formData.startDate}
                      location={formData.location || "San Francisco"}
                      nftName={
                        formData.nftName ||
                        formData.eventName ||
                        "Web3 Developer Meetup"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isDialogOpen && (
        <EventQuickViewDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          event={eventForDialog}
        />
      )}
    </>
  );
};
export default LivePreview;
