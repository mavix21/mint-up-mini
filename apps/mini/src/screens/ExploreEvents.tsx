import { Search } from "lucide-react";

import { Input } from "@mint-up/ui/components/input";

import EventFilters from "../components/EventFilters";
import EventsGrid from "../components/EventsGrid";

const ExploreEvents = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header and Discovery Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
            Explore Events
          </h1>
          <div className="relative mx-auto max-w-2xl">
            <Search className="text-muted-foreground absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search by event name, community, or topic..."
              className="bg-card border-border h-12 pl-12 text-base"
            />
          </div>
        </div>

        {/* Main Content Area - Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filter Panel - Left Column */}
          <div className="lg:col-span-1">
            <EventFilters />
          </div>

          {/* Events Grid - Right Column */}
          <div className="lg:col-span-3">
            <EventsGrid />
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
export default ExploreEvents;
