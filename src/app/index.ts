import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import express from "express";
import bodyParser from "body-parser";
import { User } from "../app/users/index"
import { GraphqlContext } from "./interfaces";
import JWTServices from "../services/jwt";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  const graphqlServer = new ApolloServer<GraphqlContext>({

    typeDefs: `
    
        ${User.types}

        type Query {
          ${User.queries}
        }
   `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },

    },
  });
  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer , {
    context: async ({ req, res }) => {
      return { user : req.headers.authorization ? JWTServices.decodeToken(req.headers.authorization) : undefined } ;
    },
  }));

  return app;
}
