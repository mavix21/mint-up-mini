import { useState } from "react";

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

interface SetExperienceStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const SetExperienceStep = ({
  formData,
  updateFormData,
}: SetExperienceStepProps) => {
  const [showCapacityInput, setShowCapacityInput] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-foreground mb-6 text-2xl font-semibold">
          Set Up Your Experience
        </h2>
      </div>

      {/* Registration Options */}
      <div className="space-y-6">
        <h3 className="text-foreground text-lg font-semibold">
          Registration Options
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-foreground">Ticket Price</Label>
            <Select
              value={formData.ticketPrice}
              onValueChange={(value) => updateFormData("ticketPrice", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Paid (Crypto)">Paid (Crypto)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-foreground">Capacity</Label>
            <div className="flex items-center space-x-2">
              <Select
                value={formData.capacity}
                onValueChange={(value) => {
                  updateFormData("capacity", value);
                  setShowCapacityInput(value === "Limited");
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unlimited">Unlimited</SelectItem>
                  <SelectItem value="Limited">Limited</SelectItem>
                </SelectContent>
              </Select>
              {showCapacityInput && (
                <Input
                  placeholder="Max attendees"
                  className="w-32"
                  type="number"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Requires Approval</Label>
              <p className="text-muted-foreground text-sm">
                Manually approve each registration
              </p>
            </div>
            <Switch
              checked={formData.requiresApproval}
              onCheckedChange={(checked) =>
                updateFormData("requiresApproval", checked)
              }
            />
          </div>
        </div>
      </div>

      {/* Live Engagement Tools */}
      <div className="space-y-6">
        <h3 className="text-foreground text-lg font-semibold">
          Live Engagement Tools
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Enable Live Raffles</Label>
              <p className="text-muted-foreground text-sm">
                Let attendees participate in live raffles during the event
              </p>
            </div>
            <Switch
              checked={formData.enableRaffles}
              onCheckedChange={(checked) =>
                updateFormData("enableRaffles", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">
                Enable Interactive Trivia
              </Label>
              <p className="text-muted-foreground text-sm">
                Engage your audience with live trivia questions
              </p>
            </div>
            <Switch
              checked={formData.enableTrivia}
              onCheckedChange={(checked) =>
                updateFormData("enableTrivia", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">
                Auto-deliver POAPs on Check-in
              </Label>
              <p className="text-muted-foreground text-sm">
                Automatically send POAP when attendees check in
              </p>
            </div>
            <Switch
              checked={formData.autoDeliverPOAPs}
              onCheckedChange={(checked) =>
                updateFormData("autoDeliverPOAPs", checked)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetExperienceStep;
