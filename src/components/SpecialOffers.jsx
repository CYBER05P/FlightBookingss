import { useState, useEffect } from "react";
import {
  FaPlaneDeparture,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const offers = [
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
    expiresIn: 7200,
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
    expiresIn: 10800,
  },
  {
    id: "3",
    from: "Nairobi",
    to: "Kisumu",
    airline: "Jambojet",
    departure: "14:00",
    arrival: "15:10",
    oldPrice: 12000,
    newPrice: 7500,
    image: "/images/Kisumu1.jpg",
    validUntil: "2024-08-20",
    expiresIn: 7800,
  },
  {
    id: "4",
    from: "Nairobi",
    to: "Paris",
    airline: "Air France",
    departure: "21:00",
    arrival: "06:00",
    oldPrice: 75000,
    newPrice: 66000,
    image: "/images/Paris.jpg",
    validUntil: "2024-09-05",
    expiresIn: 14400,
  },
];

export default function SpecialOffers() {
  const [timers, setTimers] = useState(offers.map((o) => o.expiresIn));
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => prev.map((t) => (t > 0 ? t - 1 : 0)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const auto = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(auto);
  }, [currentIndex]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 2) % offers.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - 2 < 0 ? offers.length - 2 : prev - 2
    );
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m left`;
  };

  return (
    <section className="w-full min-h-screen bg-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          <FaTag className="inline-block mr-2 text-orange-500" />
          Limited Time Offers
        </h2>
        <p className="text-center text-base text-gray-600 mb-8">
          Don’t miss out on these amazing flight deals across Kenya and beyond!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((offset) => {
            const index = (currentIndex + offset) % offers.length;
            const offer = offers[index];

            return (
              <div
                key={offer.id}
                onClick={() => navigate(`/offers/${offer.id}`)} // ✅ direct navigation on card click
                className="bg-white border rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
              >
                <div
                  className="h-36 md:h-44 relative"
                  style={{
                    backgroundImage: `url(${offer.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] md:text-xs px-2 py-1 rounded-full font-bold">
                    {Math.round(
                      ((offer.oldPrice - offer.newPrice) / offer.oldPrice) * 100
                    )}
                    % OFF
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {offer.from} → {offer.to}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{offer.airline}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <FaPlaneDeparture className="text-orange-500" />
                    <span>
                      {offer.departure} → {offer.arrival}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 font-semibold">
                        KSh {offer.newPrice.toLocaleString()}
                      </p>
                      <p className="line-through text-xs text-gray-400">
                        KSh {offer.oldPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">
                        Valid until {offer.validUntil}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full inline-block mb-2">
                        ⏳ {formatTime(timers[index])}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent bubbling to card click
                          if (timers[index] > 0) {
                            navigate(`/offers/${offer.id}`);
                          }
                        }}
                        disabled={timers[index] <= 0}
                        className={`px-3 py-1.5 text-sm rounded-md font-medium ${
                          timers[index] > 0
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-300 text-white cursor-not-allowed"
                        }`}
                      >
                        {timers[index] > 0 ? "Book This Deal" : "Offer Ended"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prev}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
