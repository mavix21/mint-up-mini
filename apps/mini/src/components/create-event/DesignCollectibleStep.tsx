import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@mint-up/ui/components/button";
import { Card, CardContent } from "@mint-up/ui/components/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mint-up/ui/components/form";
import { Input } from "@mint-up/ui/components/input";
import { Label } from "@mint-up/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mint-up/ui/components/select";
import { Switch } from "@mint-up/ui/components/switch";
import { Textarea } from "@mint-up/ui/components/textarea";

import type {
  EventFormValues,
  TicketTemplate,
} from "../../lib/schemas/eventForm";
import ImageCropDialog from "./ImageCropDialog";

const DesignCollectibleStep = () => {
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [croppingForTicketIndex, setCroppingForTicketIndex] = useState<
    number | null
  >(null);

  const form = useFormContext<EventFormValues>();
  const { watch, setValue } = form;
  const eventName = watch("name");
  const poapTemplate = watch("poapTemplate");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ticketTemplates",
  });

  const addTicketTemplate = () => {
    const newTicketTemplate: TicketTemplate = {
      id: Date.now().toString(),
      name: "",
      description: "",
      totalSupply: undefined,
      isApprovalRequired: false,
      price: { type: "free" },
      nft: {
        image: "",
        metadata: {},
      },
    };
    append(newTicketTemplate);
  };

  const removeTicketTemplate = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Auto-fill ticket names with eventName if empty
  useEffect(() => {
    if (eventName) {
      fields.forEach((field, index) => {
        const currentName = watch(`ticketTemplates.${index}.name`);
        if (!currentName) {
          setValue(`ticketTemplates.${index}.name`, eventName);
        }
      });
    }
  }, [eventName, fields, watch, setValue]);

  useEffect(() => {
    if (eventName && !poapTemplate?.name) {
      setValue("poapTemplate.name", eventName);
    }
  }, [eventName, poapTemplate?.name, setValue]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    ticketIndex?: number,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target?.result as string;
        setTempImageSrc(imageSrc);
        setCroppingForTicketIndex(ticketIndex ?? null);
        setIsCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    if (croppingForTicketIndex !== null) {
      setValue(
        `ticketTemplates.${croppingForTicketIndex}.nft.image`,
        croppedImageUrl,
      );
    } else if (poapTemplate) {
      setValue("poapTemplate.nft.image", croppedImageUrl);
    }
    setTempImageSrc(null);
    setCroppingForTicketIndex(null);
  };

  const handleRemoveImage = (ticketIndex?: number) => {
    if (ticketIndex !== undefined) {
      setValue(`ticketTemplates.${ticketIndex}.nft.image`, "");
    } else if (poapTemplate) {
      setValue("poapTemplate.nft.image", "");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-foreground mb-6 text-2xl font-semibold">
          Design Your Collectible
        </h2>
      </div>

      {/* Ticket Templates Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-lg font-semibold">NFT Tickets</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTicketTemplate}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Ticket Type
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="p-4">
              <CardContent className="space-y-4 p-0">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground font-medium">
                    Ticket {index + 1}
                  </Label>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTicketTemplate(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`ticketTemplates.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Ticket Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., General Admission"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`ticketTemplates.${index}.price.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Price Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`ticketTemplates.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what this ticket includes..."
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`ticketTemplates.${index}.totalSupply`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Total Supply</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Unlimited"
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(
                                value === "" ? undefined : parseInt(value),
                              );
                            }}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Show amount and currency only for paid tickets */}
                  {watch(`ticketTemplates.${index}.price.type`) === "paid" && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`ticketTemplates.${index}.price.amount`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Amount</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="0.00"
                                type="number"
                                min="0.01"
                                step="0.01"
                                {...field}
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`ticketTemplates.${index}.price.currency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Currency</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value || "USDC"}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="USDC">USDC</SelectItem>
                                <SelectItem value="ETH">ETH</SelectItem>
                                <SelectItem value="SOL">SOL</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Requires Approval</Label>
                    <p className="text-muted-foreground text-xs">
                      Manual approval for ticket purchases
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name={`ticketTemplates.${index}.isApprovalRequired`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* NFT Image Upload for this ticket */}
                <div>
                  <Label className="text-foreground">NFT Image *</Label>
                  <p className="text-muted-foreground mb-2 text-sm">
                    Upload a square image for this ticket's NFT
                  </p>

                  {watch(`ticketTemplates.${index}.nft.image`) ? (
                    <div className="border-border relative h-48 w-48 overflow-hidden rounded-lg border-2 border-dashed">
                      <Image
                        width={100}
                        height={100}
                        src={watch(`ticketTemplates.${index}.nft.image`)}
                        alt={`Ticket ${index + 1} NFT preview`}
                        className="h-full w-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="bg-background/80 hover:bg-background absolute right-1 top-1 h-6 w-6 p-0"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute bottom-2 left-2 text-xs"
                        onClick={() =>
                          document
                            .getElementById(`ticketImageUpload-${index}`)
                            ?.click()
                        }
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-border rounded-lg border-2 border-dashed p-6 text-center">
                      <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                      <p className="text-muted-foreground mb-2 text-sm">
                        Click to upload NFT image for this ticket
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document
                            .getElementById(`ticketImageUpload-${index}`)
                            ?.click()
                        }
                      >
                        Choose File
                      </Button>
                    </div>
                  )}

                  <input
                    id={`ticketImageUpload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* POAP Section */}
      <div className="space-y-4">
        <h3 className="text-foreground text-lg font-semibold">
          POAP (Proof of Attendance Protocol)
        </h3>

        {/* POAP Image Upload */}
        <div>
          <Label className="text-foreground">POAP Image *</Label>
          <p className="text-muted-foreground mb-2 text-sm">
            Upload a square image for your POAP (Proof of Attendance Protocol)
          </p>

          {poapTemplate?.nft.image ? (
            <div className="border-border relative h-48 w-48 overflow-hidden rounded-lg border-2 border-dashed">
              <Image
                width={100}
                height={100}
                src={poapTemplate.nft.image}
                alt="POAP preview"
                className="h-full w-full object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="bg-background/80 hover:bg-background absolute right-1 top-1 h-6 w-6 p-0"
                onClick={() => handleRemoveImage()}
              >
                <X className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute bottom-2 left-2 text-xs"
                onClick={() =>
                  document.getElementById("poapImageUpload")?.click()
                }
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="border-border rounded-lg border-2 border-dashed p-6 text-center">
              <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <p className="text-muted-foreground mb-2 text-sm">
                Click to upload POAP image
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  document.getElementById("poapImageUpload")?.click()
                }
              >
                Choose File
              </Button>
            </div>
          )}

          <input
            id="poapImageUpload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
            className="hidden"
          />
        </div>

        <FormField
          control={form.control}
          name="poapTemplate.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>POAP Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Web3 Summit 2024 Attendee"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="poapTemplate.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>POAP Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of the POAP that attendees will receive."
                  rows={3}
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
          onClose={() => setIsCropDialogOpen(false)}
          imageSrc={tempImageSrc}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default DesignCollectibleStep;
