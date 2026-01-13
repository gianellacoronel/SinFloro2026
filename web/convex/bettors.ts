import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBettor = mutation({
  args: {
    walletAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const bettorId = await ctx.db.insert("bettors", {
      walletAddress: args.walletAddress,
      wereTokensClaimed: true,
    });
    return bettorId;
  },
});

export const getBettorByWalletAddress = query({
  args: {
    walletAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const bettor = await ctx.db
      .query("bettors")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .first();

    return bettor;
  },
});
