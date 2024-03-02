import { mutation, internalMutation, action } from "./_generated/server";
import { api, internal } from "./_generated/api";

import axios from "axios";

export const updateHotTopic = action({
    args: {},
    handler: async (ctx, args) => {
        try {
            const hotTopics = await axios.get("https://api.example.com/hot-topic");

            const topics = await ctx.runQuery(
                internal.topics.getInternal,
                {}
            );

            if (Array.isArray(topics)) {
                await ctx.scheduler
                    .runAfter(1000 * 60 * 60 * 24, internal.topics.remove, {
                        ids: topics.map((topic: any) => topic._id),
                    })
            }

            await ctx.scheduler
                .runAfter(1000 * 60 * 60 * 24, internal.topics.insert, {
                    topics: hotTopics.data.topics.map((topic: any) => ({
                        title: topic.title,
                        rank: topic.rank,
                    })),
                });
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const updateNews = action({
    args: {},
    handler: async (ctx) => {
        try {
            const news = await axios.get("https://api.example.com/news");
            await ctx.runAction(internal.actions.clustering, {
                title: news.data.title,
                b: news.data.contents,
            })
            await ctx.scheduler
                .runAfter(1000 * 60 * 60 * 24, internal.news.insert, {
                    title: news.data.title,
                    contents: news.data.contents,
                    authors: news.data.authors,
                    image: news.data.image,
                    url: news.data.url,
                });
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});