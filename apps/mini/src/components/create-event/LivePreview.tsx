import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mint-up/ui/components/accordion";

import type {
  EventFormValues,
  TicketTemplate,
} from "../../lib/schemas/eventForm";
import EventQuickViewDialog from "../EventQuickViewDialog";
import EventTicketCard from "../EventTicketCard";
import PreviewEventCard from "./PreviewEventCard";

interface LivePreviewProps {
  currentStep: number;
  formData: EventFormValues;
}

const LivePreview = ({ currentStep, formData }: LivePreviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);

  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to format location from the new object structure
  const formatLocation = (location: EventFormValues["location"]) => {
    if (location.type === "online") {
      return "Online Event";
    }

    return location.address ?? "In-Person Event";
  };

  const mockEventData = {
    id: 1,
    title: (formData.name || formData.eventName) ?? "Your Event Title",
    price:
      formData.ticketTemplates[0]?.price.type === "free" ? "FREE" : "$25.00",
    date: {
      month: formData.startDate
        ? (formatDate(formData.startDate).split(" ")[0] ?? "MAY")
        : "MAY",
      day: formData.startDate
        ? (formatDate(formData.startDate).split(" ")[1] ?? "18")
        : "18",
    },
    image:
      formData.selectedImage ??
      "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
    attendeeCount: 22,
    location: formatLocation(formData.location),
  };

  // Create event data for the dialog using form data
  const eventForDialog = {
    id: 1,
    title: (formData.name || formData.eventName) ?? "Your Event Title",
    date: formData.startDate
      ? new Date(formData.startDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Date TBD",
    location: formatLocation(formData.location),
    image:
      formData.selectedImage ??
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

  // Render ticket stack for multiple ticket types
  const renderTicketStack = () => {
    const ticketTemplates = formData.ticketTemplates;

    if (ticketTemplates.length === 0) {
      return (
        <div className="flex justify-center">
          <div className="text-muted-foreground text-center">
            <p className="text-sm">No tickets created yet</p>
            <p className="text-xs">Add ticket types to see preview</p>
          </div>
        </div>
      );
    }

    // Handle cycling
    const total = ticketTemplates.length;
    const showIndex = ((currentTicketIndex % total) + total) % total;
    const handlePrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentTicketIndex((prev) => (prev - 1 + total) % total);
    };
    const handleNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentTicketIndex((prev) => (prev + 1) % total);
    };

    return (
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          height: `${384 + (ticketTemplates.length - 1) * 8}px`,
          width: "20rem",
        }}
      >
        {/* Card Deck */}
        <div className="relative flex h-full w-full items-center justify-center">
          {ticketTemplates.map((ticket: TicketTemplate, idx: number) => {
            // Calculate deck position: 0 = top, 1 = next, ...
            const deckPos = (idx - showIndex + total) % total;
            // Only render up to 3 cards for performance/clarity
            if (deckPos > 2 && total > 3) return null;
            const offsetY = deckPos * 16; // px
            const scale = 1 - deckPos * 0.06;
            const z = 10 - deckPos;
            const opacity = deckPos === 0 ? 1 : 0.7 - deckPos * 0.2;
            // Add rotation for stacked cards
            let rotation = 0;
            if (deckPos === 1) rotation = -4;
            if (deckPos === 2) rotation = 4;
            return (
              <div
                key={ticket.id}
                className="absolute left-0 right-0 mx-auto transition-all duration-300"
                style={{
                  top: `${offsetY}px`,
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  zIndex: z,
                  opacity,
                  width: "100%",
                  pointerEvents: deckPos === 0 ? "auto" : "none",
                }}
              >
                <EventTicketCard
                  eventName={
                    (formData.name || formData.eventName) ?? "Your Event"
                  }
                  selectedImage={ticket.nft.image ?? formData.selectedImage}
                  eventDate={formData.startDate}
                  location={formatLocation(formData.location)}
                  nftName={
                    ticket.name ||
                    formData.name ||
                    formData.eventName ||
                    "Your Event"
                  }
                />
                {/* Navigation Buttons on top card */}
                {deckPos === 0 && total > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous Ticket"
                      onClick={handlePrev}
                      className="bg-card border-border hover:bg-accent absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border p-2 shadow transition-colors"
                      style={{ marginLeft: "-2.5rem" }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next Ticket"
                      onClick={handleNext}
                      className="bg-card border-border hover:bg-accent absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border p-2 shadow transition-colors"
                      style={{ marginRight: "-2.5rem" }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render single ticket preview (for backward compatibility)
  const renderSingleTicket = () => {
    const firstTicket = formData.ticketTemplates?.[0];

    return (
      <div className="flex justify-center">
        <EventTicketCard
          eventName={formData.name || formData.eventName || "Your Event"}
          selectedImage={firstTicket?.nft.image || formData.selectedImage}
          eventDate={formData.startDate}
          location={formatLocation(formData.location)}
          nftName={
            firstTicket?.name ||
            formData.name ||
            formData.eventName ||
            "Your Event"
          }
        />
      </div>
    );
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
                  NFT Tickets Preview
                </AccordionTrigger>
                <AccordionContent className="mx-auto">
                  {renderTicketStack()}
                </AccordionContent>
              </AccordionItem>

              {formData.poapTemplate && (
                <AccordionItem value="poap" className="border-b-0">
                  <AccordionTrigger className="text-sm font-medium">
                    POAP Preview
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-center">
                      <EventTicketCard
                        eventName={
                          formData.name || formData.eventName || "Your Event"
                        }
                        selectedImage={formData.poapTemplate.nft.image}
                        eventDate={formData.startDate}
                        location={formatLocation(formData.location)}
                        nftName={formData.poapTemplate.name}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
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

              {/* NFT Tickets */}
              <div>
                <h4 className="text-foreground mb-3 text-sm font-medium">
                  NFT Tickets
                </h4>
                <div className="origin-center scale-75">
                  {renderTicketStack()}
                </div>
              </div>

              {/* POAP */}
              {formData.poapTemplate && (
                <div>
                  <h4 className="text-foreground mb-3 text-sm font-medium">
                    POAP
                  </h4>
                  <div className="flex justify-center">
                    <div className="origin-center scale-75">
                      <EventTicketCard
                        eventName={
                          formData.name || formData.eventName || "Your Event"
                        }
                        selectedImage={formData.poapTemplate.nft.image}
                        eventDate={formData.startDate}
                        location={formatLocation(formData.location)}
                        nftName={formData.poapTemplate.name}
                      />
                    </div>
                  </div>
                </div>
              )}
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
