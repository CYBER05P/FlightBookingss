import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { format } from "date-fns";

export default function ManageFlights() {
  const [flights, setFlights] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [airports, setAirports] = useState([]);
  const [flightForm, setFlightForm] = useState({
    flightNumber: "",
    departureTime: "",
    arrivalTime: "",
    economyPrice: "",
    businessPrice: "",
    firstClassPrice: "",
    originAirportId: "",
    destinationAirportId: "",
    aircraftId: "",
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchFlights();
    fetchAircrafts();
    fetchAirports();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get("/flights");
      setFlights(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch flights");
    }
  };

  const fetchAircrafts = async () => {
    try {
      const res = await axios.get("/admin/aircrafts");
      setAircrafts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch aircrafts");
    }
  };

  const fetchAirports = async () => {
    try {
      const res = await axios.get("/admin/airports");
      setAirports(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch airports");
    }
  };

  const handleAddOrEditFlight = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/flights/${editId}`, flightForm);
        setEditId(null);
      } else {
        await axios.post("/flights", flightForm);
      }
      fetchFlights();
      setFlightForm({
        flightNumber: "",
        departureTime: "",
        arrivalTime: "",
        economyPrice: "",
        businessPrice: "",
        firstClassPrice: "",
        originAirportId: "",
        destinationAirportId: "",
        aircraftId: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save flight");
    }
  };

  const handleEdit = (flight) => {
    setFlightForm(flight);
    setEditId(flight.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this flight?")) return;
    try {
      await axios.delete(`/flights/${id}`);
      fetchFlights();
    } catch (err) {
      console.error(err);
      alert("Failed to delete flight");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-4">Manage Flights</h2>

      {/* Search & Sort */}
      <div className="bg-white p-4 shadow-md rounded-md mb-6 space-y-4">
        <h3 className="text-xl font-semibold">Search & Sort Flights</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by Flight Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 flex-1"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 flex-1 md:max-w-xs"
          >
            <option value="">Sort</option>
            <option value="priceLowHigh">Economy Price: Low to High</option>
            <option value="priceHighLow">Economy Price: High to Low</option>
            <option value="businessLowHigh">Business Price: Low to High</option>
            <option value="firstLowHigh">First Class Price: Low to High</option>
            <option value="dateAsc">Departure Date: Earliest First</option>
          </select>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white p-4 shadow-md rounded-md space-y-4">
        <h3 className="text-xl font-semibold">{editId ? "Edit Flight" : "Add New Flight"}</h3>
        <form onSubmit={handleAddOrEditFlight} className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Flight Number" value={flightForm.flightNumber} onChange={(e) => setFlightForm({ ...flightForm, flightNumber: e.target.value })} className="border p-2 w-full" required />

          <input type="datetime-local" value={flightForm.departureTime} onChange={(e) => setFlightForm({ ...flightForm, departureTime: e.target.value })} className="border p-2 w-full" required />

          <input type="datetime-local" value={flightForm.arrivalTime} onChange={(e) => setFlightForm({ ...flightForm, arrivalTime: e.target.value })} className="border p-2 w-full" required />

          <input type="number" placeholder="Economy Price" value={flightForm.economyPrice} onChange={(e) => setFlightForm({ ...flightForm, economyPrice: e.target.value })} className="border p-2 w-full" required />

          <input type="number" placeholder="Business Price" value={flightForm.businessPrice} onChange={(e) => setFlightForm({ ...flightForm, businessPrice: e.target.value })} className="border p-2 w-full" required />

          <input type="number" placeholder="First Class Price" value={flightForm.firstClassPrice} onChange={(e) => setFlightForm({ ...flightForm, firstClassPrice: e.target.value })} className="border p-2 w-full" required />

          <select value={flightForm.originAirportId} onChange={(e) => setFlightForm({ ...flightForm, originAirportId: e.target.value })} className="border p-2 w-full" required>
            <option value="">Select Origin Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>{airport.name} ({airport.code})</option>
            ))}
          </select>

          <select value={flightForm.destinationAirportId} onChange={(e) => setFlightForm({ ...flightForm, destinationAirportId: e.target.value })} className="border p-2 w-full" required>
            <option value="">Select Destination Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>{airport.name} ({airport.code})</option>
            ))}
          </select>

          <select value={flightForm.aircraftId} onChange={(e) => setFlightForm({ ...flightForm, aircraftId: e.target.value })} className="border p-2 w-full" required>
            <option value="">Select Aircraft</option>
            {aircrafts.map((aircraft) => (
              <option key={aircraft.id} value={aircraft.id}>{aircraft.model}</option>
            ))}
          </select>

          <div className="md:col-span-2">
            <button className="bg-blue-600 text-white px-6 py-2 rounded w-full md:w-auto">
              {editId ? "Update Flight" : "Add Flight"}
            </button>
          </div>
        </form>
      </div>

      {/* Flights Table */}
      <div className="overflow-x-auto mt-8">
        <table className="w-full border shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Flight Number</th>
              <th className="p-2 border">Departure</th>
              <th className="p-2 border">Arrival</th>
              <th className="p-2 border">Economy</th>
              <th className="p-2 border">Business</th>
              <th className="p-2 border">First Class</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights
              .filter(f => f.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()))
              .sort((a, b) => {
                if (sortBy === "priceLowHigh") return a.economyPrice - b.economyPrice;
                if (sortBy === "priceHighLow") return b.economyPrice - a.economyPrice;
                if (sortBy === "businessLowHigh") return a.businessPrice - b.businessPrice;
                if (sortBy === "firstLowHigh") return a.firstClassPrice - b.firstClassPrice;
                if (sortBy === "dateAsc") return new Date(a.departureTime) - new Date(b.departureTime);
                return 0;
              })
              .map((flight) => (
                <tr key={flight.id} className="border-t">
                  <td className="p-2 border">{flight.flightNumber}</td>
                  <td className="p-2 border">{format(new Date(flight.departureTime), "dd/MM/yyyy hh:mm a")}</td>
                  <td className="p-2 border">{format(new Date(flight.arrivalTime), "dd/MM/yyyy hh:mm a")}</td>
                  <td className="p-2 border">{flight.economyPrice}</td>
                  <td className="p-2 border">{flight.businessPrice}</td>
                  <td className="p-2 border">{flight.firstClassPrice}</td>
                  <td className="p-2 border flex space-x-2">
                    <button onClick={() => handleEdit(flight)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(flight.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
