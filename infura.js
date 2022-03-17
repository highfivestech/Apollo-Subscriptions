import { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } from '@uniswap/sdk';
import { ethers } from 'ethers';

const url = 'https://mainnet.infura.io/v3/fd671da62c0b40c4883a5454463a2922';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const chainId = ChainId.MAINNET;
const tokenAddress = '0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA';

export async function fetchPrice() {
    const dai = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
	const weth = WETH[chainId];
	const pair = await Fetcher.fetchPairData(dai, weth, customHttpProvider);
	const route = new Route([pair], weth);
	//const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
    return {
        DAI: route.midPrice.toSignificant(6)
    };
}

// const init = async () => {
	
// }


// PROJECT ID
// fd671da62c0b40c4883a5454463a2922
// PROJECT SECRET
// 9bf2f306d6c440baa15ac8a86a5f2bdb
// ENDPOINTS

// MAINNET
// https://mainnet.infura.io/v3/fd671da62c0b40c4883a5454463a2922
// wss://mainnet.infura.io/ws/v3/fd671da62c0b40c4883a5454463a2922