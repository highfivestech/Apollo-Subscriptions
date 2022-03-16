
import { depositData } from "./models/index.js";
import { pubSub } from "./pubSub.js";

const Query = {
    greeting: () => 'Hello',
    deposits: async () => {
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