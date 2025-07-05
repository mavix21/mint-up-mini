"use client";

import { useState } from "react";

import { Button } from "@mint-up/ui/components/button";

import DesignCollectibleStep from "../components/create-event/DesignCollectibleStep";
import EventDetailsStep from "../components/create-event/EventDetailsStep";
import LivePreview from "../components/create-event/LivePreview";
import SetExperienceStep from "../components/create-event/SetExperienceStep";
import StepIndicator from "../components/create-event/StepIndicator";

interface TicketType {
  id: string;
  name: string;
  price: string;
  requiresApproval: boolean;
}

interface EventFormData {
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  nftName: string;
  nftDescription: string;
  ticketTypes: TicketType[];
  capacity: string;
  enableRaffles: boolean;
  enableTrivia: boolean;
  autoDeliverPOAPs: boolean;
  selectedImage: string | null;
  ticketArtwork: string | null;
}
const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>({
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
    selectedImage: null,
    ticketArtwork: null,
  });
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const nextStep = () => {
    if (currentStep < 3) {
      // Validation: Cannot proceed to step 2 without event image
      if (currentStep === 1 && !formData.selectedImage) {
        return;
      }

      // Auto-set ticket artwork to event image when entering step 2
      if (
        currentStep === 1 &&
        formData.selectedImage &&
        !formData.ticketArtwork
      ) {
        setFormData((prev) => ({
          ...prev,
          ticketArtwork: prev.selectedImage,
        }));
      }

      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleCreateEvent = () => {
    console.log("Creating event with data:", formData);
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

              {/* Step Content */}
              <div className="mt-8">
                {currentStep === 1 && (
                  <EventDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 2 && (
                  <DesignCollectibleStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 3 && (
                  <SetExperienceStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between border-t pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6"
                >
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    className="px-6"
                    disabled={currentStep === 1 && !formData.selectedImage}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleCreateEvent}
                    className="bg-primary hover:bg-primary/90 px-8 font-semibold text-black"
                  >
                    Create Event
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateEvent;
