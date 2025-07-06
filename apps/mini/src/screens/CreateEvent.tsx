"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@mint-up/ui/components/button";
import { Form } from "@mint-up/ui/components/form";

import type { EventFormValues } from "../lib/schemas/eventForm";
import DesignCollectibleStep from "../components/create-event/DesignCollectibleStep";
import EventDetailsStep from "../components/create-event/EventDetailsStep";
import LivePreview from "../components/create-event/LivePreview";
import SetExperienceStep from "../components/create-event/SetExperienceStep";
import StepIndicator from "../components/create-event/StepIndicator";
import { eventFormSchema } from "../lib/schemas/eventForm";

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      eventName: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      nftName: "",
      nftDescription: "",
      ticketTypes: [
        {
          id: "1",
          name: "General Admission",
          price: "Free",
          requiresApproval: false,
        },
      ],
      capacity: "Unlimited",
      enableRaffles: false,
      enableTrivia: false,
      autoDeliverPOAPs: true,
      selectedImage: "",
      ticketArtwork: "",
    },
    mode: "onChange",
  });

  const {
    watch,
    trigger,
    formState: { errors },
  } = form;
  const formData = watch();

  const nextStep = async () => {
    if (currentStep < 3) {
      // Validate current step fields
      let isValid = false;

      if (currentStep === 1) {
        isValid = await trigger([
          "eventName",
          "startDate",
          "endDate",
          "location",
          "description",
          "selectedImage",
        ]);
      } else if (currentStep === 2) {
        isValid = await trigger(["nftName", "nftDescription"]);
      } else if (currentStep === 3) {
        isValid = await trigger(["ticketTypes"]);
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
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateEvent = async (data: any) => {
    console.log("Creating event with data:", data);
    // Here you would typically submit the form data
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
                  onSubmit={form.handleSubmit(handleCreateEvent)}
                  className="mt-8"
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
                        onClick={nextStep}
                        className="px-6"
                        disabled={currentStep === 1 && !formData.selectedImage}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 px-8 font-semibold text-black"
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
