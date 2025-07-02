// components/DestinationHighlights.jsx

import { FaMapMarkerAlt, FaSun, FaStar } from "react-icons/fa";

const highlights = [
  {
    name: "Mombasa",
    image: "/images/Mombasa1.jpg",
    attractions: "Beaches, Old Town, Fort Jesus",
    weather: "30°C, Sunny",
  },
  {
    name: "Dubai",
    image: "/images/Dubai1.jpg",
    attractions: "Burj Khalifa, Desert Safaris",
    weather: "38°C, Hot",
  },
  {
    name: "Paris",
    image: "/images/Paris.jpg",
    attractions: "Eiffel Tower, Museums",
    weather: "24°C, Mild",
  },
  {
    name: "Kisumu",
    image: "/images/Kisumu1.jpg",
    attractions: "Lake Victoria, Impala Sanctuary",
    weather: "28°C, Partly Cloudy",
  },
  {
    name: "Nairobi",
    image: "/images/Nairobi.jpg",
    attractions: "National Park, City Markets",
    weather: "22°C, Sunny",
  },
];

export default function DestinationHighlights() {
  return (
    <section className="mx-6 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Explore Top Destinations
      </h2>

      <div className="overflow-x-auto">
        <div className="flex space-x-6">
          {highlights.map((place, index) => (
            <div
              key={index}
              className="min-w-[16rem] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <FaMapMarkerAlt className="text-blue-600 mr-2" /> {place.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1 flex items-center">
                  <FaStar className="text-yellow-500 mr-2" /> {place.attractions}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaSun className="text-orange-400 mr-2" /> {place.weather}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
