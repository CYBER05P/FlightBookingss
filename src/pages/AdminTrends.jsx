import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminTrends() {
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      const res = await axios.get("/api/admin/trends");
      setRevenueData(res.data.revenue);
      setBookingData(res.data.bookings);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch trends");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Revenue & Booking Trends</h2>

      <div className="mb-10 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue (KSH)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Bookings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bookings" stroke="#16A34A" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
