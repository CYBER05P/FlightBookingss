import { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings/all");
      setBookings(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch bookings");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    applyFilters(term, destinationFilter);
  };

  const handleDestinationFilter = (e) => {
    const dest = e.target.value;
    setDestinationFilter(dest);
    applyFilters(search, dest);
  };

  const applyFilters = (searchTerm, dest) => {
    let results = [...bookings];

    if (searchTerm) {
      results = results.filter((b) =>
        b.name?.toLowerCase().includes(searchTerm)
      );
    }

    if (dest) {
      results = results.filter((b) =>
        b.destination?.toLowerCase() === dest.toLowerCase()
      );
    }

    setFiltered(results);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>

      <div className="flex flex-col md:flex-row md:space-x-4 mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by Passenger Name"
          value={search}
          onChange={handleSearch}
          className="border p-2 w-full md:w-1/3"
        />

        <select
          value={destinationFilter}
          onChange={handleDestinationFilter}
          className="border p-2 w-full md:w-1/3"
        >
          <option value="">Filter by Destination</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Mombasa">Mombasa</option>
          <option value="Dubai">Dubai</option>
          <option value="Kisumu">Kisumu</option>
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Passenger</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Flight Number</th>
            <th className="p-2 border">Departure</th>
            <th className="p-2 border">Arrival</th>
            <th className="p-2 border">Seat Class</th>
            <th className="p-2 border">Seats</th>
            <th className="p-2 border">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-2 border">{b.name}</td>
              <td className="p-2 border">{b.email}</td>
              <td className="p-2 border">{b.flightNumber}</td>
              <td className="p-2 border">
                {b.departureTime?.split("T")[0]}{" "}
                {b.departureTime?.split("T")[1]?.slice(0, 5)}
              </td>
              <td className="p-2 border">
                {b.arrivalTime?.split("T")[0]}{" "}
                {b.arrivalTime?.split("T")[1]?.slice(0, 5)}
              </td>
              <td className="p-2 border">
                {Array.isArray(b.seatClasses)
                  ? b.seatClasses.join(", ")
                  : b.seatClasses}
              </td>
              <td className="p-2 border">
                {Array.isArray(b.seatNumbers)
                  ? b.seatNumbers.join(", ")
                  : b.seatNumbers}
              </td>
              <td className="p-2 border">{b.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
