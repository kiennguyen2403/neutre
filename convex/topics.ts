import { mutation, query, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("news").collect();
    },
});

export const getInternal = internalQuery({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("news").collect();
    },
});

export const insert = internalMutation({
    args: { topics: v.array(
        v.object({ title: v.string(), rank: v.number() }))
    },
    handler: async (ctx, { topics }) => {
        for (const topic of topics) {
            await ctx.db.insert("topic", topic);
        }
    },
});

export const remove = internalMutation({
    args: { ids: v.array(v.id("topic")) },
    handler: async (ctx, { ids }) => {
        for (const id of ids) {
            await ctx.db.delete(id);
        }
        return 'success'
    },
});
