import axios from "axios";

type CryptoAPIClient = {
    getTrendingCoins: (currency: string) => Promise<any>;
    getCoinList: (currency: string) => Promise<any>;
    getCoinDetails: (coinId: string) => Promise<any>;
};

export const useCryptoAPIClient = (): CryptoAPIClient => {
    const base_url = "https://api.coingecko.com/api/v3/coins";

    const getRequest = async (url: string): Promise<any> => {
        const res = await axios.get(url);
        return res.data
    }

    const getTrendingCoins = async (currency: string): Promise<any> => {
        const url = `${base_url}/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
        return await getRequest(url);
    }

    const getCoinList = async (currency: string): Promise<any> => {
        const url = `${base_url}/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        return await getRequest(url);
    }

    const getCoinDetails = async (coinId: string): Promise<any> => {
        const url = `${base_url}/${coinId}`;
        return await getRequest(url);
    }

    return { getTrendingCoins, getCoinList, getCoinDetails };
};