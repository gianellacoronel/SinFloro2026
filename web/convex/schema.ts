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

  bets: defineTable({
    walletAddress: v.string(),
    candidateId: v.id("candidates"),
    contractCandidateId: v.number(),
    amount: v.number(),
    tokenSymbol: v.string(),
    txHash: v.string(),
    status: v.union(v.literal("open"), v.literal("won"), v.literal("lost")),
    odds: v.number(),
    potentialPayout: v.number(),
  })
    .index("by_wallet", ["walletAddress"])
    .index("by_candidate", ["candidateId"])
    .index("by_wallet_and_contractCandidate", [
      "walletAddress",
      "contractCandidateId",
    ]),

  bettors: defineTable({
    walletAddress: v.string(),
    wereTokensClaimed: v.boolean(),
  }).index("by_wallet", ["walletAddress"]),

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
