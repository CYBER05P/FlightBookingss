import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaHome, FaChartBar, FaSignOutAlt, FaPlane, FaUsers } from "react-icons/fa";

export default function AdminNavBar() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-bold">FMS Admin</h1>
      <nav className="flex gap-4 items-center">
        <Link to="/" className="hover:text-blue-300 flex items-center gap-1">
          <FaHome /> Home
        </Link>
        <Link to="/admin/dashboard" className="hover:text-blue-300 flex items-center gap-1">
          <FaChartBar /> Dashboard
        </Link>
        <Link to="/admin/flights" className="hover:text-blue-300 flex items-center gap-1">
          <FaPlane /> Flights
        </Link>
        <Link to="/admin/bookings" className="hover:text-blue-300 flex items-center gap-1">
          <FaUsers /> Bookings
        </Link>
        <Link to="/admin/users" className="hover:text-blue-300 flex items-center gap-1">
          <FaUsers /> Users
        </Link>
        <button onClick={handleLogout} className="hover:text-red-400 flex items-center gap-1">
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </header>
  );
}
