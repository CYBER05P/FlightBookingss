import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const SearchForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await axios.get("http://192.168.1.143:8085/api/flights/airports");
        setAirports(res.data);
      } catch (err) {
        console.error("Failed to fetch airports:", err);
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
        date: departureDate,
      });

      console.log("Search results:", response.data);
      navigate('/flights', { state: response.data });  // Correct navigation
    } catch (err) {
      console.error("Search failed", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="backdrop-blur-lg bg-white/70 p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Find Your Perfect Flight
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="relative group">
          <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
          <input
            list="fromAirports"
            placeholder="From (City, Airport, or Country)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="pl-12 p-4 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <datalist id="fromAirports">
            {airports.map((airport, idx) => (
              <option key={idx} value={`${airport.location} (${airport.code})`} />
            ))}
          </datalist>
        </div>

        <div className="relative group">
          <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
          <input
            list="toAirports"
            placeholder="To (City, Airport, or Country)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="pl-12 p-4 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <datalist id="toAirports">
            {airports.map((airport, idx) => (
              <option key={idx} value={`${airport.location} (${airport.code})`} />
            ))}
          </datalist>
        </div>

        <div className="relative group">
          <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="pl-12 p-4 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSearch}
        disabled={loading}
        className="mt-8 flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 font-semibold w-full"
      >
        {loading ? "Searching..." : (
          <>
            <FaSearch />
            Search Flights
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default SearchForm;
