import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>💱 Currency Exchange</h1>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/exchange-rates">Exchange Rates</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
