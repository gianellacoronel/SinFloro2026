import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  candidates: defineTable({
    name: v.string(),
    party: v.string(),
    description: v.string(),
    photoUrl: v.string(),
    color: v.string(),
    contractId: v.number(),
    currentOdds: v.number(),
    totalPool: v.string(),
  }).index("by_contract_id", ["contractId"]),

  users: defineTable({
    walletAddress: v.string(),
    nickname: v.optional(v.string()),
    avatarId: v.optional(v.string()),
  }).index("by_wallet", ["walletAddress"]),

  comments: defineTable({
    candidateId: v.id("candidates"),
    userId: v.id("users"),
    text: v.string(),
    sentiment: v.string(),
  }),
});
