import { useCurrency } from "../context/CurrencyContext";

const ExchangeRatesTable = () => {
  const { rates } = useCurrency();

  return (
    <div className="exchange-table-container">
      <h2>Exchange Rates</h2>
      <div className="exchange-table-wrapper">
        <table className="exchange-table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([currency, rate], index) => (
              <tr key={currency}>
                <td>{currency.toUpperCase()}</td>
                <td>{rate.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeRatesTable;
