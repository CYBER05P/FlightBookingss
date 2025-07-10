import { useNavigate } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";
import {
  FaChartBar,
  FaPlane,
  FaTags,
  FaClipboardList,
  FaMoneyBillWave,
  FaBell,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "System Statistics",
      icon: <FaChartBar className="text-3xl text-blue-600" />,
      link: "/admin/stats",
    },
    {
      title: "Manage Flights",
      icon: <FaPlane className="text-3xl text-green-600" />,
      link: "/admin/flights",
    },
    {
      title: "Manage Promotions",
      icon: <FaTags className="text-3xl text-pink-600" />,
      link: "/admin/promotions",
    },
    {
      title: "Manage Bookings",
      icon: <FaClipboardList className="text-3xl text-yellow-600" />,
      link: "/admin/bookings",
    },
    {
      title: "Revenue & Trends",
      icon: <FaMoneyBillWave className="text-3xl text-indigo-600" />,
      link: "/admin/trends",
    },
    {
      title: "System Notifications",
      icon: <FaBell className="text-3xl text-red-600" />,
      link: "/admin/notifications",
    },
    {
      title: "Manage Users",
      icon: <FaUsers className="text-3xl text-purple-600" />,
      link: "/admin/users",
    },
    {
      title: "System Logs",
      icon: <FaFileAlt className="text-3xl text-gray-600" />,
      link: "/admin/logs",
    },
  ];

  return (
    <div>
      <AdminNavBar />

      <div className="p-6 bg-blue-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.link)}
              className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg hover:scale-105 transition-transform"
            >
              {card.icon}
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
