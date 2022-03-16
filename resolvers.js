import { PubSub } from "apollo-server-express";
//import { depositData } from "./models";

const pubSub = new PubSub();

const price = {
    value: 44.44444,
    currency: 'USD'
};

const Query = {
    greeting: () => 'Hello',
    deposits: () => {
        setInterval(() => {
            pubSub.publish('PRICE_REFRESHED', {PriceRefreshed: price})
        }, 1000);
        return depositData.find();
    },
    ethPrice: () => { return {
        value: 222.324,
        currency: 'USD'
    }}
}

const Mutation = {
    deposits: (root, {deposits}) => {
        //create deposits in mongodb and return
    }
}

const Subscription = {
    PriceRefreshed: {
        subscribe: () => pubSub.asyncIterator('PRICE_REFRESHED')
    }
}

export {Query, Mutation, Subscription};