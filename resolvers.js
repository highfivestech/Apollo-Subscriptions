import { PubSub } from "apollo-server-express";
import { depositData } from "./models/index.js";

const pubSub = new PubSub();

const price = {
    value: 44.44444,
    currency: 'USD'
};

const Query = {
    greeting: () => 'Hello',
    deposits: async () => {
        setInterval(() => {
            pubSub.publish('PRICE_REFRESHED', {PriceRefreshed: price})
        }, 1000);

        //listen to 

        return await depositData.find();
    },
    ethPrice: () => { return {
        value: 222.324,
        currency: 'USD'
    }}
}

const Mutation = {
    deposit: async (root, {input}) => {
        const deposit = new depositData({
            name: input.name,
            price: {
                value: input.price.value,
                currency: input.price.currency
            }
        });
        return await deposit.save();
    }
}

const Subscription = {
    PriceRefreshed: {
        subscribe: () => pubSub.asyncIterator('PRICE_REFRESHED')
    },
    DepositRefreshed: {
        subscribe: () => pubSub.asyncIterator('DEPOSIT_REFRESHED')
    }
}

export {Query, Mutation, Subscription};