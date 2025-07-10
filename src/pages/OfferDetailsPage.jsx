import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaPlaneDeparture,
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

const sampleDeals = [
  {
    id: "1",
    from: "Nairobi",
    to: "Mombasa",
    airline: "Kenya Airways",
    departure: "08:00",
    arrival: "09:30",
    oldPrice: 15000,
    newPrice: 9900,
    image: "/images/Mombasa1.jpg",
    validUntil: "2024-08-15",
  },
  {
    id: "2",
    from: "Nairobi",
    to: "Dubai",
    airline: "Emirates",
    departure: "18:00",
    arrival: "22:00",
    oldPrice: 65000,
    newPrice: 52000,
    image: "/images/Dubai1.jpg",
    validUntil: "2024-09-01",
  },
];

export default function OfferDetailPage() {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState(1);

  const deal = sampleDeals.find((d) => d.id === dealId);

  useEffect(() => {
    if (!deal) {
      navigate("/"); // Redirect to Home if deal doesn't exist
    }
  }, [deal, navigate]);

  if (!deal) return null;

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Hero Section */}
        <div className="relative h-64 sm:h-72 md:h-80">
          <img
            src={deal.image}
            alt={`${deal.from} to ${deal.to}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {deal.from} → {deal.to}
            </h1>
            <p className="text-white/80 text-sm">{deal.airline}</p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-10">
          {/* Flight Info Card */}
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPlaneDeparture className="text-blue-600 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Flight Details</p>
                  <p className="text-sm text-gray-500">{deal.airline}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-700">
                  {deal.departure} - {deal.arrival}
                </p>
                <p className="text-sm text-gray-500">Duration: 1h 30m</p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Pricing</h3>
            <div className="flex items-end gap-4">
              <span className="text-3xl font-bold text-blue-600">
                KSh {deal.newPrice.toLocaleString()}
              </span>
              <span className="line-through text-gray-400">
                KSh {deal.oldPrice.toLocaleString()}
              </span>
              <span className="ml-auto bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                Save {Math.round((1 - deal.newPrice / deal.oldPrice) * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendarAlt className="text-gray-400" />
              <span>Valid until {deal.validUntil}</span>
            </div>
          </div>

          {/* Passenger Count */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Passengers</h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <select
                className="w-full bg-gray-50 border border-gray-300 text-gray-700 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Passenger{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Total Price</span>
              <span className="text-xl font-bold text-blue-600">
                KSh {(deal.newPrice * passengers).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
            <button
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
              onClick={() => navigate("/")}
            >
              <FaArrowLeft /> Back to Home
            </button>
            <button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
              onClick={() =>
                alert(
                  `Booking ${passengers} ticket(s) from ${deal.from} to ${deal.to}`
                )
              }
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
