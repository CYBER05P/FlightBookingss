import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link to="/admin/stats" className="block bg-blue-600 text-white px-4 py-6 rounded shadow hover:bg-blue-700 transition">
          View System Statistics
        </Link>

        <Link to="/admin/flights" className="block bg-green-600 text-white px-4 py-6 rounded shadow hover:bg-green-700 transition">
          Manage Flights
        </Link>

        <Link to="/admin/promotions" className="block bg-yellow-500 text-white px-4 py-6 rounded shadow hover:bg-yellow-600 transition">
          Manage Promotions
        </Link>

        <Link to="/admin/bookings" className="block bg-purple-600 text-white px-4 py-6 rounded shadow hover:bg-purple-700 transition">
          Manage Bookings
        </Link>

        <Link to="/admin/trends" className="block bg-pink-600 text-white px-4 py-6 rounded shadow hover:bg-pink-700 transition">
          Revenue & Booking Trends
        </Link>

        <Link to="/admin/notifications" className="block bg-indigo-600 text-white px-4 py-6 rounded shadow hover:bg-indigo-700 transition">
          System Notifications
        </Link>

        <Link to="/admin/users" className="block bg-gray-600 text-white px-4 py-6 rounded shadow hover:bg-gray-700 transition">
          Manage Users
        </Link>

        <Link to="/admin/logs" className="block bg-red-500 text-white px-4 py-6 rounded shadow hover:bg-red-600 transition">
          System Logs
        </Link>

      </div>
    </div>
  );
}
