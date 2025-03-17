import { useEffect, useState } from "react";
import { fetchHistoricalRates } from "../services/api";
import { Line } from "react-chartjs-2";

const HistoricalChart = ({ baseCurrency }) => {
  const [historicalData, setHistoricalData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const dates = [...Array(7).keys()].map((daysAgo) => {
        const date = new Date(today);
        date.setDate(today.getDate() - daysAgo);
        return date.toISOString().split("T")[0];
      });

      const data = {};
      for (let date of dates) {
        const rates = await fetchHistoricalRates(baseCurrency, date);
        if (rates) data[date] = rates["eur"];
      }
      setHistoricalData(data);
    };

    fetchData();
  }, [baseCurrency]);

  return (
    <Line
      data={{
        labels: Object.keys(historicalData),
        datasets: [
          {
            label: `EUR Rate Over Last 7 Days`,
            data: Object.values(historicalData),
            borderColor: "blue",
            fill: false,
          },
        ],
      }}
    />
  );
};

export default HistoricalChart;
