import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {
        preference: v.string(),
    },
    handler: async (ctx, { preference }) => {
        try {
            return await ctx.db
                .query("news")
                .filter((q) => q.eq(q.field('preference'), preference.toLowerCase()))
                .order("asc")
                .collect();
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const getById = query({
    args: { id: v.id("news") },
    handler: async (ctx, { id }) => {
        try {
            return await ctx.db
                .query("news")
                .filter((q) => q.eq(q.field('_id'), id))
                .first();
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const insert = internalMutation({
    args: {
        title: v.string(),
        contents: v.array(v.string()),
        authors: v.array(v.string()),
        sources: v.array(
            v.object({
                title: v.string(),
                comment: v.array(v.string()),
                description: v.string(),
            })
        ),
        image: v.string(),
        preference: v.string(),
    },
    handler: async (ctx, {
        title,
        contents,
        sources,
        image,
        preference }) => {
        try {
            return await ctx.db
                .insert("news", { title, contents, sources, image, preference })
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const remove = mutation({
    args: { id: v.id("news") },
    handler: async (ctx, { id }) => {
        try {
            return await ctx.db.delete(id);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});
