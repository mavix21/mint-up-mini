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
    <div className="mb-8 flex items-center justify-between">
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
              className={`mt-2 text-sm font-medium transition-colors ${
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
  );
};

export default StepIndicator;
