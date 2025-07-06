"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Award, Clock, MapPin, Users } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import { Card } from "@mint-up/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mint-up/ui/components/tabs";

import MissionControl from "./MissionControl";

interface EventStats {
  mints?: number;
  capacity?: number | null;
  attendees?: number;
  poapsClaimed?: number;
}

interface Event {
  id: string;
  name: string;
  startTime: string;
  location: string;
  userRole: "host" | "attendee";
  nftTicketImageUrl?: string;
  poapImageUrl?: string | null;
  status?: string;
  stats?: EventStats;
}

export default function MyEvents() {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [managedEventId, setManagedEventId] = useState<string | null>(null);

  // Mock data based on the requirements
  const upcomingEvents: Event[] = [
    {
      id: "evt-001",
      name: "_Test_",
      startTime: "2025-07-25T12:30:00Z",
      location: "UPC - Campus San Miguel",
      userRole: "host",
      nftTicketImageUrl: "/placeholder.svg",
      stats: { mints: 0, capacity: null },
    },
    {
      id: "evt-002",
      name: "Web3 Founders Meetup",
      startTime: "2025-07-28T18:00:00Z",
      location: "Virtual",
      userRole: "attendee",
      nftTicketImageUrl: "/placeholder.svg",
      stats: {},
    },
  ];

  const pastEvents: Event[] = [
    {
      id: "evt-003",
      name: "ROAST 02",
      startTime: "2025-06-09T08:00:00Z",
      location: "Virtual",
      userRole: "attendee",
      status: "POAP_COLLECTED",
      poapImageUrl: "/placeholder.svg",
    },
    {
      id: "evt-004",
      name: "Trazabilidad digital Blockchain",
      startTime: "2025-06-04T18:30:00Z",
      location: "Home for the Elderly Santa Cruz",
      userRole: "attendee",
      status: "MISSED",
      poapImageUrl: null,
    },
    {
      id: "evt-005",
      name: "My First Hosted Event",
      startTime: "2025-06-02T18:00:00Z",
      location: "Lima, Peru",
      userRole: "host",
      status: "COMPLETED",
      poapImageUrl: "/placeholder.svg",
      stats: { attendees: 112, poapsClaimed: 105 },
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const groupEventsByDate = (events: Event[]) => {
    const grouped = events.reduce(
      (acc, event) => {
        const dateKey = event.startTime.split("T")[0] ?? event.startTime;
        acc[dateKey] ??= [];
        acc[dateKey].push(event);
        return acc;
      },
      {} as Record<string, Event[]>,
    );

    return Object.entries(grouped).sort(([a], [b]) =>
      activeTab === "upcoming" ? a.localeCompare(b) : b.localeCompare(a),
    );
  };

  const EventCard = ({
    event,
    isPast = false,
  }: {
    event: Event;
    isPast?: boolean;
  }) => {
    const imageUrl = isPast ? event.poapImageUrl : event.nftTicketImageUrl;
    const showDimmed = isPast && !event.poapImageUrl;

    return (
      <Card className="mb-4 p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              {formatTime(event.startTime)}
            </div>

            <h3 className="text-foreground mb-2 text-xl font-semibold">
              {event.name}
            </h3>

            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>

            {/* Status/Stats Row */}
            <div className="mb-4">
              {event.userRole === "host" && event.stats && (
                <div className="flex items-center gap-4 text-sm">
                  {isPast ? (
                    <>
                      {event.stats.attendees && (
                        <div className="text-muted-foreground flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Attendees: {event.stats.attendees}</span>
                        </div>
                      )}
                      {event.stats.poapsClaimed && (
                        <div className="text-muted-foreground flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>POAPs: {event.stats.poapsClaimed}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        Mints: {event.stats.mints ?? 0}
                        {event.stats.capacity
                          ? ` / ${event.stats.capacity}`
                          : ""}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {event.userRole === "attendee" && isPast && (
                <div className="text-sm">
                  {event.status === "POAP_COLLECTED" && (
                    <span className="text-primary font-medium">
                      POAP Collected
                    </span>
                  )}
                  {event.status === "MISSED" && (
                    <span className="text-muted-foreground">Event Missed</span>
                  )}
                </div>
              )}
            </div>

            <Button
              variant={event.userRole === "host" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (event.userRole === "host") {
                  setManagedEventId(event.id);
                }
              }}
            >
              {event.userRole === "host" ? "Manage Event" : "View Ticket"}
            </Button>
          </div>

          {/* Visual */}
          <div className="bg-muted flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={100}
                height={100}
                alt={isPast ? "POAP" : "NFT Ticket"}
                className={`h-full w-full object-cover ${showDimmed ? "opacity-40" : ""}`}
              />
            ) : (
              <div
                className={`from-muted to-muted-foreground/20 flex h-full w-full items-center justify-center bg-gradient-to-br ${showDimmed ? "opacity-40" : ""}`}
              >
                {isPast ? (
                  <Award className="text-muted-foreground h-8 w-8" />
                ) : (
                  <span className="text-muted-foreground text-xs font-medium">
                    NFT
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  if (managedEventId) {
    return (
      <MissionControl
        eventId={managedEventId}
        onBack={() => setManagedEventId(null)}
      />
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* <Navigation /> */}

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">My Events</h1>
          <p className="text-muted-foreground">
            Your digital experiences collection
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-0">
            {groupEventsByDate(upcomingEvents).map(([dateKey, events]) => (
              <div key={dateKey} className="relative">
                {/* Timeline connector - hidden on mobile */}
                <div className="bg-border absolute bottom-0 left-20 top-16 hidden w-px md:block" />
                {/* Mobile timeline connector */}
                <div className="bg-border absolute bottom-0 left-4 top-16 w-px md:hidden" />

                {/* Desktop layout */}
                <div className="mb-8 hidden gap-8 md:flex">
                  <div className="w-16 flex-shrink-0">
                    <div className="relative">
                      <div className="bg-primary absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 transform rounded-full" />
                      <div className="pr-2 text-right">
                        <div className="text-foreground text-sm font-medium">
                          {formatDate(events[0]?.startTime ?? "")}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {getDayOfWeek(events[0]?.startTime ?? "")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="mb-8 md:hidden">
                  <div className="relative pl-8">
                    <div className="bg-primary absolute -left-1.5 top-3 h-3 w-3 rounded-full" />
                    <div className="mb-4">
                      <div className="text-foreground text-sm font-medium">
                        {formatDate(events[0]?.startTime ?? "")}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {getDayOfWeek(events[0]?.startTime ?? "")}
                      </div>
                    </div>
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {upcomingEvents.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No upcoming events</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-0">
            {groupEventsByDate(pastEvents).map(([dateKey, events]) => (
              <div key={dateKey} className="relative">
                {/* Timeline connector - hidden on mobile */}
                <div className="bg-border absolute bottom-0 left-20 top-16 hidden w-px md:block" />
                {/* Mobile timeline connector */}
                <div className="bg-border absolute bottom-0 left-4 top-16 w-px md:hidden" />

                {/* Desktop layout */}
                <div className="mb-8 hidden gap-8 md:flex">
                  <div className="w-16 flex-shrink-0">
                    <div className="relative">
                      <div className="bg-muted-foreground absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 transform rounded-full" />
                      <div className="pr-2 text-right">
                        <div className="text-foreground text-sm font-medium">
                          {formatDate(events[0]?.startTime ?? "")}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {getDayOfWeek(events[0]?.startTime ?? "")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} isPast={true} />
                    ))}
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="mb-8 md:hidden">
                  <div className="relative pl-8">
                    <div className="bg-muted-foreground absolute -left-1.5 top-3 h-3 w-3 rounded-full" />
                    <div className="mb-4">
                      <div className="text-foreground text-sm font-medium">
                        {formatDate(events[0]?.startTime ?? "")}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {getDayOfWeek(events[0]?.startTime ?? "")}
                      </div>
                    </div>
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} isPast={true} />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {pastEvents.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No past events</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
