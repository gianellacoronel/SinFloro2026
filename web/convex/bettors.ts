import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createBettor = mutation({
  args: {
    walletAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const bettorId = await ctx.db.insert("bettors", {
      walletAddress: args.walletAddress,
      wereTokensClaimed: false,
    });
    return bettorId;
  },
});
