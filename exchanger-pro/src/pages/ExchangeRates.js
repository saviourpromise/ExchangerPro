import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import ExchangeRatesTable from "../components/ExchangeRatesTable";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ExchangeRates = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest/v1/currencies.json")
      .then(response => {
        const options = Object.keys(response.data).map(code => ({
          value: code,
          label: `${code.toUpperCase()} - ${response.data[code]}`
        }));
        setCurrencies(options);
      })
      .catch(error => console.error("Error fetching currencies:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      setLoading(true);
      axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency.toLowerCase()}.json`)
        .then(response => {
          setConversionRate(response.data[baseCurrency.toLowerCase()][targetCurrency.toLowerCase()]);
          setExchangeRates(response.data[baseCurrency.toLowerCase()]);
        })
        .catch(error => console.error("Error fetching exchange rates:", error))
        .finally(() => setLoading(false));
    }
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      setLoading(true);
      axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest/v1/${baseCurrency.toLowerCase()}.json`)
        .then(response => {
          const history = Object.keys(response.data)
            .slice(-7)
            .map(date => ({
              date,
              rate: response.data[date][targetCurrency.toLowerCase()]
            }));
          setHistoricalData(history);
        })
        .catch(error => console.error("Error fetching historical data:", error))
        .finally(() => setLoading(false));
    }
  }, [baseCurrency, targetCurrency]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-4">Currency Exchange</h2>

      {loading && <p className="text-gray-500 text-center">Loading data...</p>}

      <input
        type="text"
        placeholder="Search currency..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block text-sm font-semibold mb-1">Base Currency</label>
          <Select
            options={currencies}
            value={currencies.find(c => c.value === baseCurrency)}
            onChange={(selected) => setBaseCurrency(selected.value)}
            className="text-black"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-semibold mb-1">Target Currency</label>
          <Select
            options={currencies}
            value={currencies.find(c => c.value === targetCurrency)}
            onChange={(selected) => setTargetCurrency(selected.value)}
            className="text-black"
          />
        </div>
      </div>

      {conversionRate !== null && (
        <p className="text-xl font-semibold text-gray-700">
          1 {baseCurrency} = <span className="text-blue-600">{conversionRate}</span> {targetCurrency}
        </p>
      )}

      <h3 className="text-2xl font-bold mt-6">Exchange Rate Table</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border mt-4 bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-3">Currency</th>
              <th className="border p-3">Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(exchangeRates)
              .filter(currency => currency.includes(searchQuery.toLowerCase()))
              .slice(0, 10)
              .map(currency => (
                <tr key={currency} className="border hover:bg-gray-100 transition">
                  <td className="border p-3 text-gray-700 font-medium">{currency.toUpperCase()}</td>
                  <td className="border p-3 text-gray-700">{exchangeRates[currency].toFixed(4)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ExchangeRatesTable />

      <h3 className="text-2xl font-bold mt-6">Exchange Rate Trends (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historicalData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExchangeRates;
