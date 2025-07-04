import {
  Asterisk,
  Building,
  Calendar,
  Globe,
  Smile,
  Users,
} from "lucide-react";

import { Button } from "@mint-up/ui/components/button";

import EventTicketCard from "./EventTicketCard";

const HeroSection = () => {
  return (
    <section className="container relative mx-auto overflow-hidden px-8 py-16">
      {/* Background geometric shapes - visible but behind content */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Globe icon - top left corner */}
        <div className="absolute left-4 top-8 opacity-[0.08]">
          <Globe className="text-foreground h-24 w-24 stroke-[0.5]" />
        </div>

        {/* Smile icon - top right corner */}
        <div className="absolute right-4 top-4 opacity-[0.1]">
          <Smile className="text-foreground h-16 w-16 stroke-[0.5]" />
        </div>

        {/* Large asterisk - far left */}
        <div className="absolute -left-8 top-1/4 opacity-[0.06]">
          <Asterisk className="text-foreground h-32 w-32 stroke-[0.5]" />
        </div>

        {/* Small asterisk - far bottom right */}
        <div className="absolute bottom-8 right-2 opacity-[0.12]">
          <Asterisk className="text-foreground h-12 w-12 stroke-[0.5]" />
        </div>

        {/* Globe - bottom left, outside content area */}
        <div className="absolute bottom-4 left-2 opacity-[0.08]">
          <Globe className="text-foreground h-14 w-14 stroke-[0.5]" />
        </div>

        {/* Smile - far right edge */}
        <div className="absolute -right-4 top-2/3 opacity-[0.06]">
          <Smile className="text-foreground h-20 w-20 stroke-[0.5]" />
        </div>

        {/* Additional subtle asterisk - top center edge */}
        <div className="absolute -top-4 left-1/3 opacity-[0.06]">
          <Asterisk className="w-18 h-18 text-foreground stroke-[0.5]" />
        </div>
      </div>

      {/* Main content with higher z-index to ensure it stays on top */}
      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-primary h-px w-12"></div>
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                The Complete Web3 Event Experience
              </span>
            </div>

            <h1 className="text-foreground text-5xl font-bold leading-tight lg:text-6xl">
              Create events that{" "}
              <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
                connect
              </span>
              , transforming the entire{" "}
              <span className="relative">
                experience
                <div className="from-primary to-primary/70 absolute -bottom-2 left-0 right-0 h-1 rounded bg-gradient-to-r"></div>
              </span>
              .
            </h1>

            <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
              From NFT tickets and POAPs to live raffles. Mint Up! is the
              all-in-one platform to build and energize your community, one
              event at a time.
            </p>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transform rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-200 hover:scale-105">
            Create Your First Event
          </Button>

          <div className="flex items-center space-x-12 py-[8px] pt-8">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <Calendar className="text-primary h-6 w-6" />
              </div>
              <div className="text-foreground mb-1 text-3xl font-bold">
                1.5K+
              </div>
              <div className="text-muted-foreground text-sm">
                Events Created
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <Users className="text-primary h-6 w-6" />
              </div>
              <div className="text-foreground mb-1 text-3xl font-bold">
                50K+
              </div>
              <div className="text-muted-foreground text-sm">Attendees</div>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <Building className="text-primary h-6 w-6" />
              </div>
              <div className="text-foreground mb-1 text-3xl font-bold">
                100+
              </div>
              <div className="text-muted-foreground text-sm">Communities</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-center">
          <EventTicketCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
