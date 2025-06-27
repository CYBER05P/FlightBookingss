// src/pages/UserBookingsPage.jsx
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import {
  FaPlane,
  FaClock,
  FaCalendar,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import dayjs from "dayjs";

const MyBookingsPage = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("UPCOMING");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://192.168.1.143:8085/api/bookings/user/${userId}`);

        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    if (userId) fetchBookings();
  }, [userId]);

  const handleCancel = async (bookingId) => {
    try {
      await axios.post(`/api/bookings/cancel/${bookingId}`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "CANCELLED" } : b
        )
      );
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  const filtered = bookings
    .filter((b) => {
      const matchSearch =
        b.departureCity?.toLowerCase().includes(search.toLowerCase()) ||
        b.arrivalCity?.toLowerCase().includes(search.toLowerCase()) ||
        b.flightNumber?.toLowerCase().includes(search.toLowerCase());

      const isPast = dayjs(b.departureTime).isBefore(dayjs());
      return tab === "UPCOMING" ? !isPast && matchSearch : isPast && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "date")
        return new Date(a.departureTime) - new Date(b.departureTime);
      if (sort === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Bookings for User ID: {userId}
      </h2>

      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("UPCOMING")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              tab === "UPCOMING" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setTab("PAST")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              tab === "PAST" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            Past
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-md"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid gap-4 max-w-5xl mx-auto">
          {filtered.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded-lg shadow border space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FaPlane className="text-blue-500" />
                  {b.departureCity} → {b.arrivalCity}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    b.status === "CANCELLED"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <div className="text-sm text-gray-700 grid grid-cols-2 gap-2 md:grid-cols-4">
                <p>
                  <FaCalendar className="inline mr-1 text-blue-500" />{" "}
                  {dayjs(b.departureTime).format("MMM D, YYYY")}
                </p>
                <p>
                  <FaClock className="inline mr-1 text-blue-500" />{" "}
                  {dayjs(b.departureTime).format("h:mm A")}
                </p>
                <p>Flight: {b.flightNumber}</p>
                <p>Seat: {b.seatNumber}</p>
              </div>

              <div className="flex justify-end gap-4 text-sm mt-2">
                <button className="flex items-center gap-1 text-blue-600 hover:underline">
                  <FaFileInvoice /> View Invoice
                </button>
                {b.status !== "CANCELLED" && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="flex items-center gap-1 text-red-600 hover:underline"
                  >
                    <FaTrashAlt /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
