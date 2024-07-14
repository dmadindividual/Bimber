import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../Context/CoinContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { setCurrency } = useContext(CoinContext);
  const [cryptoStats, setCryptoStats] = useState({ crypto: 0, exchanges: 0, marketCap: 0 });

  const fetchCryptoStats = async () => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      if (!response.ok) {
        throw new Error(`Failed to fetch global data: ${response.statusText}`);
      }
      const data = await response.json();
      setCryptoStats({
        crypto: data.data.active_cryptocurrencies,
        exchanges: data.data.markets,
        marketCap: data.data.total_market_cap.usd,
      });
    } catch (err) {
      console.error("Error fetching global data:", err);
    }
  };

  useEffect(() => {
    fetchCryptoStats();
  }, []);

  const currencyHandler = (event) => {
    const selectedCurrency = event.target.value;

    if (selectedCurrency === "usd") {
      setCurrency({ name: "usd", symbol: "$" });
    } else if (selectedCurrency === "eur") {
      setCurrency({ name: "eur", symbol: "€" });
    } else if (selectedCurrency === "gbp") {
      setCurrency({ name: "gbp", symbol: "£" });
    } else if (selectedCurrency === "jpy") {
      setCurrency({ name: "jpy", symbol: "¥" });
    } else if (selectedCurrency === "aud") {
      setCurrency({ name: "aud", symbol: "A$" });
    } else if (selectedCurrency === "cad") {
      setCurrency({ name: "cad", symbol: "C$" });
    } else if (selectedCurrency === "chf") {
      setCurrency({ name: "chf", symbol: "CHF" });
    } else if (selectedCurrency === "cny") {
      setCurrency({ name: "cny", symbol: "¥" });
    } else if (selectedCurrency === "hkd") {
      setCurrency({ name: "hkd", symbol: "HK$" });
    } else if (selectedCurrency === "inr") {
      setCurrency({ name: "inr", symbol: "₹" });
    } else if (selectedCurrency === "ngn") {
      setCurrency({ name: "ngn", symbol: "₦" });
    } else if (selectedCurrency === "brl") {
      setCurrency({ name: "brl", symbol: "R$" });
    } else {
      setCurrency({ name: "usd", symbol: "$" }); // default to USD
    }
  };

  return (
    <header className="bg-[#1a1c2c] py-4">
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <Link to={"/"}>
            <h3 className="text-white text-2xl font-bold italic tracking-wide">Bimber</h3>
          </Link>
          <div className="bg-[#151822] text-white py-2 px-4 flex flex-wrap items-center gap-2 sm:gap-4 rounded-lg shadow-lg">
            <span className="bg-inherit text-base font-semibold">Crypto: <span className="font-bold">{cryptoStats.crypto.toLocaleString()}</span></span>
            <span className="bg-inherit text-base font-semibold">Exchanges: <span className="font-bold">{cryptoStats.exchanges.toLocaleString()}</span></span>
            <span className="bg-inherit text-base font-semibold">Market Cap: <span className="font-bold">${cryptoStats.marketCap.toLocaleString()}</span></span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            className="text-white cursor-pointer text-base  font-mono font-medium bg-[#151822] p-2 rounded-md shadow-md"
            onChange={currencyHandler}
          >
            <option value="usd">🇺🇸 USD</option>
            <option value="eur">🇪🇺 EUR</option>
            <option value="gbp">🇬🇧 GBP</option>
            <option value="jpy">🇯🇵 JPY</option>
            <option value="aud">🇦🇺 AUD</option>
            <option value="cad">🇨🇦 CAD</option>
            <option value="chf">🇨🇭 CHF</option>
            <option value="cny">🇨🇳 CNY</option>
            <option value="inr">🇮🇳 INR</option>
            <option value="ngn">🇳🇬 NGN</option>
            <option value="brl">🇧🇷 BRL</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;
