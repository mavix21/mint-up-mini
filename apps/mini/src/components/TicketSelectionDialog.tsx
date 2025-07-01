import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@mint-up/ui/components/dialog";
import { Label } from "@mint-up/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@mint-up/ui/components/radio-group";
import { ScrollArea } from "@mint-up/ui/components/scroll-area";

interface TicketSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  attendeeCount: number;
}

const TicketSelectionDialog = ({
  isOpen,
  onClose,
  eventTitle,
  attendeeCount,
}: TicketSelectionDialogProps) => {
  const [selectedTicket, setSelectedTicket] = useState("student-watch");

  const ticketOptions = [
    {
      id: "student-participant",
      type: "Student (race participant)",
      requirement: "Approval required",
      price: "Free",
    },
    {
      id: "student-watch",
      type: "Student (watch race)",
      requirement: "Approval required",
      price: "Free",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border flex max-h-[90vh] max-w-lg flex-col overflow-hidden p-0">
        {/* Close button */}
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {/* Scrollable Content Body */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-6 py-6">
            {/* Header */}
            <DialogHeader>
              <DialogTitle className="text-foreground text-xl leading-tight font-bold">
                Choose Your Ticket
              </DialogTitle>
              <p className="text-muted-foreground text-sm">{eventTitle}</p>
            </DialogHeader>

            {/* Registration Box */}
            <div className="space-y-4">
              <RadioGroup
                value={selectedTicket}
                onValueChange={setSelectedTicket}
                className="space-y-3"
              >
                {ticketOptions.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border-border hover:bg-muted/50 flex items-center space-x-3 rounded-lg border p-3 transition-colors"
                  >
                    <RadioGroupItem value={ticket.id} id={ticket.id} />
                    <Label
                      htmlFor={ticket.id}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-foreground font-medium">
                            {ticket.type}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {ticket.requirement}
                          </div>
                        </div>
                        <div className="text-primary text-lg font-bold">
                          {ticket.price}
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-auto w-full py-3 text-lg font-bold">
                Mint Ticket
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TicketSelectionDialog;
