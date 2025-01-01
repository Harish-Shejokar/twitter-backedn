import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import express from "express";
import bodyParser from "body-parser";
import { User } from "../app/users/index"
import { GraphqlContext } from "./interfaces";
import JWTServices from "../services/jwt";
import { Tweet } from "../app/tweets/index";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  const graphqlServer = new ApolloServer<GraphqlContext>({

    typeDefs: `
        ${User.types}

        ${Tweet.types}

        type Query {
          ${User.queries}
          ${Tweet.queries}
        }
        
        
        type Mutation {
         ${Tweet.mutations}
        }
   `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Tweet.resolvers.queries,
      },

      Mutation: {
        ...Tweet.resolvers.mutations,
      },

      ...Tweet.resolvers.extraResolvers,
      ...User.resolvers.extraResolvers,

    },
  });
  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer, {
    context: async ({ req, res }) => {
      return { user: req.headers.authorization ? JWTServices.decodeToken(req.headers.authorization.split('Bearer ')[1]) : undefined };
    },
  }));

  return app;
}
