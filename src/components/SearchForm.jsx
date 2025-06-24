import { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";

const SearchForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState([]);

  // Fetch available airports
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await axios.post("http://192.168.1.143:8085/api/flights/search");
        console.log("Fetched airport data:", res.data);  
        setAirports(res.data);
      } catch (err) {
        console.error("Could not fetch airports", err);
      }
    };
    fetchAirports();
  }, []);

  const handleSearch = async () => {
    if (!from || !to || !departureDate) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://192.168.1.143:8085/api/flights/search", {
        from,       
        to,
        departureDate,
      });

      console.log("Search results:", response.data);
      // navigate('/results', { state: response.data });
    } catch (err) {
      console.error("Search failed", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* From Dropdown */}
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="pl-10 p-3 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">From</option>
            {airports.map((airport, idx) => (
              <option key={idx} value={airport.code}>
                {airport.location} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* To Dropdown */}
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="pl-10 p-3 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">To</option>
            {airports.map((airport, idx) => (
              <option key={idx} value={airport.code}>
                {airport.location} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Date to Pick */}
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="pl-10 p-3 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className="mt-5 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 font-semibold w-full transition-colors"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <>
            <FaSearch />
            Search Flights
          </>
        )}
      </button>
    </div>
  );
};

export default SearchForm;
