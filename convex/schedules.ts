import { mutation, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";

import axios from "axios";

export const updateHotTopic = mutation({
    args: {},
    handler: async (ctx, args) => {
        const hotTopics = await axios.get("https://api.example.com/hot-topic");

        const topics = await ctx.db.query("topic").collect();

        await ctx.scheduler
            .runAfter(1000 * 60 * 60 * 24, internal.topics.remove, {
              ids: topics.map((topic) => topic._id),
            })

        await ctx.scheduler
            .runAfter(1000 * 60 * 60 * 24, internal.topics.insert, {
                topics: hotTopics.data.topics.map((topic: any) => ({
                    title: topic.title,
                    rank: topic.rank,
                })),
            });
    },
});

export const updateNews = mutation({
    args: {},
    handler: async (ctx, args) => {
        const news = await axios.get("https://api.example.com/news");

        await ctx.scheduler
            .runAfter(1000 * 60 * 60 * 24, internal.news.insert, {
                title: news.data.title,
                contents: news.data.contents,
                authors: news.data.authors,
                image: news.data.image,
                url: news.data.url,
            });
    },
});