import { defineTable } from "convex/server";
import { v } from "convex/values";

export const linkedAccountsTable = defineTable({
  userId: v.id("users"),
  protocol: v.union(v.literal("farcaster"), v.literal("wallet")),
  protocolUserId: v.string(),
  metadata: v.optional(
    v.object({
      username: v.optional(v.string()),
    }),
  ),
})
  .index("by_userId", ["userId"])
  .index("by_protocol_id", ["protocol", "protocolUserId"]);
