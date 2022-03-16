import {ApolloServer, gql} from 'apollo-server-express';
import http from 'http';
import bodyParser from 'body-parser';
import fs from 'fs';
import express from 'express';
import * as resolvers from './resolvers.js';
import mongoose from 'mongoose';
import { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } from '@uniswap/sdk';
import { ethers } from 'ethers';

const port = 4000;
// const url= "mongodb://localhost:27017";

const app = express();
app.use(bodyParser.json());

// mongoose.connect(url,{useNewUrlParser: true});
// const con = mongoose.connection;
// try{
//     con.on('open',() => {
//         console.log('connected');
//     })
// }catch(error)
// {
//     console.log("Error: "+error);
// }

const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf-8'}));


const apolloServer = new ApolloServer({typeDefs, resolvers: {...resolvers}});
apolloServer.applyMiddleware({app});

app.get('/', (req,res) => {
    res.send('Hello');
});

app.get('/deposits', (req, res) => {

});

app.post('/deposits', (req, res) => {

});

app.post('/ethPrice', (req,res) => {

});

app.get('/ethPrice', (req, res) => {

});



const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => console.info(`Server started on port ${port}`));