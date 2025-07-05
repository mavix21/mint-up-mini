import type { LucideIcon } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";

interface BottomTabProps {
  isCenter?: boolean;
  Icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const BottomTab = ({
  isCenter,
  Icon,
  label,
  isActive,
  onClick,
}: BottomTabProps) => {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col items-center justify-center ${
        isCenter ? "relative" : ""
      }`}
    >
      {isCenter ? (
        // Center button with special styling
        <div className="relative -top-6">
          <Button
            size="icon"
            onClick={onClick}
            className={`h-14 w-14 rounded-full shadow-lg ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <Icon className="h-6 w-6" />
          </Button>
        </div>
      ) : (
        // Regular tabs
        <button
          className="flex flex-col items-center justify-center px-1 py-2"
          onClick={onClick}
        >
          <Icon
            className={`mb-1 h-5 w-5 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <span
            className={`text-xs font-medium ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
        </button>
      )}
    </div>
  );
};
