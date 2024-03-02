import { query, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        try {
            return await ctx.db.query("topic").collect();
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const getInternal = internalQuery({
    args: {},
    handler: async (ctx) => {
        try {
            return await ctx.db.query("topic").collect();
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const insert = internalMutation({
    args: {
        topics: v.array(
            v.object({ title: v.string(), rank: v.number() }))
    },
    handler: async (ctx, { topics }) => {
        try {
            for (const topic of topics) {
                await ctx.db.insert("topic", topic);
            }
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const remove = internalMutation({
    args: { ids: v.array(v.id("topic")) },
    handler: async (ctx, { ids }) => {
        try {
            for (const id of ids) {
                await ctx.db.delete(id);
            }
            return 'success'
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});
