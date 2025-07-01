// src/components/DestinationSelector.jsx
import { Link } from "react-router-dom";

export default function DestinationSelector({ destinationsData, selectedCountry, setSelectedCountry }) {
  const countryData = destinationsData[selectedCountry];

  return (
    <section className="mx-6 mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Popular Destinations {countryData.flag && <span className="ml-2">{countryData.flag}</span>}
        </h2>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(destinationsData).map((country) => (
            <option key={country} value={country}>
              {destinationsData[country].flag} {country}
            </option>
          ))}
        </select>
      </div>

      {countryData.destinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {countryData.destinations.map((destination, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-sm">
                  From {countryData.currency} {destination.price.toLocaleString()}
                </p>
              </div>
              <Link to="/flights" className="absolute inset-0"></Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-12">
          Destinations coming soon. Stay tuned!
        </div>
      )}
    </section>
  );
}
