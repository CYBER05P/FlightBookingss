import { Link } from "react-router-dom";
import { FaCheckCircle, FaCity, FaPlane } from "react-icons/fa";

export default function PromoDubaiPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-20"
      style={{
        backgroundImage: `url('/images/dubai-promo.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center border border-yellow-300">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-700 flex items-center justify-center gap-2 mb-2 animate-fade-in">
            <FaCity className="text-yellow-500 text-4xl animate-bounce" />
            Visit Dubai with FMS Airways!
          </h1>
          <p className="text-gray-700 text-lg">
            Experience luxury, shopping, and desert adventure in Dubai. Special offers now available!
          </p>
        </div>

        <ul className="text-left text-gray-800 space-y-4 mb-6 text-base font-medium">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-yellow-600 animate-fade-in" />
            Save up to <strong>30%</strong> on return flights
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-yellow-600 animate-fade-in" />
            Weekly departures from <strong>Nairobi</strong>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-yellow-600 animate-fade-in" />
            Travel anytime before <strong>March 2026</strong>
          </li>
        </ul>

        <div className="rounded-xl overflow-hidden shadow-md border border-gray-300 mb-6">
          <img
            src="/images/dubai-promo1.jpg"
            alt="Dubai View"
            className="w-full h-48 object-cover rounded shadow"
          />
        </div>

        <a
          href="https://www.google.com/maps/place/Dubai,+United+Arab+Emirates"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-600 underline text-sm hover:text-yellow-800"
        >
          View Dubai on Google Maps
        </a>

        <Link to="/flights">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 mt-6 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
            <FaPlane /> Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
