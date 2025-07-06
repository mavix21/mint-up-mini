import { useFormContext } from "react-hook-form";

import { Button } from "@mint-up/ui/components/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mint-up/ui/components/form";
import { Label } from "@mint-up/ui/components/label";
import { Switch } from "@mint-up/ui/components/switch";

import type { EventFormValues } from "../../lib/schemas/eventForm";

const SetExperienceStep = () => {
  const form = useFormContext<EventFormValues>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-foreground mb-6 text-2xl font-semibold">
          Set Up Your Experience
        </h2>
      </div>

      {/* Automated Flows */}
      <div className="space-y-4">
        <h3 className="text-foreground text-lg font-semibold">
          Automated Flows
        </h3>
        <div className="space-y-3">
          {[
            "pre_event_reminder",
            "event_start_announcement",
            "post_event_poap_announcement",
          ].map((flowType, index) => {
            const automatedFlows = form.getValues("automatedFlows") ?? [];
            const flowIndex = automatedFlows.findIndex(
              (flow) => flow.type === flowType,
            );
            return (
              <div key={flowType} className="flex items-center justify-between">
                <div>
                  <Label className="text-sm capitalize">
                    {flowType.replace(/_/g, " ")}
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    {flowType === "pre_event_reminder" &&
                      "Send reminder before event"}
                    {flowType === "event_start_announcement" &&
                      "Announce when event starts"}
                    {flowType === "post_event_poap_announcement" &&
                      "Announce POAP availability after event"}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name={`automatedFlows.${flowIndex >= 0 ? flowIndex : index}.isEnabled`}
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
            );
          })}
        </div>
      </div>

      {/* Legacy fields for backward compatibility */}
      <div className="space-y-4">
        <h3 className="text-foreground text-lg font-semibold">
          Additional Settings
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm">Enable Raffles</Label>
            <p className="text-muted-foreground text-xs">
              Allow attendees to participate in raffles
            </p>
          </div>
          <FormField
            control={form.control}
            name="enableRaffles"
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

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm">Enable Trivia</Label>
            <p className="text-muted-foreground text-xs">
              Include trivia questions during the event
            </p>
          </div>
          <FormField
            control={form.control}
            name="enableTrivia"
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

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm">Auto-deliver POAPs</Label>
            <p className="text-muted-foreground text-xs">
              Automatically deliver POAPs to attendees
            </p>
          </div>
          <FormField
            control={form.control}
            name="autoDeliverPOAPs"
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
      </div>
    </div>
  );
};

export default SetExperienceStep;
