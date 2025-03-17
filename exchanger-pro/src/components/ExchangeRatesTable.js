import { useCurrency } from "../context/CurrencyContext";

const ExchangeRatesTable = () => {
  const { rates } = useCurrency();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Exchange Rates</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">Currency</th>
              <th className="py-2 px-4 text-left">Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([currency, rate], index) => (
              <tr key={currency} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-2 px-4 border border-gray-300">{currency.toUpperCase()}</td>
                <td className="py-2 px-4 border border-gray-300">{rate.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeRatesTable;
