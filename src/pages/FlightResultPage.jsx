import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaPlaneArrival, FaMoneyBill, FaCheckCircle, FaTimesCircle, FaSync } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from '../axiosConfig'; // Update this path if needed

const FlightResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFlights = location.state || null;
  const [flights, setFlights] = useState(initialFlights || []);
  const [loading, setLoading] = useState(!initialFlights);
  const [error, setError] = useState(null);

  const [sortOption, setSortOption] = useState('price');
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const promoCode = localStorage.getItem('promoCode');
  const discount = parseFloat(localStorage.getItem('promoDiscount')) || 0;

  const handleBook = (flight) => {
    navigate('/booking', { state: flight });
  };

  const handleReset = () => {
    setFromFilter('');
    setToFilter('');
    setStatusFilter('ALL');
    setSortOption('price');
  };

  // Fetch flights if no state passed
  useEffect(() => {
    if (!initialFlights) {
      const fetchFlights = async () => {
        try {
          const searchParams = JSON.parse(localStorage.getItem('lastSearch'));
          if (!searchParams) {
            setError('No search parameters found.');
            setLoading(false);
            return;
          }

          const res = await axios.post('http://192.168.1.143:8085/api/flights/search', searchParams);
          setFlights(res.data);
        } catch (err) {
          console.error('Failed to fetch flights:', err);
          setError('Error loading flights. Try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchFlights();
    }
  }, [initialFlights]);

  const filteredFlights = Array.isArray(flights)
    ? flights.filter((flight) => {
        const fromMatch = flight.departureCity.toLowerCase().includes(fromFilter.toLowerCase());
        const toMatch = flight.arrivalCity.toLowerCase().includes(toFilter.toLowerCase());
        const statusMatch = statusFilter === 'ALL' || flight.flightStatus === statusFilter;
        return fromMatch && toMatch && statusMatch;
      })
    : [];

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortOption === 'price') return a.economyPrice - b.economyPrice;
    if (sortOption === 'time') return new Date(a.departureTime) - new Date(b.departureTime);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 md:p-8">
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
        Available Flights
      </h2>

      {promoCode && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center font-medium shadow">
          Promo Applied: {promoCode} — You save {(discount * 100)}% on all fares!
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <input
          type="text"
          placeholder="From City"
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="To City"
          value={toFilter}
          onChange={(e) => setToFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="price">Price (Lowest First)</option>
          <option value="time">Departure Time (Earliest First)</option>
        </select>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSync /> Reset
        </button>
      </div>

      {loading ? (
        <p className="text-center text-blue-700 font-medium">Loading flights...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : sortedFlights.length === 0 ? (
        <p className="text-center text-gray-600">No flights match your filters.</p>
      ) : (
        <div className="grid gap-8 max-w-5xl mx-auto">
          {sortedFlights.map((flight, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center border hover:scale-[1.02] hover:shadow-2xl transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-1 space-y-3 text-gray-700">
                <div className="flex items-center gap-4 text-xl font-semibold">
                  <FaPlaneDeparture className="text-blue-600" />
                  <span>{flight.departureCity} ({flight.departureAirportCode})</span>
                  <span className="text-gray-500">→</span>
                  <FaPlaneArrival className="text-green-600" />
                  <span>{flight.arrivalCity} ({flight.arrivalAirportCode})</span>
                </div>

                <div className="text-sm space-y-1">
                  <p>Departure: <strong>{moment(flight.departureTime).format('MMM D, YYYY h:mm A')}</strong></p>
                  <p>Arrival: <strong>{moment(flight.arrivalTime).format('MMM D, YYYY h:mm A')}</strong></p>
                  <p>Aircraft: {flight.aircraftModel}</p>
                  <p>Flight No: {flight.flightNumber}</p>
                </div>

                <div className="mt-2">
                  {flight.flightStatus === 'ACTIVE' ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                      <FaCheckCircle /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-red-100 text-red-700 rounded-full">
                      <FaTimesCircle /> Cancelled
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 md:mt-0 text-right space-y-3">
                <p className="flex items-center justify-end gap-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm inline-flex items-center gap-1">
                    <FaMoneyBill /> Economy: <strong>KSH {(flight.economyPrice * (1 - discount)).toFixed(2)}</strong>
                  </span>
                </p>
                <p className="flex items-center justify-end gap-2">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-sm inline-flex items-center gap-1">
                    <FaMoneyBill /> Business: <strong>KSH {(flight.businessPrice * (1 - discount)).toFixed(2)}</strong>
                  </span>
                </p>
                <p className="flex items-center justify-end gap-2">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-sm inline-flex items-center gap-1">
                    <FaMoneyBill /> First Class: <strong>KSH {(flight.firstClassPrice * (1 - discount)).toFixed(2)}</strong>
                  </span>
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBook(flight)}
                  disabled={flight.flightStatus !== 'ACTIVE'}
                  className={`mt-4 px-6 py-2 rounded-full text-white font-semibold transition ${
                    flight.flightStatus === 'ACTIVE'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {flight.flightStatus === 'ACTIVE' ? 'Book Now' : 'Unavailable'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightResultPage;
