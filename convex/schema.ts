import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    news: defineTable({
        title: v.string(),
        contents: v.array(v.string()),
        sources: v.array(
            v.object({
                authors: v.string(),
                comment: v.string(),
                url: v.string(),
                contentIndex: v.number(),
            })
        ),
        image: v.string(),
        preference: v.array(v.string()),
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