import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@mint-up/ui/components/button";
import { Card, CardContent } from "@mint-up/ui/components/card";
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

interface TicketType {
  id: string;
  name: string;
  price: string;
  priceAmount?: string;
  currency?: string;
  requiresApproval: boolean;
}

interface SetExperienceStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const SetExperienceStep = ({
  formData,
  updateFormData,
}: SetExperienceStepProps) => {
  const [showCapacityInput, setShowCapacityInput] = useState(false);

  const addTicketType = () => {
    const newTicketType: TicketType = {
      id: Date.now().toString(),
      name: "",
      price: "Free",
      requiresApproval: false,
    };
    updateFormData("ticketTypes", [...formData.ticketTypes, newTicketType]);
  };

  const removeTicketType = (id: string) => {
    if (formData.ticketTypes.length > 1) {
      updateFormData(
        "ticketTypes",
        formData.ticketTypes.filter((ticket: TicketType) => ticket.id !== id),
      );
    }
  };

  const updateTicketType = (
    id: string,
    field: keyof TicketType,
    value: any,
  ) => {
    const updatedTicketTypes = formData.ticketTypes.map((ticket: TicketType) =>
      ticket.id === id ? { ...ticket, [field]: value } : ticket,
    );
    updateFormData("ticketTypes", updatedTicketTypes);
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
          {formData.ticketTypes.map((ticket: TicketType, index: number) => (
            <Card key={ticket.id} className="p-4">
              <CardContent className="space-y-4 p-0">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground font-medium">
                    Ticket {index + 1}
                  </Label>
                  {formData.ticketTypes.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTicketType(ticket.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">
                      Ticket Name
                    </Label>
                    <Input
                      placeholder="e.g., General Admission"
                      value={ticket.name}
                      onChange={(e) =>
                        updateTicketType(ticket.id, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">Price</Label>
                    <Select
                      value={ticket.price}
                      onValueChange={(value) =>
                        updateTicketType(ticket.id, "price", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Paid (Crypto)">
                          Paid (Crypto)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price and Currency fields for paid tickets */}
                {ticket.price === "Paid (Crypto)" && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-foreground text-sm">
                        Price Amount
                      </Label>
                      <Input
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        value={ticket.priceAmount || ""}
                        onChange={(e) =>
                          updateTicketType(
                            ticket.id,
                            "priceAmount",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground text-sm">
                        Currency
                      </Label>
                      <Select
                        value={ticket.currency || "USDC"}
                        onValueChange={(value) =>
                          updateTicketType(ticket.id, "currency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USDC">USDC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Requires Approval</Label>
                    <p className="text-muted-foreground text-sm">
                      Manually approve registrations for this ticket type
                    </p>
                  </div>
                  <Switch
                    checked={ticket.requiresApproval}
                    onCheckedChange={(checked) =>
                      updateTicketType(ticket.id, "requiresApproval", checked)
                    }
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
