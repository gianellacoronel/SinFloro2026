import { query } from "./_generated/server";

export const getCandidates = query({
  handler: async (ctx) => {
    const tasks = await ctx.db.query("candidates").collect();
    return tasks;
  },
});
