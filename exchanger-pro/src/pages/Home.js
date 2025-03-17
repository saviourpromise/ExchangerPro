const Home = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-bold mb-4">Welcome to the Currency Exchange Platform</h2>
        <p className="text-gray-600 max-w-lg">
          Convert currencies, view exchange rates, and track historical trends all in one place.
        </p>
        <a
          href="/exchange-rates"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Get Started
        </a>
      </div>
    );
  };
  
  export default Home;
  