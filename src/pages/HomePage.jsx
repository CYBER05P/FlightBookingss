import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlaneDeparture, FaSearch, FaUser } from "react-icons/fa";
import SpecialOffers from "../components/SpecialOffers";
import Testimonials from "../components/Testimonials";
import FlightStatus from "../components/FlightStatus";
import TravelTips from "../components/TravelTips";
import Newsletter from "../components/Newsletter";
import FAQ from "../components/FAQ";
import SearchForm from "../components/SearchForm";
import NavBar from "../components/NavBar"; // ✅ Import the new Navbar

const flightPromos = [
  {
    title: "Mombasa's Calling, and your Tan is Waiting!",
    subtitle: "Escape to Paradise!",
    priceTag: "Up to 15% OFF",
    image: "/images/Mombasa1.jpg",
    destination: "Mombasa",
    link: "/promo-mombasa", // ✅ your custom promo page
  },
  {
    title: "Fly to Dubai in Style",
    subtitle: "Luxury shopping, desert tours & skyline views",
    priceTag: "Now from KSH 25,000",
    image: "/images/Dubai1.jpg", // ✅ make sure you add this image
    destination: "Dubai",
    link: "/promo-dubai",
  },
  {
    title: "Kisumu Awaits: Sunsets & Lakefront Charm",
    subtitle: "Culture, Cuisine & Cruises",
    priceTag: "From KSH 4,500",
    image: "/images/Kisumu1.jpg", // ✅ add this image too
    destination: "Kisumu",
    link: "promo-kisumu",
  },
];


const popularDestinations = [
  { name: "Nairobi", image: "/images/Nbo.jpg", price: "From KSH 5,000" },
  { name: "Kisumu", image: "/images/Kisumu.jpg", price: "From KSH 4,500" },
  { name: "Eldoret", image: "/images/Eldoret.jpg", price: "From KSH 3,800" },
  { name: "Malindi", image: "/images/Malindi.jpg", price: "From KSH 6,200" },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % flightPromos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <NavBar /> {/* ✅ Reusable NavBar at the top */}

      {/* Hero Section with Flight Search */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-cyan-500 p-8 pt-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Your Journey Begins Here
          </h1>
          <p className="text-lg text-white mb-8 max-w-xl mx-auto">
            Discover amazing destinations and book your flights with FMS Airways. Seamless travel experiences await you.
          </p>
          
          {/* Flight Search Box */}
          <SearchForm />
        </div>
      </section>

      {/* Flight Offers Banner Carousel */}
      <section className="relative h-[28rem] overflow-hidden mx-6 my-8 rounded-xl shadow-xl">
        {flightPromos.map((promo, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-between p-8 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${promo.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-white max-w-xl">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                {promo.destination}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{promo.title}</h2>
              <p className="text-xl mb-6">{promo.subtitle}</p>
              <Link to={promo.link}>
                  <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105">
                     Book Now - {promo.priceTag}
                  </button>
              </Link>

            </div>
          </div>
        ))}

        {/* Carousel Navigation Buttons */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {flightPromos.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === current ? 'bg-white' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mx-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Kenyan Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-sm">{destination.price}</p>
              </div>
              <Link to="/flights" className="absolute inset-0"></Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose FMS Airways?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaPlaneDeparture className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Fleet</h3>
              <p className="text-gray-600">Fly in comfort with our state-of-the-art aircraft featuring the latest amenities.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">We guarantee the best prices for your flights or we'll match the difference.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaUser className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer service team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Components */}
      <SpecialOffers />
      <Testimonials />
      <FlightStatus />
      <TravelTips />
      <FAQ />
      <Newsletter />

      {/* Call to Action */}
      <section className="bg-blue-700 text-white py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg mb-6">Sign up now and get exclusive deals and discounts on your first booking!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Create Account
              </button>
            </Link>
            <Link to="/flights">
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition">
                Browse Flights
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
