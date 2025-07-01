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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-card border-border flex h-[90vh] max-h-[90vh] max-w-2xl flex-col overflow-hidden p-0">
          {/* Close button */}
          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Event Header */}
          <EventQuickViewHeader event={event} onImageClick={handleImageClick} />

          {/* Tabs Section */}
          <EventQuickViewTabs onMintTicketClick={handleMintTicketClick} />

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
          <ImageFocusOverlay
            isVisible={isImageFocused}
            imageUrl={event.image}
            onClose={handleImageFocusClose}
          />
        </DialogContent>
      </Dialog>

      <TicketSelectionDialog
        isOpen={isTicketSelectionOpen}
        onClose={() => setIsTicketSelectionOpen(false)}
        eventTitle="The Student Builder's Race | Dev3pack, EigenLayer, Base"
        attendeeCount={event.attendeeCount}
      />
    </>
  );
};

export default EventQuickViewDialog;
