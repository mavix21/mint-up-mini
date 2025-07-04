import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import { Label } from "@mint-up/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@mint-up/ui/components/radio-group";

import EventTicketCard from "../EventTicketCard";

const EventHeroSection = () => {
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
    <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
      {/* Left Column - Event Info */}
      <div className="space-y-6 lg:col-span-2">
        {/* Event Title */}
        <div className="space-y-3">
          <h1 className="text-foreground text-2xl font-bold leading-tight">
            The Student Builder's Race | Dev3pack, EigenLayer, Base
          </h1>

          {/* Event Info Row */}
          <div className="text-muted-foreground flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span>Thursday, July 3</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-primary h-4 w-4" />
              <span>Cannes, Provence-Alpes-Côte d'Azur</span>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            2:00 PM - 5:30 PM CEST
          </div>
        </div>

        {/* Registration Box */}
        <div className="bg-card border-border space-y-4 rounded-lg border p-4">
          <h2 className="text-foreground text-lg font-semibold">
            Registration
          </h2>
          <p className="text-muted-foreground text-sm">
            Welcome! Please choose your desired ticket type:
          </p>

          <RadioGroup
            value={selectedTicket}
            onValueChange={setSelectedTicket}
            className="space-y-2"
          >
            {ticketOptions.map((ticket) => (
              <div
                key={ticket.id}
                className="border-border hover:bg-muted/30 flex items-center space-x-3 rounded-lg border p-3 transition-colors"
              >
                <RadioGroupItem value={ticket.id} id={ticket.id} />
                <Label htmlFor={ticket.id} className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-foreground text-sm font-medium">
                        {ticket.type}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {ticket.requirement}
                      </div>
                    </div>
                    <div className="text-primary text-sm font-semibold">
                      {ticket.price}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full font-semibold">
            Request to Join
          </Button>
        </div>
      </div>

      {/* Right Column - NFT Ticket */}
      <div className="flex justify-center lg:justify-end">
        <div className="w-full max-w-[200px]">
          <EventTicketCard
            eventName="The Student Builder's Race"
            eventDate="2024-07-03"
            location="Cannes, France"
            nftName="Student Builder's Race NFT"
          />
        </div>
      </div>
    </section>
  );
};

export default EventHeroSection;
