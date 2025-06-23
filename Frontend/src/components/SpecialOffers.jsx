import React from 'react';

const SpecialOffers = () => {
  const deals = [
    { 
      title: "Early Bird Special", 
      description: "Book 60+ days in advance and save up to 20%", 
      code: "EARLY20" 
    },
    { 
      title: "Weekend Getaway", 
      description: "Discounted flights every Friday-Sunday", 
      code: "WEEKEND15" 
    },
    { 
      title: "Student Discount", 
      description: "15% off for students with valid ID", 
      code: "STUDENT15" 
    }
  ];

  return (
    <section className="mx-6 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Exclusive Flight Deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{deal.title}</h3>
            <p className="text-gray-600 mb-4">{deal.description}</p>
            <div className="flex justify-between items-center">
              <span className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">{deal.code}</span>
              <button className="text-blue-600 font-medium hover:underline">Terms Apply</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;