import axios from "axios";

type CryptoAPIClient = {
    getTrendingCoins: (currency: string) => Promise<any>;
    getCoinList: (currency: string) => Promise<any>;
};

export const useCryptoAPIClient = (): CryptoAPIClient => {
    const base_url = "https://api.coingecko.com/api/v3/coins";

    const getTrendingCoins = async (currency: string): Promise<any> => {
        const url = `${base_url}/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`

        const res = await axios.get(url);

        return res.data;
    }

    const getCoinList = async (currency: string): Promise<any> => {
        const url = `${base_url}/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

        const res = await axios.get(url);

        return res.data;
    }

    return { getTrendingCoins, getCoinList };
};