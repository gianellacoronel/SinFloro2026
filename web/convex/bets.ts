import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBets = query({
  handler: async (ctx) => {
    const bets = await ctx.db.query("bets").collect();

    return bets;
  },
});

export const getBetsByWalletAddress = query({
  args: { walletAddress: v.string() },
  handler: async (ctx, args) => {
    const bets = await ctx.db
      .query("bets")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .order("desc")
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

export const getABetForWinningCandidate = query({
  args: { walletAddress: v.string(), winningCandidateId: v.number() },
  handler: async (ctx, args) => {
    const bet = await ctx.db
      .query("bets")
      .withIndex("by_wallet_and_contractCandidate", (q) =>
        q
          .eq("walletAddress", args.walletAddress)
          .eq("contractCandidateId", args.winningCandidateId),
      )
      .first();

    return bet;
  },
});
export const createBet = mutation({
  args: {
    walletAddress: v.string(),
    candidateId: v.id("candidates"),
    amount: v.number(),
    contractCandidateId: v.number(),
  },
  handler: async (ctx, args) => {
    const betId = await ctx.db.insert("bets", {
      walletAddress: args.walletAddress,
      candidateId: args.candidateId,
      amount: args.amount,
      odds: 0,
      potentialPayout: 0,
      status: "open",
      contractCandidateId: args.contractCandidateId,
      tokenSymbol: "INTI",
      txHash: "",
    });

    return betId;
  },
});

export const getBetsByCandidate = query({
  args: { walletAddress: v.string(), candidateId: v.id("candidates") },
  handler: async (ctx, args) => {
    const bets = await ctx.db
      .query("bets")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .filter((q) => q.eq(q.field("candidateId"), args.candidateId))
      .collect();

    return bets;
  },
});
