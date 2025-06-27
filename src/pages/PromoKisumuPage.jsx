import { Link } from "react-router-dom";
import { FaCheckCircle, FaWater, FaPlane } from "react-icons/fa";

export default function PromoKisumuPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-20"
      style={{
        backgroundImage: `url('/images/kisumu-promo.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center border border-blue-200">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 flex items-center justify-center gap-2 mb-2 animate-fade-in">
            <FaWater className="text-blue-500 text-4xl animate-bounce" />
            Discover Kisumu with FMS Airways!
          </h1>
          <p className="text-gray-700 text-lg">
            Enjoy a lakeside escape to Kisumu with great offers and serene views of Lake Victoria.
          </p>
        </div>

        <ul className="text-left text-gray-800 space-y-4 mb-6 text-base font-medium">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600 animate-fade-in" />
            Up to <strong>20% off</strong> flights to Kisumu
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600 animate-fade-in" />
            Daily departures from <strong>Nairobi & Eldoret</strong>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600 animate-fade-in" />
            Travel valid until <strong>December 2025</strong>
          </li>
        </ul>

        <div className="rounded-xl overflow-hidden shadow-md border border-gray-300 mb-6">
          <img
            src="/images/kisumu-promo1.jpg"
            alt="Kisumu View"
            className="w-full h-48 object-cover rounded shadow"
          />
        </div>

        <a
          href="https://www.google.com/maps/place/Kisumu,+Kenya"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm hover:text-blue-800"
        >
          View Kisumu on Google Maps
        </a>

        <Link to="/flights">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 mt-6 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
            <FaPlane /> Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
