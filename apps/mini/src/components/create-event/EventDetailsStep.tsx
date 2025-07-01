import { Input } from "@mint-up/ui/components/input";
import { Label } from "@mint-up/ui/components/label";
import { Textarea } from "@mint-up/ui/components/textarea";

interface EventDetailsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const EventDetailsStep = ({
  formData,
  updateFormData,
}: EventDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-6 text-2xl font-semibold">
          Event Details
        </h2>
      </div>

      <div className="space-y-4">
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
    </div>
  );
};

export default EventDetailsStep;
