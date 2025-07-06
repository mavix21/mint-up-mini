"use client";

import { useQuery } from "convex/react";

import { api } from "@mint-up/convex/_generated/api";
import { Button } from "@mint-up/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mint-up/ui/components/select";

import EventCard from "./EventCard";

const EventsGrid = () => {
  // Sample event data - in a real app this would come from an API
  // const events = [
  //   {
  //     id: 1,
  //     title: "Identity in Web3: Your Digital Passport",
  //     price: "$25.00",
  //     date: { month: "MAY", day: "18" },
  //     image: "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
  //     attendeeCount: 22,
  //     location: "San Francisco, CA",
  //   },
  //   {
  //     id: 2,
  //     title: "DeFi Summer: Liquidity Mining Workshop",
  //     price: "FREE",
  //     date: { month: "MAY", day: "22" },
  //     image: "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
  //     attendeeCount: 45,
  //     location: "Online",
  //   },
  //   {
  //     id: 3,
  //     title: "NFT Art Gallery Opening",
  //     price: "$15.00",
  //     date: { month: "MAY", day: "25" },
  //     image: "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
  //     attendeeCount: 67,
  //     location: "New York, NY",
  //   },
  //   {
  //     id: 4,
  //     title: "Web3 Gaming: The Future of Play",
  //     price: "$30.00",
  //     date: { month: "JUN", day: "02" },
  //     image: "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
  //     attendeeCount: 33,
  //     location: "Austin, TX",
  //   },
  //   {
  //     id: 5,
  //     title: "Smart Contract Security Audit",
  //     price: "$50.00",
  //     date: { month: "JUN", day: "08" },
  //     image: "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
  //     attendeeCount: 89,
  //     location: "Online",
  //   },
  //   {
  //     id: 6,
  //     title: "Community DAO Governance Meetup",
  //     price: "FREE",
  //     date: { month: "JUN", day: "12" },
  //     image: "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
  //     attendeeCount: 124,
  //     location: "Denver, CO",
  //   },
  // ];
  const convexEvents = useQuery(api.events.getEvents);

  // Transform Convex events to match EventCard expected format
  const events =
    convexEvents?.map((event) => ({
      id: parseInt(event._id.replace("events_", "")),
      title: event.name,
      price:
        event.ticketTemplates[0]?.price?.type === "free" ? "FREE" : "$25.00", // Default price
      date: {
        month: new Date(event.startDate)
          .toLocaleDateString("en-US", { month: "short" })
          .toUpperCase(),
        day: new Date(event.startDate).getDate().toString(),
      },
      image: event.image ? `/api/storage/${event.image}` : "/placeholder.svg",
      attendeeCount: event.ticketPurchases?.length || 0,
      location:
        event.location.type === "online" ? "Online" : event.location.address,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Grid Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing{" "}
          <span className="text-foreground font-semibold">{events.length}</span>{" "}
          Events
        </p>
        <Select defaultValue="recommended">
          <SelectTrigger className="bg-card border-border w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Sort by: Recommended</SelectItem>
            <SelectItem value="date">Sort by: Date</SelectItem>
            <SelectItem value="price">Sort by: Price</SelectItem>
            <SelectItem value="popularity">Sort by: Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="pt-8 text-center">
        <Button variant="outline" size="lg" className="px-8">
          Load More Events
        </Button>
      </div>
    </div>
  );
};

export default EventsGrid;
