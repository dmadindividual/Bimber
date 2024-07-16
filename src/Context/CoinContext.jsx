import React, { createContext, useState, useEffect } from 'react';

export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
    // State to hold all coin data
    const [AllCoin, setAllCoin] = useState([]);
    // State to hold trending coins data
    const [TrendingCoins, setTrendingCoins] = useState([]);
    // State to hold global market data
    const [GlobalMarketData, setGlobalMarketData] = useState({});
    // State to hold the current currency
    const [Currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    // Function to fetch coin data from the CoinGecko API
    const fetchCoinData = async () => {
        try {
            // Fetch all coin data
            const coinResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency.name}`, {
                headers: {
                    'x-cg-demo-api-key': 'CG-EFfUfUrwojyd6RFTSZpuBmwc'
                }
            });
            const coinData = await coinResponse.json();
            setAllCoin(coinData);

            // Fetch trending coins data
            const trendingResponse = await fetch('https://api.coingecko.com/api/v3/search/trending', {
                headers: {
                    'x-cg-demo-api-key': 'CG-EFfUfUrwojyd6RFTSZpuBmwc'
                }
            });
            const trendingData = await trendingResponse.json();
            setTrendingCoins(trendingData.coins);

            // Fetch global market data
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
        const interval = setInterval(fetchCoinData, 3000);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [Currency]); // Re-fetch data when currency changes

    // Context value to be provided to consuming components
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
