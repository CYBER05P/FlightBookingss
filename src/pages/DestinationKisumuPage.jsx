import { Link } from "react-router-dom";
import { FaCheckCircle, FaCity, FaPlane } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DestinationKisumuPage() {
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
      style={{ backgroundImage: `url('/images/kisumu-promo.jpg')` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center border border-gray-200">
        
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 flex items-center justify-center gap-2 mb-2 animate-fade-in">
            <FaCity className="text-purple-500 text-4xl animate-bounce" />
            Discover Kisumu with FMS Airways!
          </h1>
          <p className="text-gray-700 text-lg">Lakefront beauty, culture, and culinary delight await you!</p>
        </div>

        <div className="mb-6 text-left text-gray-700 text-base leading-relaxed">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">About Kisumu</h2>
          <p>
            Nestled on the shores of Lake Victoria, Kisumu is known for its stunning sunsets, vibrant markets, and welcoming people.
            Whether you're exploring Dunga Hill Camp or taking a boat ride, the lakeside charm is unmatched.
          </p>
        </div>

        <ul className="text-left text-gray-800 space-y-4 mb-6 text-base font-medium">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Flights from <strong>KSH 4,500</strong>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Daily flights from Nairobi & Eldoret
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Great for getaways & family visits
          </li>
        </ul>

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

        <div className="bg-purple-50 text-purple-900 rounded-lg p-6 mb-6 shadow-inner text-sm text-left">
          <h3 className="text-lg font-semibold mb-2">Deal Details:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>🎫 No coupon needed – promo auto-applied</li>
            <li>📆 Travel anytime before 31st Dec 2025</li>
            <li>🛫 Valid for one-way and round trips</li>
            <li>🚣‍♀️ Great for weekend breaks or long stays</li>
          </ul>
        </div>

        <Link to="/flights">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
            <FaPlane /> Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
