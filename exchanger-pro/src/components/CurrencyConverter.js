import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

const CurrencyConverter = () => {
  const { rates, baseCurrency, setBaseCurrency } = useCurrency();
  const [targetCurrency, setTargetCurrency] = useState("eur");
  const [amount, setAmount] = useState(1);

  const conversionRate = rates[targetCurrency] || 1;
  const convertedAmount = (amount * conversionRate).toFixed(2);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Currency Converter</h2>

      {/* Base Currency Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Base Currency</label>
        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Target Currency Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Currency</label>
        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Converted Amount */}
      <p className="text-lg font-semibold text-center">
        Converted Amount: <span className="text-blue-500">{convertedAmount}</span>
      </p>
    </div>
  );
};

export default CurrencyConverter;
