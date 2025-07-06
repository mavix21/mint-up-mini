import * as z from "zod";

export interface TicketType {
  id: string;
  name: string;
  price: string;
  priceAmount?: string;
  currency?: string;
  requiresApproval: boolean;
}

// Validation schema for the event form
export const eventFormSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  nftName: z.string().min(1, "NFT name is required"),
  nftDescription: z.string().min(1, "NFT description is required"),
  ticketTypes: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Ticket name is required"),
        price: z.string(),
        priceAmount: z.string().optional(),
        currency: z.string().optional(),
        requiresApproval: z.boolean(),
      }),
    )
    .min(1, "At least one ticket type is required"),
  capacity: z.string(),
  enableRaffles: z.boolean(),
  enableTrivia: z.boolean(),
  autoDeliverPOAPs: z.boolean(),
  selectedImage: z.string().min(1, "Event image is required"),
  ticketArtwork: z.string().optional(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
