import { ScrollArea } from "@mint-up/ui/components/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mint-up/ui/components/tabs";

import EventTicketCard from "../EventTicketCard";

interface EventQuickViewTabsProps {
  onMintTicketClick: () => void;
}

const EventQuickViewTabs = ({ onMintTicketClick }: EventQuickViewTabsProps) => {
  return (
    <div className="min-h-0 flex-1 px-6 pb-6">
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
                  Join us for an exciting student builder's race where the next
                  generation of developers will showcase their skills in
                  building innovative applications using cutting-edge
                  technologies.
                </p>

                <h3 className="text-foreground mt-6 mb-3 text-lg font-semibold">
                  What to Expect
                </h3>
                <p className="text-base leading-relaxed">
                  This event brings together Dev3pack, EigenLayer, and Base
                  ecosystems to create a unique learning and building
                  experience. Students will have the opportunity to:
                </p>

                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Learn from industry experts and mentors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      Build real applications using modern Web3 technologies
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      Network with like-minded developers and entrepreneurs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Compete for prizes and recognition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      Get hands-on experience with EigenLayer and Base
                    </span>
                  </li>
                </ul>

                <h3 className="text-foreground mt-6 mb-3 text-lg font-semibold">
                  Who Should Attend
                </h3>
                <p className="text-base leading-relaxed">
                  Whether you're a beginner or an experienced developer, this
                  event offers something for everyone. Come ready to learn,
                  build, and connect with the future of Web3 development.
                </p>

                <h3 className="text-foreground mt-6 mb-3 text-lg font-semibold">
                  Event Schedule
                </h3>
                <div className="bg-muted/30 mt-4 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">14:00 - 14:30</span>
                      <span>Registration & Welcome</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">14:30 - 15:30</span>
                      <span>Keynote & Tech Overview</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">15:30 - 17:00</span>
                      <span>Building Session</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">17:00 - 17:30</span>
                      <span>Demo & Awards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="ticket" className="mt-4 min-h-0 flex-1">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              {/* NFT Ticket Showcase */}
              <div className="bg-muted/30 flex justify-center rounded-lg p-6 py-[16px]">
                <div className="transform transition-transform duration-300 hover:scale-105">
                  <EventTicketCard
                    eventName="The Student Builder's Race"
                    eventDate="2024-07-03"
                    location="Cannes, France"
                    nftName="Student Builder's Race NFT"
                    onMintClick={onMintTicketClick}
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventQuickViewTabs;
