import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlaneDeparture, FaSearch, FaUser } from "react-icons/fa";
import SpecialOffers from "../components/SpecialOffers";
import Testimonials from "../components/Testimonials";
import FlightStatus from "../components/FlightStatus";
import TravelTips from "../components/TravelTips";
import Newsletter from "../components/Newsletter";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("Kenya");

  const flightPromos = [
    {
      title: "Mombasa's Calling, and your Tan is Waiting!",
      subtitle: "Escape to Paradise!",
      priceTag: "Up to 15% OFF",
      image: "/images/Mombasa1.jpg",
      destination: "Mombasa",
      link: "/promo-mombasa",
    },
    {
      title: "Fly to Dubai in Style",
      subtitle: "Luxury shopping, desert tours & skyline views",
      priceTag: "Now from KSH 25,000",
      image: "/images/Dubai1.jpg",
      destination: "Dubai",
      link: "/promo-dubai",
    },
    {
      title: "Kisumu Awaits: Sunsets & Lakefront Charm",
      subtitle: "Culture, Cuisine & Cruises",
      priceTag: "From KSH 4,500",
      image: "/images/Kisumu1.jpg",
      destination: "Kisumu",
      link: "promo-kisumu",
    },
  ];

  const destinationsData = {
    Kenya: {
      flag: "🇰🇪",
      currency: "KSH",
      destinations: [
        { name: "Nairobi", image: "/images/Nbo.jpg", price: 5000 },
        { name: "Kisumu", image: "/images/Kisumu.jpg", price: 4500 },
        { name: "Eldoret", image: "/images/Eldoret.jpg", price: 3800 },
        { name: "Malindi", image: "/images/Malindi.jpg", price: 6200 },
      ],
    },
    USA: {
      flag: "🇺🇸",
      currency: "USD",
      destinations: [
        { name: "New York", image: "/images/NewYork.jpg", price: 450 },
        { name: "Los Angeles", image: "/images/LosAngeles.jpg", price: 500 },
        { name: "Miami", image: "/images/Miami.jpg", price: 400 },
      ],
    },
    UAE: {
      flag: "🇦🇪",
      currency: "KSH",
      destinations: [
        { name: "Dubai", image: "/images/Dubai1.jpg", price: 25000 },
        { name: "Abu Dhabi", image: "/images/AbuDhabi.jpg", price: 24000 },
      ],
    },
    UK: {
      flag: "🇬🇧",
      currency: "GBP",
      destinations: [
        { name: "London", image: "/images/London.jpg", price: 350 },
        { name: "Manchester", image: "/images/Manchester.jpg", price: 320 },
      ],
    },
    France: {
      flag: "🇫🇷",
      currency: "EUR",
      destinations: [],
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % flightPromos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <HeroSection />
      <FlightPromoCarousel promos={flightPromos} current={current} setCurrent={setCurrent} />
      <DestinationSelector
        destinationsData={destinationsData}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <WhyChooseUs />
      <SpecialOffers />
      <Testimonials />
      <FlightStatus />
      <TravelTips />
      <FAQ />
      <Newsletter />
    </div>
  );
}