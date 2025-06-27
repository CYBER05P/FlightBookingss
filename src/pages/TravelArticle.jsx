import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaPlaneDeparture, FaInfoCircle } from "react-icons/fa";
import React, { useEffect } from "react";
import AOS from "aos";
import Slider from "react-slick";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const articles = {
  "beaches-in-kenya": {
    title: "5 Must-Visit Beaches in Kenya",
    image: "/images/Beach.jpg",
    intro: "Kenya’s coastline offers a mix of adventure, relaxation, and cultural exploration. Here are 5 must-visit beaches and what they offer.",
    content: [
      {
        name: "Diani Beach",
        summary: "White sands, turquoise waters, and vibrant nightlife.",
        images: [
          "/images/diani1.jpg",
          "/images/diani2.jpg",
          "/images/diani3.jpg"
        ],
        amenities: ["Free WiFi", "Jet Ski Rentals", "Sunbeds", "Beach Bars", "Diving Centers"],
        bestTime: "December – March, July – October",
        location: "South of Mombasa, accessible via Ukunda Airstrip.",
        nearby: ["Ali Barbour’s Cave Restaurant", "Colobus Conservation", "The Sands at Nomad"],
        mapLink: "https://maps.google.com/?q=Diani+Beach"
      },
      {
        name: "Watamu Beach",
        summary: "Snorkeling haven with coral reefs and marine park access.",
        images: [
          "/images/watamu1.jpg",
          "/images/watamu2.jpg",
          "/images/watamu3.jpg"
        ],
        amenities: ["Marine Park", "Snorkeling Tours", "Eco Lodges", "Turtle Spotting"],
        bestTime: "June – October, January – March",
        location: "Near Malindi, via Malindi Airport.",
        nearby: ["Gede Ruins", "Ocean Sports", "Bio-Ken Snake Farm"],
        mapLink: "https://maps.google.com/?q=Watamu+Beach"
      },
      {
        name: "Nyali Beach",
        summary: "Long sandy stretch near Mombasa with great accessibility.",
        images: [
          "/images/nyali1.jpg",
          "/images/nyali2.jpg",
          "/images/nyali3.jpg"
        ],
        amenities: ["Surf Board Rentals", "Restaurants", "Resorts", "Beach Volleyball"],
        bestTime: "December – April",
        location: "10 minutes from Mombasa city center.",
        nearby: ["Yul’s Beach Bar", "Nyali Centre", "Mamba Village"],
        mapLink: "https://maps.google.com/?q=Nyali+Beach"
      },
      {
        name: "Lamu Island",
        summary: "Historic, serene, and culturally rich.",
        images: [
          "/images/lamu1.jpg",
            "/images/lamu2.jpg",
            "/images/lamu3.jpg"
        ],
        amenities: ["Dhows", "Cultural Tours", "Lamu Market", "Secluded Lodges"],
        bestTime: "November – February",
        location: "Fly to Manda, then boat to Lamu.",
        nearby: ["Peponi Hotel", "Lamu Museum", "Shela Beach"],
        mapLink: "https://maps.google.com/?q=Lamu+Island"
      },
      {
        name: "Tiwi Beach",
        summary: "Quiet, family-friendly beach with coral pools.",
        images: [
          "/images/tiwi1.jpg",
            "/images/tiwi2.jpg"
        ],
        amenities: ["Picnic Spots", "Tidal Pools", "Budget Lodges", "Quiet Retreats"],
        bestTime: "January – March",
        location: "Just north of Diani along the South Coast.",
        nearby: ["Bidi Badu Bar", "Swahili Dishes Restaurant"],
        mapLink: "https://maps.google.com/?q=Tiwi+Beach"
      }
    ],
    tips: [
      "Use a local guide for boat tours and snorkeling.",
      "Book beach accommodations in advance during holiday seasons.",
      "Reef-safe sunscreen is a must!"
    ]
  },
  "safari-packing-list": {
    title: "Packing List for Safari Adventures",
    image: "/images/Packing.jpg",
    intro: "A well-packed safari bag can make your wildlife adventure more enjoyable. Here's what you need:",
    content: [
      {
        name: "Clothing",
        summary: "Neutral-colored clothing for camouflage and comfort.",
        amenities: ["Long sleeves", "Light jackets", "Comfortable shoes", "Hat & sunglasses"]
      },
      {
        name: "Gear",
        summary: "Essential gadgets and accessories.",
        amenities: ["Binoculars", "Flashlight", "Camera", "Power Bank"]
      },
      {
        name: "Toiletries & First Aid",
        summary: "Stay safe and healthy in remote areas.",
        amenities: ["Sunscreen", "Insect Repellent", "Wet Wipes", "Personal Meds"]
      }
    ],
    tips: [
      "Avoid black/blue clothes — they attract tsetse flies.",
      "Pack light but bring layers for chilly mornings.",
      "Always carry water and a snack."
    ]
  },
  "navigating-airports": {
    title: "How to Navigate Kenyan Airports",
    image: "/images/Airport.jpg",
    intro: "Get through Kenyan airports efficiently and stress-free with this guide.",
    content: [
      {
        name: "Jomo Kenyatta International Airport (JKIA)",
        summary: "Main international hub in Nairobi.",
        amenities: ["Lounges", "Shops", "ATMs", "Free WiFi", "SIM Card booths"],
        bestTime: "Avoid peak hours: 6–9 AM and 5–8 PM",
        location: "15km southeast of Nairobi CBD",
        nearby: ["South C Hotels", "Gateway Mall"],
        mapLink: "https://maps.google.com/?q=JKIA"
      },
      {
        name: "Moi International Airport (Mombasa)",
        summary: "Gateway to the coast.",
        amenities: ["Duty-Free", "Currency Exchange", "Restaurants"],
        bestTime: "Early mornings for cooler travel",
        location: "9km west of Mombasa City",
        nearby: ["Port Reitz", "Makupa Roundabout"],
        mapLink: "https://maps.google.com/?q=Moi+International+Airport"
      }
    ],
    tips: [
      "Use eVisa for faster clearance.",
      "Taxis: Use Bolt, Uber, or Little Cab — avoid unregistered drivers.",
      "Arrive 2–3 hours early for international flights."
    ]
  }
};

