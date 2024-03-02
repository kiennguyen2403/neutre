import { internalMutation, mutation, query } from "./_generated/server";
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
        .filter((q) => q.eq(q.field('_id'), id))
        .collect();
    },
});

export const insert = internalMutation({
    args: { 
        title: v.string(), 
        contents: v.array(v.string()), 
        authors: v.array(v.string()), 
        image: v.string(), 
        url: v.string()
    },
    handler: async (ctx, { title, contents, authors, image, url }) => {
        return await ctx.db
        .insert("news", { title, contents, authors, image, url })
    },
});

export const remove = mutation({
    args: { id: v.id("news") },
    handler: async (ctx, { id }) => {
        return await ctx.db.delete(id);
    },
});
