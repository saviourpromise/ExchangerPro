import { createContext, useContext, useState, useEffect } from "react";
import { fetchExchangeRates } from "../utils/apiCalls";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("usd");

  useEffect(() => {
    fetchExchangeRates(baseCurrency).then(setRates);
  }, [baseCurrency]);

  return (
    <CurrencyContext.Provider value={{ rates, baseCurrency, setBaseCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
