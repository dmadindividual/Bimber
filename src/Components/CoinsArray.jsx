import React, { useState } from "react";
import CryptoTable from "./CryptoTable";

const CoinsArray = () => {
  const [coinsPerPage, setCoinsPerPage] = useState(20);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-24 flex flex-col gap-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <span className="text-lg sm:text-xl font-semibold">Cryptocurrencies</span>
          <span className="text-lg sm:text-xl font-semibold">Categories</span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 sm:hidden ">
            <span className="text-md sm:text-lg font-medium">AI & Big Data</span>
            <span className="text-md sm:text-lg font-medium">BRC-20</span>
            <span className="text-md sm:text-lg font-medium">Gaming</span>
            <span className="text-md sm:text-lg font-medium">Depin</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="text-md sm:text-lg font-medium bg-gray-800 p-2 rounded-md">Customize</button>
          <select
            className="text-white cursor-pointer font-mono font-medium bg-gray-800 p-2 rounded-md"
            onChange={(e) => setCoinsPerPage(Number(e.target.value))}
          >
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
            <option value={100}>Show 100</option>
          </select>
        </div>
      </div>
      <CryptoTable coinsPerPage={coinsPerPage} />
    </div>
  );
};

export default CoinsArray;
