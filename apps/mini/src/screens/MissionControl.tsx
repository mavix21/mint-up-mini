import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Copy,
  DoorOpen,
  ExternalLink,
  Eye,
  MapPin,
  Plus,
  RotateCcw,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@mint-up/ui/components/avatar";
import { Badge } from "@mint-up/ui/components/badge";
import { Button } from "@mint-up/ui/components/button";
import { Card } from "@mint-up/ui/components/card";
import { Checkbox } from "@mint-up/ui/components/checkbox";
import { Progress } from "@mint-up/ui/components/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mint-up/ui/components/select";
import { Switch } from "@mint-up/ui/components/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mint-up/ui/components/tabs";
import { Textarea } from "@mint-up/ui/components/textarea";

import EventTicketCard from "../components/EventTicketCard";

const MissionControl = ({
  eventId,
  onBack,
}: {
  eventId: string;
  onBack: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [castText, setCastText] = useState(
    "Only 24 hours left to mint your ticket for our Web3 Founders Meetup! Don't miss out on the future. 🚀",
  );
  const [isFrameAttached, setIsFrameAttached] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState("web3-events");
  const [selectedAudience, setSelectedAudience] = useState("public");

  // Mock data based on the requirements
  const eventData = {
    eventName: "_Test_",
    eventPageUrl: "https://mintup.xyz/test-event",
    asset: {
      nftTicketData: {
        name: "_Test_",
        imageUrl: "/lovable-uploads/4b2dc3f1-b825-4c03-bcb4-8801b06e3c76.png",
        location: "UPC - Campus San Miguel",
        eventDate: "2025-07-25T12:30:00Z",
      },
      poapData: {
        name: "Test POAP",
        imageUrl: "/lovable-uploads/ef0b150b-c43f-45d9-bc17-5798b9568c00.png",
      },
    },
    onChainMetrics: {
      mints: 128,
      capacity: 200,
      uniqueWallets: 97,
      totalVolume: "0.5 ETH",
      contractAddress: "0x1234...abcd",
    },
    logistics: {
      date: "Friday, July 4",
      time: "12:30 PM - 2:00 PM GMT-5",
      location: "UPC - Campus San Miguel",
      address: "Av. de la Marina 2810, San Miguel 15087, Peru",
    },
    hosts: [
      {
        name: "Marcelo",
        email: "marcevizcarra2109@email.com",
        role: "Creator",
      },
    ],
    visibility: {
      status: "Public",
      listedOn: "Your Personal Calendar",
    },
  };

  const automationFlows = [
    {
      id: "auto-001",
      title: "Pre-Event Reminder",
      description:
        "Casts a reminder 1 hour before the event begins, mentioning all registered attendees.",
      isEnabled: true,
      icon: Clock,
    },
    {
      id: "auto-002",
      title: "'Doors Open' Announcement",
      description:
        "Casts automatically when the event starts, encouraging guests to check-in with their NFT ticket.",
      isEnabled: true,
      icon: DoorOpen,
    },
    {
      id: "auto-003",
      title: "Post-Event POAP Announcement",
      description:
        "Casts 1 hour after the event ends, notifying attendees that their POAP has been delivered.",
      isEnabled: false,
      icon: Star,
    },
  ];

  const POAPPreviewCard = () => (
    <div className="from-primary/10 via-background to-accent/20 border-border relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br">
      {/* Ticket notches */}
      <div className="bg-background absolute left-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 rounded-r-full"></div>
      <div className="bg-background absolute right-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 rounded-l-full"></div>

      {/* POAP Image */}
      <div className="from-accent/20 to-primary/30 relative h-80 overflow-hidden bg-gradient-to-br">
        <Image
          width={100}
          height={100}
          src={eventData.asset.poapData.imageUrl}
          alt="POAP Preview"
          className="h-full w-full object-cover"
        />
      </div>

      {/* POAP Title at bottom */}
      <div className="from-background/90 absolute bottom-0 left-0 right-0 bg-gradient-to-t to-transparent px-4 py-4">
        <h3 className="text-foreground text-center text-lg font-bold leading-tight">
          {eventData.asset.poapData.name}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        {/* Botón para volver */}
        <button onClick={onBack} className="text-primary mb-4 underline">
          ← Back to My Events
        </button>
        {/* Page Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-foreground text-4xl font-bold">
            {eventData.eventName}
          </h1>
          <Button variant="outline" size="sm" className="gap-2">
            Event Page <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-border mb-12 overflow-x-auto border-b">
            <TabsList className="h-auto w-max min-w-full flex-nowrap justify-start rounded-none bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-primary mr-8 whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="attendees"
                className="data-[state=active]:border-primary mr-8 whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 py-3"
              >
                Holder Hub
              </TabsTrigger>
              <TabsTrigger
                value="registration"
                className="data-[state=active]:border-primary mr-8 whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 py-3"
              >
                Registration
              </TabsTrigger>
              <TabsTrigger
                value="engagement"
                className="data-[state=active]:border-primary mr-8 whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 py-3"
              >
                Engagement
              </TabsTrigger>
              <TabsTrigger
                value="farcaster"
                className="data-[state=active]:border-primary mr-8 whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 py-3"
              >
                Farcaster Hub
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:border-primary whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 py-3"
              >
                Insights
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-0">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Left Panel */}
              <div className="lg:col-span-5">
                <div className="space-y-6">
                  {/* Interactive Asset Preview */}
                  <div className="relative">
                    <div className="perspective-1000 flex w-full justify-center">
                      <div className="relative h-96 w-80">
                        <div
                          className={`transform-style-preserve-3d relative h-full w-full cursor-pointer transition-transform duration-700 ${
                            isFlipped ? "rotate-y-180" : ""
                          }`}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Front Face - NFT Ticket */}
                          <div
                            className="backface-hidden absolute inset-0 h-full w-full"
                            style={{ backfaceVisibility: "hidden" }}
                          >
                            <EventTicketCard
                              eventName={eventData.asset.nftTicketData.name}
                              selectedImage={
                                eventData.asset.nftTicketData.imageUrl
                              }
                              eventDate={
                                eventData.asset.nftTicketData.eventDate
                              }
                              location={eventData.asset.nftTicketData.location}
                            />
                          </div>

                          {/* Back Face - POAP Preview */}
                          <div
                            className="backface-hidden rotate-y-180 absolute inset-0 h-full w-full"
                            style={{ backfaceVisibility: "hidden" }}
                          >
                            <POAPPreviewCard />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Flip Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-4 h-8 w-8"
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button size="lg" className="w-full">
                    Edit Experience
                  </Button>
                </div>
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-7">
                <div className="space-y-6">
                  {/* Quick Actions Bar */}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <div className="bg-primary h-4 w-4 rounded-full" />
                      Airdrop Tickets
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <div className="bg-accent h-4 w-4 rounded-full" />
                      Create Raffle
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <div className="bg-secondary h-4 w-4 rounded-full" />
                      Share on Farcaster
                    </Button>
                  </div>

                  {/* On-Chain Hub Card */}
                  <Card className="p-6">
                    <h3 className="text-foreground mb-4 text-lg font-semibold">
                      On-Chain Hub
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Mints
                          </span>
                          <span className="text-foreground text-sm font-medium">
                            {eventData.onChainMetrics.mints} /{" "}
                            {eventData.onChainMetrics.capacity}
                          </span>
                        </div>
                        <Progress
                          value={
                            (eventData.onChainMetrics.mints /
                              eventData.onChainMetrics.capacity) *
                            100
                          }
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Unique Wallets
                          </p>
                          <p className="text-foreground text-xl font-bold">
                            {eventData.onChainMetrics.uniqueWallets}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Total Volume
                          </p>
                          <p className="text-foreground text-xl font-bold">
                            {eventData.onChainMetrics.totalVolume}
                          </p>
                        </div>
                      </div>

                      <div className="bg-muted flex items-center justify-between rounded-lg p-3">
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Event Contract
                          </p>
                          <p className="text-foreground font-mono text-sm">
                            {eventData.onChainMetrics.contractAddress}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* When & Where Card */}
                  <Card className="p-6">
                    <h3 className="text-foreground mb-4 text-lg font-semibold">
                      When & Where
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-muted-foreground h-4 w-4" />
                        <div>
                          <p className="text-foreground font-medium">
                            {eventData.logistics.date}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {eventData.logistics.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                        <div>
                          <p className="text-foreground font-medium">
                            {eventData.logistics.location}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {eventData.logistics.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Hosts Card */}
                  <Card className="p-6">
                    <h3 className="text-foreground mb-4 text-lg font-semibold">
                      Hosts
                    </h3>

                    <div className="space-y-4">
                      {eventData.hosts.map((host, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {host.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-foreground font-medium">
                              {host.name}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {host.email}
                            </p>
                          </div>
                          <Badge variant="secondary">{host.role}</Badge>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Host
                      </Button>
                    </div>
                  </Card>

                  {/* Visibility Card */}
                  <Card className="p-6">
                    <h3 className="text-foreground mb-4 text-lg font-semibold">
                      Visibility & Discovery
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Eye className="text-muted-foreground h-4 w-4" />
                        <div>
                          <p className="text-foreground font-medium">
                            {eventData.visibility.status}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Listed on {eventData.visibility.listedOn}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Change Visibility
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Transfer
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attendees" className="space-y-8">
            {/* At a Glance Summary */}
            <div className="space-y-6">
              <h2 className="text-foreground text-2xl font-semibold">
                At a Glance
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Event Capacity
                    </span>
                    <span className="text-foreground text-sm font-medium">
                      127 / 150
                    </span>
                  </div>
                  <Progress value={84.7} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-foreground text-2xl font-bold">127</p>
                    <p className="text-muted-foreground text-sm">
                      Minted Tickets
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground text-2xl font-bold">85</p>
                    <p className="text-muted-foreground text-sm">Checked In</p>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground text-2xl font-bold">3</p>
                    <p className="text-muted-foreground text-sm">
                      Pending Approval
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Actions Bar */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Airdrop Tickets
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Check In Guests
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                View Holder List
              </Button>
            </div>

            {/* Holder List Section */}
            <div className="space-y-6">
              <h2 className="text-foreground text-2xl font-semibold">
                Holder List
              </h2>

              {/* List Toolbar */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by name, wallet address, or ENS..."
                    className="border-border text-foreground bg-background focus:ring-primary w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="waitlist">Waitlist</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Holder Table */}
              <div className="border-border overflow-hidden rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                          Holder
                        </th>
                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                          Ticket Type
                        </th>
                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                          Status
                        </th>
                        <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                          Mint Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-border hover:bg-muted/20 cursor-pointer border-t">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>AL</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-foreground font-medium">
                                Arantxa Larco
                              </p>
                              <p className="text-muted-foreground font-mono text-sm">
                                0x1A2b...c3D4
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-foreground text-sm">
                            General
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge variant="secondary">Waitlist</Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-muted-foreground text-sm">
                            May 10
                          </span>
                        </td>
                      </tr>
                      <tr className="border-border hover:bg-muted/20 cursor-pointer border-t">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-foreground font-medium">
                                Amgelica
                              </p>
                              <p className="text-muted-foreground font-mono text-sm">
                                0x5E6f...g7H8
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-foreground text-sm">VIP</span>
                        </td>
                        <td className="p-4">
                          <Badge variant="default">Checked In</Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-muted-foreground text-sm">
                            Apr 26
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="registration" className="py-12 text-center">
            <p className="text-muted-foreground">
              Registration tab content coming soon...
            </p>
          </TabsContent>

          <TabsContent value="engagement" className="py-12 text-center">
            <p className="text-muted-foreground">
              Engagement tab content coming soon...
            </p>
          </TabsContent>

          <TabsContent value="farcaster" className="space-y-8">
            {/* Cast Composer Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Composer Panel */}
              <div className="space-y-4">
                <h2 className="text-foreground text-2xl font-semibold">
                  Cast Composer
                </h2>

                <div className="space-y-4">
                  <Textarea
                    value={castText}
                    onChange={(e) => setCastText(e.target.value)}
                    placeholder="Cast an update to your community..."
                    className="min-h-32 resize-none"
                  />

                  {/* Composer Action Bar */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">
                        Channel:
                      </span>
                      <Select
                        value={selectedChannel}
                        onValueChange={setSelectedChannel}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web3-events">
                            web3-events
                          </SelectItem>
                          <SelectItem value="crypto-meetups">
                            crypto-meetups
                          </SelectItem>
                          <SelectItem value="nft-drops">nft-drops</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="attach-frame"
                        checked={isFrameAttached}
                        onCheckedChange={(checked) =>
                          setIsFrameAttached(checked === true)
                        }
                      />
                      <label
                        htmlFor="attach-frame"
                        className="text-muted-foreground text-sm"
                      >
                        Attach Event Frame
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">
                        Audience:
                      </span>
                      <Select
                        value={selectedAudience}
                        onValueChange={setSelectedAudience}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="followers">Followers</SelectItem>
                          <SelectItem value="channel">Channel Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="ml-auto">Cast</Button>
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="space-y-4">
                <h3 className="text-foreground text-lg font-semibold">
                  Live Preview
                </h3>

                <Card className="p-4">
                  {/* Cast Header */}
                  <div className="mb-3 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>EO</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-foreground font-medium">
                        Event Organizer
                      </p>
                      <p className="text-muted-foreground text-sm">
                        @organizer
                      </p>
                    </div>
                  </div>

                  {/* Cast Body */}
                  <p className="text-foreground mb-4">{castText}</p>

                  {/* Event Frame Preview - Only show when checkbox is checked */}
                  {isFrameAttached && (
                    <div className="border-border bg-muted/50 overflow-hidden rounded-lg border">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={eventData.asset.nftTicketData.imageUrl}
                          alt="Event Frame"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-foreground mb-2 font-semibold">
                          {eventData.eventName}
                        </h4>
                        <p className="text-muted-foreground mb-4 text-sm">
                          {eventData.logistics.location}
                        </p>
                        <Button size="sm" className="w-full">
                          Mint Ticket
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>

            {/* Automated Flows Section */}
            <div className="space-y-6">
              <h2 className="text-foreground text-2xl font-semibold">
                Automated Communication Flows
              </h2>

              <div className="space-y-4">
                {automationFlows.map((flow) => {
                  const IconComponent = flow.icon;
                  return (
                    <Card key={flow.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                            <IconComponent className="text-primary h-5 w-5" />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-foreground font-semibold">
                            {flow.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {flow.description}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          <Switch
                            checked={flow.isEnabled}
                            onCheckedChange={() => {
                              // Toggle logic would go here
                              console.log(`Toggling ${flow.id}`);
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="py-12 text-center">
            <p className="text-muted-foreground">
              Insights tab content coming soon...
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MissionControl;
