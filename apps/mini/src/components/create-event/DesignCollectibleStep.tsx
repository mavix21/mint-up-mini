import { useState } from "react";
import { Image, Upload } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import { Input } from "@mint-up/ui/components/input";
import { Label } from "@mint-up/ui/components/label";
import { Textarea } from "@mint-up/ui/components/textarea";

interface DesignCollectibleStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const DesignCollectibleStep = ({
  formData,
  updateFormData,
}: DesignCollectibleStepProps) => {
  const [activeTab, setActiveTab] = useState("nft");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateFormData("selectedImage", e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          {/* Image Upload */}
          <div>
            <Label className="text-foreground">Ticket Artwork</Label>
            <div className="mt-1">
              {formData.selectedImage ? (
                <div className="relative">
                  <img
                    src={formData.selectedImage}
                    alt="Uploaded artwork"
                    className="h-48 w-full rounded-lg border object-cover"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => updateFormData("selectedImage", null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <label className="border-border hover:bg-muted/50 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="text-muted-foreground mb-4 h-8 w-8" />
                    <p className="text-muted-foreground mb-2 text-sm">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-muted-foreground text-xs">
                      PNG, JPG or GIF (MAX. 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="nftName" className="text-foreground">
              NFT Name
            </Label>
            <Input
              id="nftName"
              placeholder="e.g., Mint Up! Genesis Pass"
              value={formData.nftName}
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
          <Image className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h3 className="text-foreground mb-2 text-lg font-semibold">
            POAP Integration
          </h3>
          <p className="text-muted-foreground">
            POAP integration coming soon. Create memorable proof of attendance
            for your events.
          </p>
        </div>
      )}
    </div>
  );
};

export default DesignCollectibleStep;
