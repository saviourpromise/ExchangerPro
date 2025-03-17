import axios from "axios";

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest";

export const fetchExchangeRates = async (base) => {
  try {
    const response = await axios.get(`${BASE_URL}/currencies/${base}.json`);
    return response.data[base];
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};

export const fetchHistoricalRates = async (base, date) => {
  try {
    const response = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${base}.json`
    );
    return response.data[base];
  } catch (error) {
    console.error("Error fetching historical rates:", error);
    return null;
  }
};
