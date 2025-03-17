import { useEffect, useState } from "react";
import axios from "axios";

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
        setRates(response.data.rates);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch exchange rates.");
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  if (loading) return <p className="loading">Loading exchange rates...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="exchange-container">
      <h2 className="exchange-title">Exchange Rates (Base: USD)</h2>
      <ul className="exchange-list">
        {Object.keys(rates).map((currency) => (
          <li key={currency} className="exchange-item">
            {currency}: {rates[currency]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRates;
