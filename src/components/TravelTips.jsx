import React from 'react';

const TravelTips = () => {
  const tips = [
    {
      title: "5 Must-Visit Beaches in Kenya",
      excerpt: "Discover hidden gems along Kenya's coastline",
      image: "/images/Beach.jpg"
    },
    {
      title: "Packing List for Safari Adventures",
      excerpt: "Essential items for your wildlife experience",
      image: "/images/Packing.jpg"
    },
    {
      title: "how to Navigate Kenyan Airports",
      excerpt: "Tips for smooth airport experiences",
      image: "/images/Airport.jpg"
    }
  ];

  return (
    <section className="mx-6 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Tips & Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
            <img 
              src={tip.image} 
              alt={tip.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600 mb-4">{tip.excerpt}</p>
              <button className="text-blue-600 font-medium hover:underline">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelTips;