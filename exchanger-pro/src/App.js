import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CurrencyProvider } from "./context/CurrencyContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExchangeRates from "./pages/ExchangeRates";

function App() {
  return (
    <CurrencyProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
        </Routes>
      </Router>
    </CurrencyProvider>
  );
}

export default App;
