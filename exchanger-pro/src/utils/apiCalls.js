import axios from "axios";

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest";

export const fetchExchangeRates = async (base) => {
    try {
      const response = await axios.get(`${BASE_URL}/currencies/${base}.json`);
      if (!response.data[base]) {
        throw new Error("Invalid currency data received");
      }
      return response.data[base];
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      return {};
    }
  };
  

  export const fetchHistoricalRates = async (base, target) => {
    try {
      const today = new Date();
      const historicalData = [];
  
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  
        const response = await axios.get(
          `https://api.exchangerate.host/${formattedDate}?base=${base}&symbols=${target}`
        );
  
        if (response.data && response.data.rates) {
          historicalData.push({
            date: formattedDate,
            rate: response.data.rates[target] || null,
          });
        }
      }
  
      return historicalData;
    } catch (error) {
      console.error("Error fetching historical rates:", error);
      return [];
    }
  };
  
  
