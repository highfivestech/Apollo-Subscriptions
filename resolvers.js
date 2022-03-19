
import { depositData } from "./models/index.js";
import { pubSub } from "./pubSub.js";
import { fetchPrice } from "./infura.js";
import CoinGecko from 'coingecko-api';

const Query = {
    deposits: async () => {
        return await depositData.find();
    },
    ethPrice: async () => {
        const res = await fetchPrice();
        return {
        value: res.DAI,
        currency: 'DAI'
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
    /*
    PriceRefreshed gets Price using uniswap
    */
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
    /*
    PriceFromCryptoLib gets Price with CoinGecko
    */
    PriceFromCryptoLib: {
        resolve: async () => {
            const CoinGeckoClient = new CoinGecko();
            let data = await CoinGeckoClient.exchanges.fetchTickers("bitfinex", {
                coin_ids: ["bitcoin", "ethereum"],
              });

            const _coinList = {};
            const _datacc = data.data.tickers.filter((t) => t.target == "USD");
            
            return _datacc.map(d => {return {
                name: d.base,
                value: d.last,
                currency: d.target
            }});    
        }       
        ,
        subscribe: () => pubSub.asyncIterator('PRICE_REFRESHED_CRYPTO_LIB')
    },
    DepositRefreshed: {
        subscribe: () => pubSub.asyncIterator('DEPOSIT_REFRESHED')
    }
}

export {Query, Mutation, Subscription};