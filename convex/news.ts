import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("news").collect();
    },
});

export const getById = query({
    args: { id: v.id("news") },
    handler: async (ctx, { id }) => {
        return await ctx.db
        .query("news")
        
    },
});