// src/pages/About.jsx
import { FaPlaneDeparture, FaGlobeAfrica, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">About FMS Airways</h1>
        <p className="text-gray-700 text-lg mb-8">
          FMS Airways is a modern flight management platform designed to connect Kenya’s major cities with seamless, affordable, and efficient travel solutions.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
          <div className="bg-white rounded-xl shadow p-6">
            <FaPlaneDeparture className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To revolutionize domestic travel in Kenya by providing reliable, customer-centric flight booking experiences.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <FaGlobeAfrica className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To leverage technology to bridge cities, empower travelers, and simplify air travel across East Africa.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <FaUsers className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Why Choose Us</h3>
            <p className="text-gray-600">
              From affordable prices to top-tier support, FMS Airways offers unbeatable value to all passengers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
