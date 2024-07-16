import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../Context/CoinContext";
import LineChart from "../Components/Charts/LineChart";

const CoinId = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const { Currency } = useContext(CoinContext);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [historicalData, setHistoricalData] = useState(null);
  const [timePeriod, setTimePeriod] = useState("30d"); // Default time period (30 days)

  // Fetch historical data for the coin
  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-EFfUfUrwojyd6RFTSZpuBmwc",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${Currency.name}&days=${timePeriod}`,
        options
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to truncate summary if it exceeds maxWords
  const truncateSummary = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  };

  // Fetch coin data
  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-EFfUfUrwojyd6RFTSZpuBmwc",
      },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch coin data and historical data when component mounts or dependencies change
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, Currency, timePeriod]);

  if (!coinData) {
    return <div className="p-4 mt-8 text-white">Loading...</div>;
  }

  // Determine whether to show full summary or truncated summary
  const summaryText = showFullSummary ? coinData.description.en : truncateSummary(coinData.description.en, 50);

  // Toggle handler for Read More/Read Less
  const toggleSummary = () => {
    setShowFullSummary(!showFullSummary);
  };

  // Extracting price information
  const priceChange24h = coinData.market_data.price_change_percentage_24h.toFixed(2);
  const high24h = Currency.symbol + coinData.market_data.high_24h[Currency.name.toLowerCase()].toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const low24h = Currency.symbol + coinData.market_data.low_24h[Currency.name.toLowerCase()].toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const marketCap = Currency.symbol + coinData.market_data.market_cap[Currency.name.toLowerCase()].toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const totalVolume = Currency.symbol + coinData.market_data.total_volume[Currency.name.toLowerCase()].toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Function to handle time period change
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  return (
    <div className="p-4 mt-8 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-white pb-4">
        <div className="flex items-center gap-4">
          <img src={coinData.image.small} alt={coinData.name} className="w-12 h-12" />
          <h1 className="text-2xl font-bold">{coinData.name}</h1>
        </div>
        <h1 className="text-2xl font-bold mt-4 md:mt-0">
          {Currency.symbol}{" "}
          {coinData.market_data.current_price[Currency.name.toLowerCase()].toLocaleString(undefined, {
            currency: Currency.name.toUpperCase(),
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Summary:</h3>
        <p>{summaryText}</p>
        {coinData.description.en.split(" ").length > 50 && (
          <button
            className="text-blue-500 mt-2 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-md px-4 py-2"
            onClick={toggleSummary}
          >
            {showFullSummary ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      <div>
        {historicalData ? (
          <LineChart historicalData={historicalData} />
        ) : (
          <div className="flex justify-center items-center mt-5">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center mt-5">
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              className={`text-blue-500 ${timePeriod === "30d" ? "font-bold" : ""} hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-md px-4 py-2`}
              onClick={() => handleTimePeriodChange("30d")}
            >
              30 Days
            </button>
            <button
              className={`text-blue-500 ${timePeriod === "7d" ? "font-bold" : ""} hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-md px-4 py-2`}
              onClick={() => handleTimePeriodChange("7d")}
            >
              7 Days
            </button>
            <button
              className={`text-blue-500 ${timePeriod === "12h" ? "font-bold" : ""} hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-md px-4 py-2`}
              onClick={() => handleTimePeriodChange("12h")}
            >
              12 Hours
            </button>
            <button
              className={`text-blue-500 ${timePeriod === "7h" ? "font-bold" : ""} hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-md px-4 py-2`}
              onClick={() => handleTimePeriodChange("7h")}
            >
              7 Hours
            </button>
            <button
              className={`text-blue-500 ${timePeriod === "1y" ? "font-bold" : ""} hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-md px-4 py-2`}
              onClick={() => handleTimePeriodChange("1y")}
            >
              1 Year
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-6 gap-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Price Change (24h)</p>
          <h3 className={`${priceChange24h >= 0 ? "text-green-500" : "text-red-500"} text-lg font-semibold`}>{priceChange24h}%</h3>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">High (24h)</p>
          <h3 className="text-lg">{high24h}</h3>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Low (24h)</p>
          <h3 className="text-lg">{low24h}</h3>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Market Cap</p>
          <h3 className="text-lg">{marketCap}</h3>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Total Volume (24h)</p>
          <h3 className="text-lg">{totalVolume}</h3>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Links:</h3>
        <div className="flex flex-col">
          <div className="flex justify-between items-center text-lg">
            <span>Homepage:</span>
            <a
              href={coinData.links.homepage[0]}
              className="text-blue-500 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {coinData.links.homepage[0]}
            </a>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span>Blockchain Sites:</span>
            <ul className="list-disc list-inside">
              {coinData.links.blockchain_site
                .filter((link) => link)
                .map((link, index) => (
                  <li key={index} className="break-all">
                    <a
                      href={link}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span>Twitter:</span>
            <a
              href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{coinData.links.twitter_screen_name}
            </a>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span>Telegram:</span>
            <a
              href={`https://t.me/${coinData.links.telegram_channel_identifier}`}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {coinData.links.telegram_channel_identifier}
            </a>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span>Subreddit:</span>
            <a
              href={coinData.links.subreddit_url}
              className="text-blue-500 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {coinData.links.subreddit_url}
            </a>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span>GitHub:</span>
            <a
              href={coinData.links.repos_url.github[0]}
              className="text-blue-500 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {coinData.links.repos_url.github[0]}
             
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinId;
