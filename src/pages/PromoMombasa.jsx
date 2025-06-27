import { Link } from "react-router-dom";
import { FaCheckCircle, FaUmbrellaBeach, FaPlane } from "react-icons/fa";

export default function PromoMombasaPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-20"
      style={{
        backgroundImage: `url('/images/mombasa-promo.jpg')`, // Replace with your nice hero beach image
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center border border-blue-200">

        {/* Headline */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 flex items-center justify-center gap-2 mb-2 animate-fade-in">
            <FaUmbrellaBeach className="text-pink-500 text-4xl animate-bounce" />
            Explore Mombasa with FMS Airways!
          </h1>
          <p className="text-gray-700 text-lg">
            Book your dream coastal getaway and enjoy exclusive discounts on flights to Mombasa.
          </p>
        </div>

        {/* Main Promo List */}
        <ul className="text-left text-gray-800 space-y-4 mb-6 text-base font-medium">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-purple-600 animate-fade-in" />
            Up to <strong>25% off</strong> select flights
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-purple-600 animate-fade-in" />
            Daily departures from <strong>Nairobi, Kisumu & Eldoret</strong>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-purple-600 animate-fade-in" />
            Travel valid until <strong>December 2025</strong>
          </li>
        </ul>

        {/* Beautiful Mombasa Image */}
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-300 mb-4">
          <img
            src="/images/mombasa-coastline.jpg" // Your nicer scenic image here
            alt="Mombasa Beach"
            className="w-full h-48 object-cover rounded shadow"
          />
        </div>
        {/* Scenic Mombasa Carousel */}
        <div className="overflow-hidden w-full mb-8">
        <div className="flex animate-slide gap-4 w-max">
          <img
      src="/images/mombasa11.jpg"
      alt="Mombasa Beach 1"
      className="w-80 h-48 object-cover rounded-xl shadow-md"
    />
          <img
      src="/images/mombasa21.jpg"
      alt="Mombasa Beach 2"
      className="w-80 h-48 object-cover rounded-xl shadow-md"
    />
          <img
      src="/images/mombasa31.jpg"
      alt="Mombasa Beach 3"
      className="w-80 h-48 object-cover rounded-xl shadow-md"
    />
    {/* Duplicate for seamless loop */}
    <img
      src="/images/mombasa1.jpg"
      alt="Loop Back"
      className="w-80 h-48 object-cover rounded-xl shadow-md"
    />
  </div>
</div>


        {/* Google Maps Link */}
        <p className="text-center text-sm mb-6">
          <a
            href="https://www.google.com/maps/place/Mombasa,+Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            📍 View Mombasa on Google Maps
          </a>
        </p>

        {/* New: Deal Details Box */}
        <div className="bg-blue-50 text-blue-900 rounded-lg p-6 mb-6 shadow-inner text-sm text-left">
          <h3 className="text-lg font-semibold mb-2">Deal Details:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>✈️ Promo Code auto-applied during checkout</li>
            <li>🎒 Ideal for families, holiday travelers, & students</li>
            <li>🕐 Book at least 7 days in advance to qualify</li>
            <li>📆 Valid for travel anytime before 31st December 2025</li>
          </ul>
        </div>

        {/* Book Now Button */}
        <Link to="/flights">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
            <FaPlane /> Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
