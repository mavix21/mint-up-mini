import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
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
import { Textarea } from "@mint-up/ui/components/textarea";

import type { EventFormValues } from "../../lib/schemas/eventForm";
import ImageCropDialog from "./ImageCropDialog";

const EventDetailsStep = () => {
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  const { watch, setValue, control } = useFormContext<EventFormValues>();
  const selectedImage = watch("selectedImage");

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
    setValue("selectedImage", croppedImageUrl);
    setTempImageSrc(null);
  };

  const handleRemoveImage = () => {
    setValue("selectedImage", "");
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
        <FormField
          control={control}
          name="selectedImage"
          render={() => (
            <FormItem>
              <FormLabel>Event Image *</FormLabel>
              <p className="text-muted-foreground mb-2 text-sm">
                Upload a square image for your event (required)
              </p>

              {selectedImage ? (
                <div className="border-border relative h-32 w-32 overflow-hidden rounded-lg border-2 border-dashed">
                  <Image
                    width={100}
                    height={100}
                    src={selectedImage}
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
                    onClick={() =>
                      document.getElementById("imageUpload")?.click()
                    }
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Web3 Founders Summit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date & Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date & Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add physical address or virtual link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell everyone what your event is about..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
