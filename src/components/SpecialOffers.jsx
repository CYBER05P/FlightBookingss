import { useState, useEffect } from "react";
import { FaClock, FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const offers = [
  {
    title: "15% OFF Flights to Mombasa",
    description: "Limited time beach escape deal.",
    expiresIn: 3600,
    image: "/images/Mombasa1.jpg",
  },
  {
    title: "Dubai Luxury Sale",
    description: "Fly to Dubai with up to 20% off.",
    expiresIn: 5400,
    image: "/images/Dubai1.jpg",
  },
  {
    title: "Kisumu Lake Adventure",
    description: "Explore sunsets and lakefront charm.",
    expiresIn: 2700,
    image: "/images/Kisumu1.jpg",
  },
  {
    title: "Paris Romantic Getaway",
    description: "Love in the City of Lights with 10% off.",
    expiresIn: 7200,
    image: "/images/Paris.jpg",
  },
  {
    title: "Nairobi Safari Special",
    description: "Wildlife adventure, discounted fares.",
    expiresIn: 4500,
    image: "/images/Nairobi.jpg",
  },
  {
    title: "Malindi Coastal Relaxation",
    description: "Tropical bliss at reduced prices.",
    expiresIn: 3600,
    image: "/images/Malindi.jpg",
  },
];

export default function SpecialOffers() {
  const [timers, setTimers] = useState(offers.map((o) => o.expiresIn));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => prev.map((time) => (time > 0 ? time - 1 : 0)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 2) % offers.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - 2 < 0 ? offers.length - (offers.length % 2 === 0 ? 2 : 1) : prev - 2
    );
  };

  return (
    <section className="mx-6 mb-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        ✨ Limited Time Offers ✨
      </h2>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[0, 1].map((offset) => {
            const index = (currentIndex + offset) % offers.length;
            const offer = offers[index];

            return (
              <div
                key={offset}
                className="relative h-72 rounded-2xl overflow-hidden shadow-xl group transform hover:scale-105 transition duration-500"
                style={{
                  backgroundImage: `url(${offer.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-6 text-white">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                      <FaTag className="inline text-yellow-400 mr-2" /> {offer.title}
                    </h3>
                    <p className="text-sm md:text-base opacity-90 leading-relaxed">{offer.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      <FaClock />
                      <span className="font-semibold">
                        {timers[index] > 0 ? formatTime(timers[index]) : "Expired"}
                      </span>
                    </div>

                    <button
                      disabled={timers[index] <= 0}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition transform hover:scale-110 ${
                        timers[index] > 0
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                    >
                      {timers[index] > 0 ? "Book Now" : "Offer Ended"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={prev}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow hover:scale-110 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow hover:scale-110 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
