import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../Context/CoinContext";
import { FaArrowRight } from "react-icons/fa";


const Trending = () => {
  const { TrendingCoins, Currency, GlobalMarketData } = useContext(CoinContext);
  const [displayTrendingCoins1, setDisplayTrendingCoins1] = useState([]);
  const [displayTrendingCoins2, setDisplayTrendingCoins2] = useState([]);

  const Text = "Today's Cryptocurrency Prices by Market Cap";

  const getRandomTrendingCoins = (excludeCoins) => {
    const shuffled = TrendingCoins.filter(coin => !excludeCoins.includes(coin.item.id)).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    if (TrendingCoins.length) {
      const coins1 = getRandomTrendingCoins([]);
      setDisplayTrendingCoins1(coins1);

      const coins2 = getRandomTrendingCoins(coins1.map(coin => coin.item.id));
      setDisplayTrendingCoins2(coins2);
    }

    const interval = setInterval(() => {
      if (TrendingCoins.length) {
        const coins1 = getRandomTrendingCoins([]);
        setDisplayTrendingCoins1(coins1);

        const coins2 = getRandomTrendingCoins(coins1.map(coin => coin.item.id));
        setDisplayTrendingCoins2(coins2);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [TrendingCoins]);

  const getColor = (currentPrice, previousPrice) => {
    if (currentPrice && previousPrice) {
      if (currentPrice < previousPrice) return 'text-red-500';
      else if (currentPrice > previousPrice) return 'text-green-500';
    }
    return 'text-green-500';
  };

  const formatNumber = (number) => {
    if (typeof number === 'undefined' || isNaN(number)) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: Currency.name,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="container mx-auto mt-6 text-white px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6">{Text}</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full mt-12">
        <div className="flex flex-col gap-4 flex-grow-0 w-full lg:w-96 bg-[#1f2233] p-6 rounded-lg shadow-lg">
          <div className="flex justify-between bg-inherit items-center border-b border-gray-700 pb-2 mb-2">
            <h3 className="text-2xl bg-inherit  font-medium italic">Trending</h3>
            <h3 className="text-sm bg-inherit text-blue-400 cursor-pointer"><FaArrowRight/></h3>
          </div>
          {displayTrendingCoins1.map((coin, index) => (
            <Link to={`/coin/${coin.item.id}`} key={index} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-none">
              <div className="flex items-center ">
            <img src={coin.item.small} alt={coin.item.name} className="w-10 h-10 rounded-full mr-4" />
            <h4 className="text-base font-medium">{coin.item.name}</h4>
            </div>
              <h4 className={`text-base font-medium ${getColor(coin.item.price_btc, coin.item.previous_price_btc)}`}>
                {`${Currency.symbol}${coin.item.price_btc.toFixed(8)}`}
              </h4>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 flex-grow-0 w-full lg:w-96 bg-[#1f2233] p-6 rounded-lg shadow-lg">
           <div className="flex justify-between bg-inherit items-center border-b border-gray-700 pb-2 mb-2">
            <h3 className="text-2xl bg-inherit  font-medium italic">Trending</h3>
            <h3 className="text-sm bg-inherit text-blue-400 cursor-pointer"><FaArrowRight/></h3>
          </div>
          {displayTrendingCoins2.map((coin, index) => (
            <Link to={`/coin/${coin.item.id}`} key={index} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-none">
            <div className="flex items-center ">
            <img src={coin.item.small} alt={coin.item.name} className="w-10 h-10 rounded-full mr-4" />
            <h4 className="text-base font-medium">{coin.item.name}</h4>
            </div>
              <h4 className={`text-base font-medium ${getColor(coin.item.price_btc, coin.item.previous_price_btc)}`}>
                {`${Currency.symbol}${coin.item.price_btc.toFixed(8)}`}
              </h4>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 flex-grow w-full lg:w-96 bg-[#1f2233] p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
          <h3 className="text-2xl font-medium italic">Overview</h3>
          <h3 className="text-sm text-blue-400 cursor-pointer"><FaArrowRight/></h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between flex-1">
            <div className="flex flex-col gap-4 sm:gap-8 w-full">
              <h2 className="text-lg sm:text-xl font-medium">Market Cap</h2>
              <h2 className={`text-xl sm:text-2xl font-bold ${getColor(GlobalMarketData.total_market_cap && GlobalMarketData.total_market_cap[Currency.name], GlobalMarketData.previous_market_cap && GlobalMarketData.previous_market_cap[Currency.name])}`}>
                {formatNumber(GlobalMarketData.total_market_cap && GlobalMarketData.total_market_cap[Currency.name])}
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:gap-8 w-full">
              <h2 className="text-lg sm:text-xl font-medium">24h Volume</h2>
              <h2 className={`text-xl sm:text-2xl font-bold ${getColor(GlobalMarketData.total_volume && GlobalMarketData.total_volume[Currency.name], GlobalMarketData.previous_volume && GlobalMarketData.previous_volume[Currency.name])}`}>
                {formatNumber(GlobalMarketData.total_volume && GlobalMarketData.total_volume[Currency.name])}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
