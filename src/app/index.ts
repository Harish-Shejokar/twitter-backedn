import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import cors from 'cors';
import express from "express";
import bodyParser from "body-parser";
import { User } from "../app/users/index"

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  const graphqlServer = new ApolloServer({

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

  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
