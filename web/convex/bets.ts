import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBets = query({
  args: { walletAddress: v.string() },
  handler: async (ctx, args) => {
    const bets = await ctx.db
      .query("bets")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .collect();

    const betsWithCandidates = await Promise.all(
      bets.map(async (bet) => {
        const candidate = await ctx.db.get("candidates", bet.candidateId);
        if (!candidate) {
          throw new Error(`Candidate not found for ID: ${bet.candidateId}`);
        }
        return {
          ...bet,
          candidate: candidate.name,
          party: candidate.party,
        };
      }),
    );

    return betsWithCandidates;
  },
});

export const createBet = mutation({
  args: {
    walletAddress: v.string(),
    candidateId: v.id("candidates"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const betId = await ctx.db.insert("bets", {
      walletAddress: args.walletAddress,
      candidateId: args.candidateId,
      amount: args.amount,
      odds: 0,
      potentialPayout: 0,
      status: "open",
      contractCandidateId: 0,
      tokenSymbol: "INTI",
      txHash: "",
    });

    return betId;
  },
});
