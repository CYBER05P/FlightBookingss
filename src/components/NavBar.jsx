import { Link, useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between p-6 shadow bg-white sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <FaPlaneDeparture className="text-blue-600 text-2xl" />
        <span className="font-bold text-xl text-gray-800">FMS Airways</span>
      </div>

      <nav className="hidden md:flex space-x-6 relative">
        <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
        <Link to="/flights" className="hover:text-blue-600 font-medium">Search Flights</Link>
        <Link to="/about" className="hover:text-blue-600 font-medium">About</Link>
        <Link to="/contact" className="hover:text-blue-600 font-medium">Contact</Link>

        {!user ? (
          <Link to="/login">
            <button className="ml-4 border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white transition">
              Login
            </button>
          </Link>
        ) : (
          <div className="ml-4 relative">
            <button onClick={() => setDropdown(!dropdown)} className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white transition">
              {user.name}
            </button>

            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">Admin Dashboard</Link>
                )}
                <Link to="/bookings" className="block px-4 py-2 hover:bg-gray-100">My Bookings</Link>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
