import { query } from "./_generated/server";

export const getEvents = query({
  handler: async (ctx) => {
    const events = await ctx.db.query("events").order("desc").collect();
    return Promise.all(
      events.map(async (event) => {
        const user = await ctx.db.get(event.creatorId);
        return {
          ...event,
          creatorName: user?.displayName ?? "Anonymous",
        };
      }),
    );
  },
});
