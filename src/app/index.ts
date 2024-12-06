import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import cors from 'cors';
import express from "express";
import bodyParser from "body-parser";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  const graphqlServer = new ApolloServer({
      typeDefs: `
            type Query {
                sayHello : String,
                sayHellowToMe(name:String!) : String!,
            }
      `,
      resolvers: {
          Query: {
          sayHello: () => `Hello From GraphQl server`,
          sayHellowToMe: (parent: any, {name}:{name:string}) => `hey ${name}`,
          },
         
    },
  });
  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
