import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../interfaces";
import { Tweet } from "@prisma/client";
import { types } from "./types";

interface CreateTweetData{
    content: string;
    imageURL?: string;
}


const queries = {
    getAllTweets: () => prismaClient.tweet.findMany({orderBy:{createdAt:"desc"}}),
}


const mutations = {
    createTweet: async (parent: any, { payload }: { payload: CreateTweetData }, ctx: GraphqlContext) => {
        if (!ctx.user) {
            throw new Error("you are not authenticated");
        }

        const tweet = await prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: { connect: { id: ctx.user.id } },
            }
        })
        
        return tweet;
    }
};

const extraResolver = {
    Tweet: {
        author: (parent: Tweet) => {
           return prismaClient.user.findUnique({ where: {id : parent.authorId}})
        },
    }
}

export const resolvers = { types,mutations,extraResolver, queries };