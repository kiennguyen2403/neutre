import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = internalMutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const getImages = internalQuery({
    args: {
        id: v.id("_storage")
    },
    handler: async (ctx, { id }) => {
        return await ctx.storage.getUrl(id);
    },
});