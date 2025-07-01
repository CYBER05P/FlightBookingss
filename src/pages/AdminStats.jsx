import { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFlights: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load system statistics");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold">Total Flights</h3>
          <p className="text-3xl mt-2">{stats.totalFlights}</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold">Total Bookings</h3>
          <p className="text-3xl mt-2">{stats.totalBookings}</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold">Total Revenue (KSH)</h3>
          <p className="text-3xl mt-2">{stats.totalRevenue}</p>
        </div>

      </div>
    </div>
  );
}
