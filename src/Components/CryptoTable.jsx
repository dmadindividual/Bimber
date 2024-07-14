import React, { useContext, useState } from "react";
import { CoinContext } from "../Context/CoinContext";
import { Link } from "react-router-dom";

const CryptoTable = ({ coinsPerPage }) => {
  const { AllCoin, Currency } = useContext(CoinContext);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for pagination
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = AllCoin.slice(indexOfFirstCoin, indexOfLastCoin);

  const nextPage = () => {
    if (indexOfLastCoin < AllCoin.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (indexOfFirstCoin > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 shadow-md rounded-lg text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="py-2 px-4 text-center sm:py-4 sm:px-6">#</th>
              <th className="py-2 px-4 text-left sm:py-4 sm:px-6">Name</th>
              <th className="py-2 px-4 text-center sm:py-4 sm:px-6">Price</th>
              <th className="py-2 px-4 text-center sm:py-4 sm:px-6">24h Change</th>
              <th className="py-2 px-4 text-center sm:py-4 sm:px-6">24h%</th>
              <th className="py-2 px-4 text-center sm:py-4 sm:px-6">Market Cap</th>
              <th className="py-2 px-4 text-center sm:py-4 sm:px-6">Volume (24h)</th>
              <th className="py-2 px-4 text-center sm:py-4 sm:px-6">Circulating Supply</th>
            </tr>
          </thead>
          <tbody>
            {currentCoins.map((item, index) => (
              <tr key={index} className="bg-gray-800 border-b border-gray-700 cursor-pointer transition-transform transform hover:bg-gray-700 hover:scale-105">
                <td className="py-2 px-4 text-center sm:py-4 sm:px-6">{item.market_cap_rank}</td>
                <td className="py-2 px-4 text-left flex items-center space-x-3 sm:py-4 sm:px-6">
                  <Link to={`/coin/${item.id}`} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-6 h-6 rounded-full sm:w-8 sm:h-8" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </td>
                <td className="py-2 px-4 text-center sm:py-4 sm:px-6">
                  {`${Currency.symbol}${item.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </td>
                <td className={`py-2 px-4 text-center sm:py-4 sm:px-6 ${item.price_change_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                  {`${Currency.symbol}${item.price_change_24h?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </td>
                <td className={`py-2 px-4 text-center sm:py-4 sm:px-6 ${item.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                  {item.price_change_percentage_24h?.toFixed(1)}%
                </td>
                <td className="py-2 px-4 text-center sm:py-4 sm:px-6">
                  {`${Currency.symbol}${item.market_cap.toLocaleString()}`}
                </td>
                <td className="py-2 px-4 text-center sm:py-4 sm:px-6">
                  {`${Currency.symbol}${item.total_volume.toLocaleString()}`}
                </td>
                <td className="py-2 px-4 text-center sm:py-4 sm:px-6">
                  {item.circulating_supply.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-6">
          <button
            onClick={prevPage}
            className={`py-2 px-4 rounded-lg ${indexOfFirstCoin <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white'}`}
            disabled={indexOfFirstCoin <= 0}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            className={`py-2 px-4 rounded-lg ${indexOfLastCoin >= AllCoin.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white'}`}
            disabled={indexOfLastCoin >= AllCoin.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
