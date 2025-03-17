import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">💱 Currency Exchange</h1>
        <div className="flex gap-6">
          <Link
            to="/"
            className="text-white font-medium hover:text-gray-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/exchange-rates"
            className="text-white font-medium hover:text-gray-200 transition duration-300"
          >
            Exchange Rates
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
