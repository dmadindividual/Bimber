import React, { createContext, useState, useEffect } from 'react';

export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
    const [AllCoin, setAllCoin] = useState([]);
    const [TrendingCoins, setTrendingCoins] = useState([]);
    const [GlobalMarketData, setGlobalMarketData] = useState({});
    const [Currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchCoinData = async () => {
        try {
            const coinResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency.name}`, {
                headers: {
                    'x-cg-demo-api-key': 'CG-EFfUfUrwojyd6RFTSZpuBmwc'
                }
            });
            const coinData = await coinResponse.json();
            setAllCoin(coinData);

            const trendingResponse = await fetch('https://api.coingecko.com/api/v3/search/trending', {
                headers: {
                    'x-cg-demo-api-key': 'CG-EFfUfUrwojyd6RFTSZpuBmwc'
                }
            });
            const trendingData = await trendingResponse.json();
            setTrendingCoins(trendingData.coins);

            const globalResponse = await fetch('https://api.coingecko.com/api/v3/global', {
                headers: {
                    'x-cg-demo-api-key': 'CG-EFfUfUrwojyd6RFTSZpuBmwc'
                }
            });
            const globalData = await globalResponse.json();
            setGlobalMarketData(globalData.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // Fetch initial data
        fetchCoinData();

        // Set interval to fetch data every 3 seconds
        const interval = setInterval(fetchCoinData, 3000); // Fetch every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [Currency]); // Re-fetch data when currency changes

    const contextValue = {
        AllCoin,
        TrendingCoins,
        GlobalMarketData,
        Currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinProvider;
