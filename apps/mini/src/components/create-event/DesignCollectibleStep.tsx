import { useState } from "react";
import Image from "next/image";
import { Image as Img, Upload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@mint-up/ui/components/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mint-up/ui/components/form";
import { Input } from "@mint-up/ui/components/input";
import { Label } from "@mint-up/ui/components/label";
import { Textarea } from "@mint-up/ui/components/textarea";

import type { EventFormValues } from "../../lib/schemas/eventForm";
import ImageCropDialog from "./ImageCropDialog";

const DesignCollectibleStep = () => {
  const [activeTab, setActiveTab] = useState("nft");
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  const form = useFormContext<EventFormValues>();
  const { watch, setValue } = form;
  const selectedImage = watch("selectedImage");
  const ticketArtwork = watch("ticketArtwork");
  const eventName = watch("eventName");

  // Show ticket artwork or event image as fallback, but allow removal
  const showTicketArtwork = ticketArtwork !== null;
  const displayImage = ticketArtwork || selectedImage;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target?.result as string;
        setTempImageSrc(imageSrc);
        setIsCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    setValue("ticketArtwork", croppedImageUrl);
    setTempImageSrc(null);
  };

  const handleRemoveImage = () => {
    // Set to empty string to hide the ticket artwork section entirely
    setValue("ticketArtwork", "");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-6 text-2xl font-semibold">
          Design Your Collectible
        </h2>
      </div>

      {/* Tab Selector */}
      <div className="border-border flex border-b">
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "nft"
              ? "text-primary border-primary border-b-2"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("nft")}
        >
          NFT Ticket
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "poap"
              ? "text-primary border-primary border-b-2"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("poap")}
        >
          POAP
        </button>
      </div>

      {activeTab === "nft" && (
        <div className="space-y-4">
          {/* Ticket Artwork Upload */}
          <div>
            <Label className="text-foreground">Ticket Artwork</Label>
            <p className="text-muted-foreground mb-2 text-sm">
              Upload a square image for your NFT ticket (starts with your event
              image)
            </p>

            {displayImage && ticketArtwork ? (
              <div className="border-border relative h-48 w-48 overflow-hidden rounded-lg border-2 border-dashed">
                <Image
                  width={100}
                  height={100}
                  src={displayImage}
                  alt="Ticket artwork preview"
                  className="h-full w-full object-cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="bg-background/80 hover:bg-background absolute right-1 top-1 h-6 w-6 p-0"
                  onClick={handleRemoveImage}
                >
                  <X className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute bottom-2 left-2 text-xs"
                  onClick={() =>
                    document.getElementById("ticketImageUpload")?.click()
                  }
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="border-border rounded-lg border-2 border-dashed p-6 text-center">
                <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground mb-2 text-sm">
                  {selectedImage
                    ? "Use event image or upload different artwork"
                    : "Click to upload ticket artwork"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (selectedImage && !ticketArtwork) {
                      setValue("ticketArtwork", selectedImage);
                    } else {
                      document.getElementById("ticketImageUpload")?.click();
                    }
                  }}
                >
                  {selectedImage && !ticketArtwork
                    ? "Use Event Image"
                    : "Choose File"}
                </Button>
              </div>
            )}

            {/* Single input element outside the conditional */}
            <input
              id="ticketImageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <FormField
            control={form.control}
            name="nftName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFT Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Mint Up! Genesis Pass"
                    {...field}
                    value={field.value || eventName || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nftDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFT Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="This will appear on marketplaces like OpenSea."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {activeTab === "poap" && (
        <div className="py-12 text-center">
          <Img className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h3 className="text-foreground mb-2 text-lg font-semibold">
            POAP Integration
          </h3>
          <p className="text-muted-foreground">
            POAP integration coming soon. Create memorable proof of attendance
            for your events.
          </p>
        </div>
      )}

      {/* Image Crop Dialog */}
      {tempImageSrc && (
        <ImageCropDialog
          isOpen={isCropDialogOpen}
          onClose={() => {
            setIsCropDialogOpen(false);
            setTempImageSrc(null);
          }}
          imageSrc={tempImageSrc}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default DesignCollectibleStep;
