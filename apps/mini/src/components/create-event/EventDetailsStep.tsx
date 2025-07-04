import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import { Input } from "@mint-up/ui/components/input";
import { Label } from "@mint-up/ui/components/label";
import { Textarea } from "@mint-up/ui/components/textarea";
import ImageCropDialog from "./ImageCropDialog";

interface EventDetailsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const EventDetailsStep = ({
  formData,
  updateFormData,
}: EventDetailsStepProps) => {
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

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
    updateFormData("selectedImage", croppedImageUrl);
    setTempImageSrc(null);
  };

  const handleRemoveImage = () => {
    updateFormData("selectedImage", null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-6 text-2xl font-semibold">
          Event Details
        </h2>
      </div>

      <div className="space-y-4">
        {/* Event Image - Mandatory */}
        <div>
          <Label className="text-foreground">Event Image *</Label>
          <p className="text-muted-foreground mb-2 text-sm">
            Upload a square image for your event (required)
          </p>

          {formData.selectedImage ? (
            <div className="border-border relative h-32 w-32 overflow-hidden rounded-lg border-2 border-dashed">
              <Image
                src={formData.selectedImage}
                alt="Event preview"
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
            </div>
          ) : (
            <div className="border-border rounded-lg border-2 border-dashed p-6 text-center">
              <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <p className="text-muted-foreground mb-2 text-sm">
                Click to upload an image
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                Choose File
              </Button>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="eventName" className="text-foreground">
            Event Name
          </Label>
          <Input
            id="eventName"
            placeholder="e.g., Web3 Founders Summit"
            value={formData.eventName}
            onChange={(e) => updateFormData("eventName", e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="startDate" className="text-foreground">
              Start Date & Time
            </Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => updateFormData("startDate", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-foreground">
              End Date & Time
            </Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => updateFormData("endDate", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location" className="text-foreground">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Add physical address or virtual link"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Tell everyone what your event is about..."
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            rows={4}
            className="mt-1"
          />
        </div>
      </div>

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

export default EventDetailsStep;
