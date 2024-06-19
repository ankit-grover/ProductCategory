import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.js";
import { readFile } from 'node:fs/promises';
import express from 'express';
import cors from 'cors';
import {expressMiddleware as apolloMiddleWare} from '@apollo/server/express4';

const PORT = 9001;

const typeDefs = await readFile(
    "./schema.graphql",
    "utf-8"
  );

  const app = express();
const apolloServer = new ApolloServer({ 
    typeDefs : [typeDefs], 
    resolvers: [resolvers] });
    await apolloServer.start();
    app.use(cors(),express.json(), apolloMiddleWare(apolloServer));
    app.use('/graphql', apolloMiddleWare(apolloServer));
    
    app.listen({ port: PORT }, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
