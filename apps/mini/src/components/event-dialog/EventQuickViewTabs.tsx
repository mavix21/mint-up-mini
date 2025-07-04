import { ScrollArea } from "@mint-up/ui/components/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mint-up/ui/components/tabs";

import EventTicketCard from "../EventTicketCard";

interface EventQuickViewTabsProps {
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    image: string;
    attendeeCount: number;
  };
  onMintTicketClick: () => void;
}
const EventQuickViewTabs = ({
  event,
  onMintTicketClick,
}: EventQuickViewTabsProps) => {
  return (
    <div className="min-h-0 flex-1 px-2 pb-6">
      <Tabs defaultValue="about" className="flex h-full w-full flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="about">About event</TabsTrigger>
          <TabsTrigger value="ticket">NFT Ticket</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-4 min-h-0 flex-1">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              <div className="prose prose-sm prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground max-w-none">
                <p className="text-base leading-relaxed">
                  {event.title} - Join us for this exciting event where
                  participants will have the opportunity to engage and connect.
                </p>

                <h3 className="text-foreground mb-3 mt-6 text-lg font-semibold">
                  Event Details
                </h3>
                <p className="text-base leading-relaxed">
                  This event will take place at {event.location} and promises to
                  be an engaging experience for all attendees.
                </p>

                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Connect with like-minded individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Participate in interactive activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Network with other attendees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      Receive exclusive NFT ticket as proof of attendance
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="ticket" className="mt-4 min-h-0 flex-1">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              {/* NFT Ticket Showcase */}
              <div className="bg-muted/30 flex justify-center rounded-lg p-6 py-[16px]">
                <EventTicketCard
                  eventName={event.title}
                  eventDate={event.date}
                  location={event.location}
                  nftName={`${event.title} NFT`}
                  selectedImage={event.image}
                  onMintClick={onMintTicketClick}
                />
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default EventQuickViewTabs;
