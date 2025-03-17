import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a currency..."
        className="border p-2 rounded-md w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
