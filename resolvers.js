
import { depositData } from "./models/index.js";
import { pubSub } from "./pubSub.js";
import { fetchPrice } from "./infura.js";

const Query = {
    greeting: () => 'Hello',
    deposits: async () => {
        return await depositData.find();
    },
    ethPrice: async () => {
        const res = await fetchPrice();
        return {
        value: res.DAI,
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
        resolve: async () => {
            const price = await fetchPrice();
            return {
                value: price.DAI,
                currency: 'DAI'
            }
        },
        subscribe: () => pubSub.asyncIterator('PRICE_REFRESHED')
    },
    DepositRefreshed: {
        subscribe: () => pubSub.asyncIterator('DEPOSIT_REFRESHED')
    }
}

export {Query, Mutation, Subscription};