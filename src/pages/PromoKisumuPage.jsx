import { Link } from "react-router-dom";
import { FaCheckCircle, FaCity, FaPlane } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PromoKisumuPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-20"
      style={{
        backgroundImage: `url('/images/kisumu-promo.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center border border-blue-300">
        
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 flex items-center justify-center gap-2 mb-2 animate-fade-in">
            <FaCity className="text-blue-500 text-4xl animate-bounce" />
            Discover Kisumu with FMS Airways!
          </h1>
          <p className="text-gray-700 text-lg">
            Enjoy lakeside charm, culture, and cuisine with our exclusive Kisumu flight deals.
          </p>
        </div>

        {/* Promo Highlights */}
        <ul className="text-left text-gray-800 space-y-4 mb-6 text-base font-medium">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600" />
            One-way from <strong>KSH 4,500</strong>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600" />
            Flights available daily from Nairobi & Mombasa
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600" />
            Perfect for holidays, conferences, and weekend escapes
          </li>
        </ul>

        {/* Scenic Slider */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-md border border-gray-300">
          <Slider {...sliderSettings}>
            {[
              "/images/kisumu1.jpg",
              "/images/kisumu2.jpg",
              "/images/kisumu3.jpg",
              "/images/kisumu4.jpg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Kisumu Slide ${i + 1}`}
                className="w-full h-64 object-cover rounded-xl"
              />
            ))}
          </Slider>
        </div>

        {/* Google Maps */}
        <p className="text-center text-sm mb-6">
          <a
            href="https://www.google.com/maps/place/Kisumu,+Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            📍 View Kisumu on Google Maps
          </a>
        </p>

        {/* Deal Box */}
        <div className="bg-blue-50 text-blue-900 rounded-lg p-6 mb-6 shadow-inner text-sm text-left">
          <h3 className="text-lg font-semibold mb-2">Deal Details:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>🎟 Promo Code applied automatically</li>
            <li>🛫 Valid through December 2025</li>
            <li>📆 Book at least 3 days ahead</li>
            <li>🎓 Ideal for students, families, and business travelers</li>
          </ul>
        </div>

        {/* CTA Button */}
        <Link to="/flights">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 mt-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
            <FaPlane /> Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
