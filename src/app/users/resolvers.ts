
import axios from "axios";
import { prismaClient } from "../../clients/db";

interface GoogleTokenResult {
    iss?: string
    aud?: string
    azp?: string
    sub?: string;
    email?: string;
    email_verified: string
    nbf?: string
    name?: string
    picture?: string
    given_name: string
    family_name?: string
    iat?: string
    exp?: string
    jti?: string
    alg?: string
    kid?: string
    typ?: string
}

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        const googleToken = token;
        const googleOauthUrl = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthUrl.searchParams.set('id_token', googleToken)

        const { data } = await axios.get<GoogleTokenResult>(googleOauthUrl.toString(), {
            responseType: 'json'
        })

        if ( !data?.email ) {
            throw new Error("Email not found");
        }
        
        if (data.email) {
            const user = await prismaClient.user.findUnique({
                where : {email : data.email},
            })
            console.log(user);

            if(!user){
                await prismaClient.user.create({
                    data : {
                        email : data.email,
                        firstName : data.given_name,
                        lastName : data.family_name,
                        profileImageUrl : data.picture,
                    }
                })
            }
       }

        


        return "ok";
    }
}

export const resolvers = { queries };