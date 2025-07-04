import { useState } from "react";
import Image from "next/image";
import { Image as Img, Upload, X } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import { Input } from "@mint-up/ui/components/input";
import { Label } from "@mint-up/ui/components/label";
import { Textarea } from "@mint-up/ui/components/textarea";

import ImageCropDialog from "./ImageCropDialog";

interface DesignCollectibleStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const DesignCollectibleStep = ({
  formData,
  updateFormData,
}: DesignCollectibleStepProps) => {
  const [activeTab, setActiveTab] = useState("nft");
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  // Show ticket artwork or event image as fallback, but allow removal
  const showTicketArtwork = formData.ticketArtwork !== null;
  const displayImage = formData.ticketArtwork || formData.selectedImage;

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
    updateFormData("ticketArtwork", croppedImageUrl);
    setTempImageSrc(null);
  };

  const handleRemoveImage = () => {
    // Set to null to hide the ticket artwork section entirely
    updateFormData("ticketArtwork", null);
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

            {displayImage && formData.ticketArtwork ? (
              <div className="border-border relative h-48 w-48 overflow-hidden rounded-lg border-2 border-dashed">
                <Image
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
                  {formData.selectedImage
                    ? "Use event image or upload different artwork"
                    : "Click to upload ticket artwork"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (formData.selectedImage && !formData.ticketArtwork) {
                      updateFormData("ticketArtwork", formData.selectedImage);
                    } else {
                      document.getElementById("ticketImageUpload")?.click();
                    }
                  }}
                >
                  {formData.selectedImage && !formData.ticketArtwork
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

          <div>
            <Label htmlFor="nftName" className="text-foreground">
              NFT Name
            </Label>
            <Input
              id="nftName"
              placeholder="e.g., Mint Up! Genesis Pass"
              value={formData.nftName || formData.eventName || ""}
              onChange={(e) => updateFormData("nftName", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="nftDescription" className="text-foreground">
              NFT Description
            </Label>
            <Textarea
              id="nftDescription"
              placeholder="This will appear on marketplaces like OpenSea."
              value={formData.nftDescription}
              onChange={(e) => updateFormData("nftDescription", e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>
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
