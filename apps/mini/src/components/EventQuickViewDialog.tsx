"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
} from "@mint-up/ui/components/dialog";

import EventQuickViewHeader from "./event-dialog/EventQuickViewHeader";
import EventQuickViewTabs from "./event-dialog/EventQuickViewTabs";
import ImageFocusOverlay from "./event-dialog/ImageFocusOverlay";
import TicketSelectionDialog from "./TicketSelectionDialog";

interface TicketType {
  id: string;
  name: string;
  price: string;
  requiresApproval: boolean;
}

interface EventQuickViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    image: string;
    attendeeCount: number;
    ticketTypes?: TicketType[];
  };
}
const EventQuickViewDialog = ({
  isOpen,
  onClose,
  event,
}: EventQuickViewDialogProps) => {
  const [isTicketSelectionOpen, setIsTicketSelectionOpen] = useState(false);
  const [isImageFocused, setIsImageFocused] = useState(false);
  const navigate = useRouter();
  const handleMintTicketClick = () => {
    setIsTicketSelectionOpen(true);
  };
  const handleImageClick = () => {
    setIsImageFocused(true);
  };
  const handleImageFocusClose = () => {
    setIsImageFocused(false);
  };
  const handleViewFullEventPage = () => {
    navigate.push(`/event/${event.id}`);
    onClose(); // Close the dialog when navigating
  };
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      // Reset all internal states when closing
      setIsTicketSelectionOpen(false);
      setIsImageFocused(false);
      onClose();
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="bg-card border-border flex h-[90vh] max-h-[90vh] max-w-2xl flex-col overflow-hidden p-4">
          {/* Close button */}
          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Event Header */}
          <EventQuickViewHeader event={event} onImageClick={handleImageClick} />

          {/* Tabs Section */}
          <EventQuickViewTabs
            event={event}
            onMintTicketClick={handleMintTicketClick}
          />

          {/* Dialog Footer */}
          <div className="px-6 pb-4 text-center">
            <button
              onClick={handleViewFullEventPage}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              View Full Event Page →
            </button>
          </div>

          {/* Image Focus Overlay - Inside dialog, positioned absolutely */}
          {isImageFocused && (
            <ImageFocusOverlay
              isVisible={isImageFocused}
              imageUrl={event.image}
              onClose={handleImageFocusClose}
            />
          )}
        </DialogContent>
      </Dialog>

      {isTicketSelectionOpen && (
        <TicketSelectionDialog
          isOpen={isTicketSelectionOpen}
          onClose={() => setIsTicketSelectionOpen(false)}
          eventTitle={event.title}
          attendeeCount={event.attendeeCount}
          ticketTypes={event.ticketTypes}
        />
      )}
    </>
  );
};
export default EventQuickViewDialog;
