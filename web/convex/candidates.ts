import { query } from "./_generated/server";

export const getCandidates = query({
  handler: async (ctx) => {
    const candidates = await ctx.db.query("candidates").collect();
    return candidates;
  },
});
