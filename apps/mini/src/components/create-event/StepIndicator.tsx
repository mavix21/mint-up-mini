interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { number: 1, title: "Event Details" },
    { number: 2, title: "Design Collectible" },
    { number: 3, title: "Set Experience" },
  ];

  return (
    <div className="mb-8">
      {/* Desktop Layout */}
      <div className="hidden items-center justify-between md:flex">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  currentStep >= step.number
                    ? "bg-primary text-black"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 text-center text-sm font-medium transition-colors ${
                  currentStep >= step.number
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-0.5 flex-1 transition-colors ${
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    currentStep >= step.number
                      ? "bg-primary text-black"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 w-8 transition-colors ${
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <span
            className={`text-sm font-medium transition-colors ${
              currentStep >= 1 && currentStep <= steps.length
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {steps[currentStep - 1]?.title || "Unknown Step"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
