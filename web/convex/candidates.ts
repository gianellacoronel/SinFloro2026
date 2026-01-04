import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCandidates = query({
  handler: async (ctx) => {
    const candidates = await ctx.db.query("candidates").collect();
    return candidates;
  },
});

export const getCandidateById = query({
  args: { id: v.id("candidates") },
  handler: async (ctx, args) => {
    const candidate = await ctx.db
      .query("candidates")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    return candidate;
  },
});

export const updateTotalPoolById = mutation({
  args: { id: v.id("candidates"), totalPool: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch("candidates", args.id, { totalPool: args.totalPool });
  },
});
