import { Link } from "react-router-dom";
import { FaCheckCircle, FaCity, FaPlane } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DestinationNairobiPage() {
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
        backgroundImage: `url('/images/nairobi-promo.jpg')`, // Hero background
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center border border-gray-200">

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 flex items-center justify-center gap-2 mb-2 animate-fade-in">
            <FaCity className="text-yellow-500 text-4xl animate-bounce" />
            Discover Nairobi with FMS Airways!
          </h1>
          <p className="text-gray-700 text-lg">
            Dive into Kenya's vibrant capital city and unlock amazing flight deals.
          </p>
        </div>

        {/* ✅ About Blurb */}
        <div className="mb-6 text-left text-gray-700 text-base leading-relaxed">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">About Nairobi</h2>
          <p>
            Nairobi, Kenya’s bustling capital, is a dynamic blend of modern urban culture and natural beauty.
            Home to thriving business districts, lush parks, vibrant nightlife, and even a national park just minutes from the city center —
            it’s a destination that offers something for everyone.
          </p>
        </div>

        {/* Promo Highlights */}
        <ul className="text-left text-gray-800 space-y-4 mb-6 text-base font-medium">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Flights starting at <strong>KSH 5,000</strong>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Direct from Kisumu, Mombasa & Eldoret
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Perfect for business & leisure travel
          </li>
        </ul>

        {/* Scenic Image Carousel */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-md border border-gray-300">
          <Slider {...sliderSettings}>
            {[
              "/images/nairobi3.jpg",
              "/images/nairobi1.jpg",
              "/images/nairobi2.jpg",
              "/images/Nairobi Skyline2.jpg",
              
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Nairobi Slide ${i + 1}`}
                className="w-full h-64 object-cover rounded-xl"
              />
            ))}
          </Slider>
        </div>

        {/* Google Maps Link */}
        <p className="text-center text-sm mb-6">
          <a
            href="https://www.google.com/maps/place/Nairobi,+Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            📍 View Nairobi on Google Maps
          </a>
        </p>

        {/* Deal Box */}
        <div className="bg-yellow-50 text-yellow-900 rounded-lg p-6 mb-6 shadow-inner text-sm text-left">
          <h3 className="text-lg font-semibold mb-2">Deal Details:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>🎟 Promo Code auto-applied at checkout</li>
            <li>📅 Book by 31st Dec 2025</li>
            <li>🕐 Book 3+ days in advance</li>
            <li>📍 Ideal for work, study & family visits</li>
          </ul>
        </div>

        {/* CTA Button */}
        <Link to="/flights">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
            <FaPlane /> Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
