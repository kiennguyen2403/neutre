import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    news: defineTable({
        title: v.string(),
        contents: v.array(v.string()),
        sources: v.array(
            v.object({
                title: v.string(),
                comment: v.array(v.string()),
                description: v.string(),
            })
        ),
        image: v.string(),
        preference: v.string(),
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