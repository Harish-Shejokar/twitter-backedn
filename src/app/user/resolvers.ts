import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTServices from "../../services/jwt";
import { GraphqlContext } from "../interfaces";
import { User } from "@prisma/client";

interface GoogleTokenResult {
    iss?: string;
    aud?: string;
    azp?: string;
    sub?: string;
    email?: string;
    email_verified: string;
    nbf?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        const googleToken = token;
        const googleOauthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
        googleOauthUrl.searchParams.set("id_token", googleToken);

        const { data } = await axios.get<GoogleTokenResult>(googleOauthUrl.toString(), {
            responseType: 'json'
        })

        const user = await prismaClient.user.findUnique({
            where: { email: data.email }
        })

        if (!user) {
            await prismaClient.user.create({
                data: {
                    email: data.email as string,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageURL: data.picture
                }
            })
        }

        const userInDb = await prismaClient.user.findUnique({
            where: { email: data.email }
        })
        if (!userInDb) {
            throw new Error("User not found with Email");
        }

        const userToken = await JWTServices.genrateTokenForUser(user);

        return userToken;
    },

    getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
        const id = ctx.user?.id;
        if (!id) return null;
        const user = await prismaClient.user.findUnique({ where: { id }, })
        return user;
    },

    getUserById: async (parent: any, {id}: {id:string}, ctx: GraphqlContext) => {
        // if (!id) return throw new Error(`enter valid id`);

        const user = await prismaClient.user.findUnique({ where: { id } })
        // if (!user) {
        //     return throw new Error(`user not fount by - ID`);
        // }
        return user;
    }

}

const extraResolver = {
    User: {
        tweets: (parent: User) => prismaClient.tweet.findMany({ where: { author: { id: parent.id } } })
    },
}

export const resolvers = { queries, extraResolver };