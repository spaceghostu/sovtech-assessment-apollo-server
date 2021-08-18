import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { PeopleAPI } from './api/people-api';


async function startApolloServer() {
    const server = new ApolloServer({
        schema,
        validationRules: [depthLimit(7)],
        dataSources: () => {
            return {
                peopleAPI: new PeopleAPI(),
            };
        },
    });
    await server.start();
    const app = express();
    app.use(cors());
    app.use(compression());
    server.applyMiddleware({ app, path: '/graphql' });
    const httpServer = createServer(app);
    httpServer.listen({ port: process.env.PORT || 4000 },(): void => 
        console.log(`\n🚀      GraphQL is now running on http://localhost:4000/graphql`));
    return { app, server };
}

startApolloServer();