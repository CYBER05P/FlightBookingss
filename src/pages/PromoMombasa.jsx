import { Link } from "react-router-dom";
import { FaCheckCircle, FaUmbrellaBeach, FaPlane } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PromoMombasaPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-20"
      style={{
        backgroundImage: `url('/images/mombasa-promo.jpg')`,
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

        {/* Scenic Image Carousel */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-md border border-gray-300">
          <Slider {...sliderSettings}>
            {[
              "/images/mombasa11.jpg",
              "/images/mombasa21.jpg",
              "/images/mombasa31.jpg",
              "/images/mombasa-coastline.jpg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Mombasa Slide ${i + 1}`}
                className="w-full h-64 object-cover rounded-xl"
              />
            ))}
          </Slider>
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

        {/* Deal Details Box */}
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
