// src/pages/About.jsx
import { FaPlaneDeparture, FaGlobeAfrica, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/airways-hero.jpg')", // replace with your preferred hero image
        }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FMS Airways</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Connecting Kenya to the world with seamless, modern, and affordable air travel.
          </p>
        </div>
      </div>

      {/* ✅ About Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-gray-800">
        {/* Who We Are */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">Who We Are</h2>
          <p className="text-lg max-w-3xl mx-auto">
            FMS Airways is a cutting-edge flight management system built to simplify both domestic and international air travel.
            We empower travelers with real-time bookings, trusted routes, and top-tier service — all on one platform.
          </p>
        </div>

        {/* Vision / Mission / Why Choose Us */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaPlaneDeparture className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p>
              To revolutionize air travel by offering reliable, customer-centric booking experiences across Kenya and beyond.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaGlobeAfrica className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p>
              To leverage modern tech to bridge cities, empower travelers, and simplify air travel globally.

            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaUsers className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Why Choose Us</h3>
            <p>
              From unbeatable pricing to 24/7 support, FMS Airways brings comfort, safety, and trust to your journey.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Call to Action */}
      <div className="bg-blue-700 py-12 px-6 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Journey with Us</h2>
        <p className="mb-6 text-lg">Explore affordable flights, trusted destinations, and seamless booking.</p>
        <Link to="/flights">
          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Browse Flights
          </button>
        </Link>
      </div>
    </div>
  );
}
