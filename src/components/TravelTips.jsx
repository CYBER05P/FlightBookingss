// components/TravelTips.jsx

import { FaPlane, FaPassport, FaSuitcase, FaGlobeAfrica } from "react-icons/fa";

const tips = [
  {
    icon: <FaPlane className="text-blue-600 text-3xl" />, 
    title: "Book Early",
    description: "Secure the best prices by booking your flights well in advance.",
  },
  {
    icon: <FaPassport className="text-blue-600 text-3xl" />, 
    title: "Check Travel Requirements",
    description: "Always verify visa, vaccination, and document requirements before traveling.",
  },
  {
    icon: <FaSuitcase className="text-blue-600 text-3xl" />, 
    title: "Pack Smart",
    description: "Keep essentials in your carry-on and pack according to your airline's baggage policy.",
  },
  {
    icon: <FaGlobeAfrica className="text-blue-600 text-3xl" />, 
    title: "Explore Local Culture",
    description: "Immerse yourself in local traditions, food, and experiences for a richer trip.",
  },
];

export default function TravelTips() {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Top Travel Tips</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer group"
            >
              <div className="mb-4 flex items-center justify-center">
                {tip.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-600">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
