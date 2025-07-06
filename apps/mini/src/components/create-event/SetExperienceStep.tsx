import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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

import type { EventFormValues, TicketType } from "../../lib/schemas/eventForm";

const SetExperienceStep = () => {
  const [showCapacityInput, setShowCapacityInput] = useState(false);

  const form = useFormContext<EventFormValues>();
  const { watch, setValue } = form;
  const capacity = watch("capacity");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ticketTypes",
  });

  const addTicketType = () => {
    const newTicketType: TicketType = {
      id: Date.now().toString(),
      name: "",
      price: "Free",
      requiresApproval: false,
    };
    append(newTicketType);
  };

  const removeTicketType = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-foreground mb-6 text-2xl font-semibold">
          Set Up Your Experience
        </h2>
      </div>

      {/* Ticket Types */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-lg font-semibold">
            Ticket Types
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTicketType}
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
                      onClick={() => removeTicketType(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`ticketTypes.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Ticket Name</FormLabel>
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
                    name={`ticketTypes.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Price</FormLabel>
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
                            <SelectItem value="Free">Free</SelectItem>
                            <SelectItem value="Paid (Crypto)">
                              Paid (Crypto)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Price and Currency fields for paid tickets */}
                {watch(`ticketTypes.${index}.price`) === "Paid (Crypto)" && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`ticketTypes.${index}.priceAmount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">
                            Price Amount
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`ticketTypes.${index}.currency`}
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
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Requires Approval</Label>
                    <p className="text-muted-foreground text-sm">
                      Manually approve registrations for this ticket type
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name={`ticketTypes.${index}.requiresApproval`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Event Capacity */}
      <div className="space-y-6">
        <h3 className="text-foreground text-lg font-semibold">
          Event Capacity
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-foreground">Capacity</Label>
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowCapacityInput(value === "Limited");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Unlimited">Unlimited</SelectItem>
                        <SelectItem value="Limited">Limited</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {showCapacityInput && (
                <Input
                  placeholder="Max attendees"
                  className="w-32"
                  type="number"
                />
              )}
            </div>
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
                  <FormMessage />
                </FormItem>
              )}
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
                  <FormMessage />
                </FormItem>
              )}
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetExperienceStep;
