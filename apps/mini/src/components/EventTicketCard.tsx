import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import QRCode from "qrcode";

import { Button } from "@mint-up/ui/components/button";
import { Card } from "@mint-up/ui/components/card";

interface EventTicketCardProps {
  eventName?: string;
  selectedImage?: string | null;
  eventDate?: string;
  location?: string;
  nftName?: string;
  onMintClick?: () => void;
}

const EventTicketCard = ({
  eventName = "Web3 Developer Meetup",
  selectedImage,
  eventDate,
  location = "San Francisco",
  nftName,
  onMintClick,
}: EventTicketCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  useEffect(() => {
    // Generate QR code for the ticket
    const generateQRCode = async () => {
      try {
        const qrData = `${window.location.origin}/ticket/${eventName.replace(/\s+/g, "-").toLowerCase()}`;
        const dataUrl = await QRCode.toDataURL(qrData, {
          width: 200,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [eventName]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="perspective-1000 h-96 w-80">
      <div className="relative h-full w-full transition-all duration-300 hover:-translate-y-3">
        <Card
          className={`transform-style-preserve-3d relative h-full w-full cursor-pointer transition-transform duration-700 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of ticket */}
          <div
            className="backface-hidden absolute inset-0 h-full w-full"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="from-primary/10 via-background to-accent/20 border-border relative h-full w-full overflow-hidden rounded-2xl border bg-gradient-to-br">
              {/* Ticket notches */}
              <div className="bg-background absolute left-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 rounded-r-full"></div>
              <div className="bg-background absolute right-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 rounded-l-full"></div>

              {/* Main Image - Almost entire ticket */}
              <div className="from-primary/20 to-accent/30 relative h-80 overflow-hidden bg-gradient-to-br">
                {selectedImage ? (
                  <Image
                    width={100}
                    height={100}
                    src={selectedImage}
                    alt={eventName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="from-primary via-primary/80 to-accent flex h-full w-full items-center justify-center bg-gradient-to-br">
                    <span className="text-primary-foreground text-4xl font-bold">
                      NFT
                    </span>
                  </div>
                )}
              </div>

              {/* Event Title at bottom */}
              <div className="from-background/90 absolute bottom-0 left-0 right-0 bg-gradient-to-t to-transparent px-4 py-4">
                <h3 className="text-foreground text-center text-lg font-bold leading-tight">
                  {nftName || eventName}
                </h3>
              </div>
            </div>
          </div>

          {/* Back of ticket */}
          <div className="backface-hidden rotate-y-180 absolute inset-0 h-full w-full">
            <div className="from-primary/10 via-background to-accent/20 border-border relative h-full w-full overflow-hidden rounded-2xl border bg-gradient-to-br">
              {/* Header */}
              <div className="border-border/40 border-b border-dashed py-4 text-center">
                <h3 className="text-foreground text-lg font-bold">
                  Scan QR Code
                </h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  Present at event entrance
                </p>
              </div>

              {/* QR Code */}
              <div className="flex flex-1 items-center justify-center py-6">
                {qrCodeDataUrl && (
                  <div className="rounded-lg bg-white p-3">
                    <Image
                      width={100}
                      height={100}
                      src={qrCodeDataUrl}
                      alt="Ticket QR Code"
                      className="h-32 w-32"
                    />
                  </div>
                )}
              </div>

              {/* Event Info */}
              <div className="border-border/40 border-t border-dashed p-4">
                <h4 className="text-foreground mb-3 text-center text-sm font-bold">
                  {nftName || eventName}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1 font-medium">
                      Attendee
                    </p>
                    <p className="text-foreground font-semibold">John Doe</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 font-medium">
                      Date
                    </p>
                    <p className="text-foreground font-semibold">
                      {formatDate(eventDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 font-medium">
                      Location
                    </p>
                    <p className="text-foreground truncate font-semibold">
                      {location || "TBD"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 font-medium">
                      Time
                    </p>
                    <p className="text-foreground font-semibold">
                      {formatTime(eventDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ticket notches */}
              <div className="bg-background absolute left-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 rounded-r-full"></div>
              <div className="bg-background absolute right-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 rounded-l-full"></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EventTicketCard;
