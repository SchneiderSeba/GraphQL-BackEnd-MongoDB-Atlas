import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './typeDef.js';
import resolvers from './resolvers.js';
import connectDB from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
connectDB();

app.get('/', (req, res) => {
    res.send('BACK!');
});

async function startApp() {

    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    app.get('*', (req, res) => {
        res.send('404 Not Found');
    });

    app.listen({ port: process.env.PORT || 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
    });

}
startApp().catch(error => {
    console.error('Error starting the server:', error);
});

