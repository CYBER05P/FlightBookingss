// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to FMS</h1>
      
      <div className="flex gap-4">
        <Link to="/flights">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Book a Flight
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
