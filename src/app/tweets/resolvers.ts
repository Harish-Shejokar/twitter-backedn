import { PrismaClient } from "@prisma/client";
import { GraphqlContext } from "../interfaces";

interface CreateTweetPayload  {
    content: string
    imageUrl : string?
}

export const mutation = {
    createTweet: async (parent: any, { payload }: { payload: CreateTweetPayload }, ctx: GraphqlContext) => {
        if (!ctx.user) {
            throw new Error(`You are not Authenticated`);
        }

        await PrismaClient.tweet.create({
            data: {
                content: payload?.content,
                imageUrl: payload?.imageUrl,
                author: { connect: { id : ctx.user.id}},
            }
        })
    }
}
