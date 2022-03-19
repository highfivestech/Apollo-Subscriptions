import {ApolloServer, gql} from 'apollo-server-express';
import http from 'http';
import bodyParser from 'body-parser';
import fs from 'fs';
import express from 'express';
import * as resolvers from './resolvers.js';
import mongoose from 'mongoose';
import { depositData } from "./models/index.js";
import { pubSub } from './pubSub.js';

const port = 4000;
const mongoUrl= "ENTER_MONGO_URL";

const app = express();
app.use(bodyParser.json());

const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf-8'}));

const apolloServer = new ApolloServer({typeDefs, resolvers: {...resolvers}});
apolloServer.applyMiddleware({app});

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

mongoose.connect(mongoUrl,{useNewUrlParser: true});
const con = mongoose.connection;
try{
    con.on('open',() => {
        console.log('connected');
        const depositCollection = con.collection('depositdatas');
        const changeStream = depositCollection.watch();
        changeStream.on('change', async (change) => {
        const deposits = await depositData.find();
        pubSub.publish('DEPOSIT_REFRESHED', {DepositRefreshed: deposits})
});
    })
}catch(error)
{
    console.log("Error: "+error);
}


setInterval(() => {
    pubSub.publish('PRICE_REFRESHED', {PriceRefreshed: ''})
}, 1000);

setInterval(() => {
    pubSub.publish('PRICE_REFRESHED_CRYPTO_LIB', {PriceFromCryptoLib: ''})
}, 1000);



httpServer.listen(port, () => console.info(`Server started on port ${port}`));
