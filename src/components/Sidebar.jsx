import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaBook, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-4 hidden md:block">
      <nav className="space-y-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Dashboard</h2>
        <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/dashboard/search" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <FaSearch />
          <span>Search Flights</span>
        </Link>
        <Link to="/dashboard/bookings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <FaBook />
          <span>My Bookings</span>
        </Link>
        <Link to="/dashboard/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <FaUser />
          <span>Profile</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
