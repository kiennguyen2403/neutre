import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    news: defineTable({
        title: v.string(),
        contents: v.array(v.string()),
        authors: v.array(v.string()),
        image: v.string(),
        url: v.string(),
    }),
    user: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),
    topic: defineTable({
        title: v.string(),
        rank: v.number(),
    }),
});