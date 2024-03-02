import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI
 from "openai";
export const clustering = action({
    args: { title: v.string(), b: v.array(v.string()) },
    handler: (ctx, args) => {
        try {
            const openai = new OpenAI();
            const response = openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: "Clustering the opinions of the people on the topic of " + args.title + " and the opinions are " + args.b.join(", "),
                    },
                ],
            });
            return response;
        } catch (e) {
            console.error(e);
        }
    },
});