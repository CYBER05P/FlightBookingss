// DestinationSelector.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/priceFormatter";
import PriceAlertModal from "./PriceAlertModal";

export default function DestinationSelector({ destinationsData, selectedCountry, setSelectedCountry, selectedCurrency }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleOpenAlert = (destinationName) => {
    setSelectedDestination(destinationName);
    setAlertOpen(true);
  };

  return (
    <section className="mx-6 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded text-sm focus:outline-none hover:border-blue-500"
        >
          {Object.keys(destinationsData).map((country) => (
            <option key={country} value={country}>
              {destinationsData[country].flag} {country}
            </option>
          ))}
        </select>
      </div>

      {destinationsData[selectedCountry].destinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinationsData[selectedCountry].destinations.map((destination, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-sm mb-2">From {formatPrice(destination.price, selectedCurrency)}</p>
                <div className="flex space-x-2">
                  <Link to="/flights" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-sm">
                    Book Now
                  </Link>
                  <button
                    onClick={() => handleOpenAlert(destination.name)}
                    className="bg-white text-blue-600 px-3 py-1 rounded text-sm hover:bg-gray-100"
                  >
                    Set Price Alert
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No destinations available for this country yet.</p>
      )}

      <PriceAlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        destination={selectedDestination}
      />
    </section>
  );
}
