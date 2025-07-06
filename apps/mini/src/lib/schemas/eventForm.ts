import * as z from "zod";

export interface TicketTemplate {
  id: string;
  name: string;
  description?: string;
  totalSupply?: number;
  isApprovalRequired: boolean;
  price: { type: "free" } | { type: "paid"; currency: string; amount: number };
  nft: {
    image: string; // This will be converted to storage ID
    metadata?: any;
  };
}

export interface Location {
  type: "online" | "in-person";
  url?: string;
  address?: string;
  instructions?: string;
}

export interface AutomatedFlow {
  type:
    | "pre_event_reminder"
    | "event_start_announcement"
    | "post_event_poap_announcement";
  isEnabled: boolean;
}

export interface POAPTemplate {
  name: string;
  description?: string;
  nft: {
    image: string; // This will be converted to storage ID
    metadata?: any;
  };
}

// Validation schema for the event form
export const eventFormSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  location: z
    .object({
      type: z.enum(["online", "in-person"]),
      url: z.string().optional(),
      address: z.string().optional(),
      instructions: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === "online" && !data.url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL is required for online events",
          path: ["url"],
        });
      }
      if (data.type === "in-person" && !data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address is required for in-person events",
          path: ["address"],
        });
      }
    }),
  description: z.string().optional(),
  visibility: z.enum(["public", "unlisted"]).optional(),

  ticketTemplates: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Ticket name is required"),
        description: z.string().optional(),
        totalSupply: z.number().optional(),
        isApprovalRequired: z.boolean(),
        price: z.discriminatedUnion("type", [
          z.object({ type: z.literal("free") }),
          z.object({
            type: z.literal("paid"),
            currency: z.string(),
            amount: z.number().min(0.01, "Amount must be greater than 0"),
          }),
        ]),
        nft: z.object({
          image: z.string().min(1, "NFT image is required"),
          metadata: z.any().optional(),
        }),
      }),
    )
    .min(1, "At least one ticket template is required"),

  poapTemplate: z
    .object({
      name: z.string().min(1, "POAP name is required"),
      description: z.string().optional(),
      nft: z.object({
        image: z.string().min(1, "POAP image is required"),
        metadata: z.any().optional(),
      }),
    })
    .optional(),

  automatedFlows: z
    .array(
      z.object({
        type: z.enum([
          "pre_event_reminder",
          "event_start_announcement",
          "post_event_poap_announcement",
        ]),
        isEnabled: z.boolean(),
      }),
    )
    .optional(),

  // Legacy fields for backward compatibility (can be removed later)
  eventName: z.string().optional(),
  nftName: z.string().optional(),
  nftDescription: z.string().optional(),
  ticketTypes: z.array(z.any()).optional(),
  capacity: z.string().optional(),
  enableRaffles: z.boolean().optional(),
  enableTrivia: z.boolean().optional(),
  autoDeliverPOAPs: z.boolean().optional(),
  selectedImage: z.string().optional(),
  ticketArtwork: z.string().optional(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
