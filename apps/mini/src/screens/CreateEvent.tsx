"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import type { Id } from "@mint-up/convex/_generated/dataModel";
import { api } from "@mint-up/convex/_generated/api";
import { useMutation } from "@mint-up/convex/react";
import { Button } from "@mint-up/ui/components/button";
import { Form } from "@mint-up/ui/components/form";

import type { EventFormValues } from "../lib/schemas/eventForm";
import { uploadFile } from "../actions/uploadFile.action";
import DesignCollectibleStep from "../components/create-event/DesignCollectibleStep";
import EventDetailsStep from "../components/create-event/EventDetailsStep";
import LivePreview from "../components/create-event/LivePreview";
import SetExperienceStep from "../components/create-event/SetExperienceStep";
import StepIndicator from "../components/create-event/StepIndicator";
import { eventFormSchema } from "../lib/schemas/eventForm";

// Helper to check if a string is a blob or data URL
const isLocalImageUrl = (url: string) =>
  typeof url === "string" &&
  (url.startsWith("blob:") || url.startsWith("data:"));

// Helper to convert blob/data URL to File
async function blobUrlToFile(
  blobUrl: string,
  fileName = "image.jpg",
): Promise<File> {
  const res = await fetch(blobUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
}

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      location: {
        type: "in-person" as const,
        address: "",
        instructions: "",
      },
      description: "",
      ticketTemplates: [
        {
          id: "1",
          name: "General Admission",
          description: "",
          totalSupply: undefined,
          isApprovalRequired: false,
          price: {
            type: "free" as const,
          },
          nft: {
            image: "",
            metadata: {},
          },
        },
      ],
      poapTemplate: {
        name: "",
        description: "",
        nft: {
          image: "",
          metadata: {},
        },
      },
      automatedFlows: [
        {
          type: "pre_event_reminder" as const,
          isEnabled: true,
        },
        {
          type: "event_start_announcement" as const,
          isEnabled: true,
        },
        {
          type: "post_event_poap_announcement" as const,
          isEnabled: true,
        },
      ],
      // Legacy fields for backward compatibility
      eventName: "",
      nftName: "",
      nftDescription: "",
      ticketTypes: [],
      capacity: "",
      enableRaffles: false,
      enableTrivia: false,
      autoDeliverPOAPs: true,
      selectedImage: "",
      ticketArtwork: "",
    },
    mode: "onChange",
  });

  const { watch, trigger } = form;
  const formData = watch();

  const createEvent = useMutation(api.events.createEvent);

  // Helper: get the schema for the current step
  const getStepSchema = (step: number) => {
    if (step === 1) {
      return eventFormSchema.pick({
        name: true,
        startDate: true,
        endDate: true,
        location: true,
        description: true,
        selectedImage: true,
      });
    } else if (step === 2) {
      return eventFormSchema.pick({
        poapTemplate: true,
        ticketTemplates: true,
      });
    } else if (step === 3) {
      // no schema for this step
      return z.object({});
    }
    return eventFormSchema;
  };

  // Synchronous validation for UI
  const isCurrentStepValid =
    getStepSchema(currentStep).safeParse(formData).success;

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger([
        "name",
        "startDate",
        "endDate",
        "location",
        "description",
        "selectedImage",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger(["poapTemplate", "ticketTemplates"]);
    } else if (currentStep === 3) {
      // no validation for this step
      isValid = true;
    }
    if (!isValid) {
      return;
    }
    // Auto-set ticket artwork to event image when entering step 2
    if (
      currentStep === 1 &&
      formData.selectedImage &&
      !formData.ticketArtwork
    ) {
      form.setValue("ticketArtwork", formData.selectedImage);
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateEvent = async (data: EventFormValues) => {
    console.log("handle create event", { data, currentStep });
    // Helper to process an image field: upload if blob/data URL, else throw
    const processImage = async (image: string): Promise<Id<"_storage">> => {
      const file = await blobUrlToFile(image);
      const { storageId } = await uploadFile(file);
      return storageId;
    };

    // Validate all required images are valid local image URLs and defined
    if (
      !data.selectedImage ||
      !isLocalImageUrl(data.selectedImage) ||
      !data.ticketTemplates.every(
        (t) => t.nft.image && isLocalImageUrl(t.nft.image),
      ) ||
      !data.poapTemplate.nft.image ||
      !isLocalImageUrl(data.poapTemplate.nft.image)
    ) {
      alert(
        "All image fields must be valid local images (blob/data URLs) before creating the event.",
      );
      return;
    }

    // Process selectedImage
    const selectedImageId = await processImage(data.selectedImage);

    // Process poapTemplate image if present
    const poapImageId = await processImage(data.poapTemplate.nft.image);

    // Process ticketTemplates images
    const ticketImageIds = await Promise.all(
      data.ticketTemplates.map((t) => processImage(t.nft.image)),
    );

    // Build new ticketTemplates array with processed images
    const newTicketTemplates = data.ticketTemplates.map((t, i) => ({
      ...t,
      nft: {
        ...t.nft,
        image: ticketImageIds[i] as Id<"_storage">,
      },
    }));

    // Build new poapTemplate with processed image if present
    const newPoapTemplate = {
      ...data.poapTemplate,
      nft: {
        ...data.poapTemplate.nft,
        image: poapImageId,
      },
    };

    // Build the final payload (pure, new object)
    const payload = {
      name: data.name,
      image: selectedImageId,
      description: data.description,
      startDate: new Date(data.startDate).getTime(),
      endDate: data.endDate ? new Date(data.endDate).getTime() : undefined,
      creatorId: "jd7fpgekyphgg3mx2nenvp5g8s7k6pg7" as Id<"users">,
      organizationId: undefined,
      location: data.location,
      visibility: data.visibility ?? "public",
      hosts: [],
      ticketTemplates: newTicketTemplates,
      poapTemplate: newPoapTemplate,
      automatedFlows: data.automatedFlows,
    };

    await createEvent(payload);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-0">
        <div className="mb-8 text-center"></div>

        {/* Two-column layout */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left Panel - Live Preview (40% width) */}
          <div className="lg:col-span-2">
            <LivePreview currentStep={currentStep} formData={formData} />
          </div>

          {/* Right Panel - Controls (60% width) */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border p-4 shadow-sm">
              {/* Step Indicator */}
              <StepIndicator currentStep={currentStep} />

              {/* Form Provider */}
              <Form {...form}>
                <form
                  className="mt-8"
                  onSubmit={form.handleSubmit(handleCreateEvent)}
                >
                  {/* Step Content */}
                  <div>
                    {currentStep === 1 && <EventDetailsStep />}
                    {currentStep === 2 && <DesignCollectibleStep />}
                    {currentStep === 3 && <SetExperienceStep />}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex justify-between border-t pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-6"
                    >
                      Previous
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onMouseDown={nextStep}
                        className={`px-6 ${
                          !isCurrentStepValid
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                        disabled={!isCurrentStepValid}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className={`bg-primary hover:bg-primary/90 px-8 font-semibold ${
                          !isCurrentStepValid
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                        disabled={!isCurrentStepValid}
                      >
                        Create Event
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