const TravelArticle = () => {
  const { slug } = useParams();
  const article = articles[slug];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!article) {
    return <div className="p-6 text-center text-red-500">Article not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <Link to="/travel" className="flex items-center text-blue-600 mb-4 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to Travel Tips
      </Link>

      <div className="relative mb-6 h-64 rounded-xl overflow-hidden shadow-md">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <h1 className="absolute bottom-4 left-6 text-white text-3xl font-bold z-10">
          {article.title}
        </h1>
      </div>

      <p className="text-lg text-gray-700 mb-6">{article.intro}</p>

      {slug === "beaches-in-kenya" && article.content.map((section, index) => (
        <div key={index} data-aos="fade-up" className="mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-teal-700">{section.name}</h2>
          <p className="text-gray-700 mb-4">{section.summary}</p>

          {section.images && (
            <Slider {...{
              arrows: true,
              autoplay: true,
              dots: true,
              infinite: true,
              speed: 600,
              slidesToShow: 1,
              slidesToScroll: 1
            }} className="mb-6 rounded-lg overflow-hidden">
              {section.images.map((img, i) => (
                <img key={i} src={img} alt={section.name} className="w-full h-64 object-cover" />
              ))}
            </Slider>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">🏖 Amenities</h3>
              <ul className="list-disc list-inside text-gray-700">
                {section.amenities.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">📍 Location</h3>
              <p>{section.location}</p>
              {section.mapLink && <a href={section.mapLink} className="text-blue-600 hover:underline">View on Google Maps →</a>}

              <h3 className="text-lg font-semibold mt-4">🕒 Best Time</h3>
              <p>{section.bestTime}</p>
            </div>
          </div>

          {section.nearby && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">🍽 Nearby</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {section.nearby.map((place, i) => <li key={i}>{place}</li>)}
              </ul>
            </div>
          )}
        </div>
      ))}

      {slug === "safari-packing-list" && article.content.map((section, index) => (
        <div key={index} className="bg-green-50 p-6 rounded-2xl mb-8 shadow" data-aos="fade-up">
          <h2 className="text-xl font-bold text-green-800 mb-2">{section.name}</h2>
          <p className="text-gray-700 mb-3">{section.summary}</p>
          <ul className="list-disc ml-6 text-gray-800 space-y-1">
            {section.amenities.map((item, i) => <li key={i}>✅ {item}</li>)}
          </ul>
        </div>
      ))}

      {slug === "navigating-airports" && article.content.map((airport, index) => (
        <div key={index} className="bg-blue-50 p-6 rounded-xl mb-8 border-l-4 border-blue-400 shadow-md" data-aos="fade-up">
          <h2 className="text-xl font-bold text-blue-800 mb-1">{airport.name}</h2>
          <p className="mb-3 text-gray-700">{airport.summary}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">🛠 Amenities</h3>
              <ul className="list-disc list-inside text-gray-700">
                {airport.amenities.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">📍 Location</h3>
              <p>{airport.location}</p>
              {airport.mapLink && <a href={airport.mapLink} className="text-blue-600 hover:underline">Google Maps →</a>}
              <h3 className="font-semibold mt-2">🕒 Best Time</h3>
              <p>{airport.bestTime}</p>
            </div>
          </div>
          <h3 className="font-semibold mt-4">Nearby Services</h3>
          <ul className="list-disc ml-6 text-gray-700">
            {airport.nearby.map((place, i) => <li key={i}>{place}</li>)}
          </ul>
        </div>
      ))}

      {article.tips && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl mb-10 shadow-sm" data-aos="zoom-in">
          <h3 className="text-lg font-semibold flex items-center mb-2 text-yellow-800">
            <FaInfoCircle className="mr-2" /> Quick Tips
          </h3>
          <ul className="list-disc ml-6 text-gray-700">
            {article.tips.map((tip, index) => <li key={index}>{tip}</li>)}
          </ul>
        </div>
      )}

      <div className="text-center mt-10">
        <Link to="/search" className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-full shadow hover:bg-teal-700 transition">
          <FaPlaneDeparture className="mr-2" /> Search Flights
        </Link>
      </div>
    </div>
  );
};

export default TravelArticle;
