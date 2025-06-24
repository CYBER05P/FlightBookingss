import { Link } from "react-router-dom";
import { FaArrowRight, FaPlane } from "react-icons/fa";

const SpecialOffers = () => {
  const deals = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "Book 60+ days in advance and save up to 20% on select routes",
      code: "EARLY20",
      terms: "Valid for bookings made at least 60 days before departure. Blackout dates may apply.",
      destinations: ["Mombasa", "Nairobi", "Kisumu"],
      validUntil: "2025-12-31",
      image: "/images/Malindi.jpg"
    },
    {
      id: 2,
      title: "Weekend Getaway",
      description: "Discounted flights every Friday-Sunday to popular destinations",
      code: "WEEKEND15",
      terms: "Valid for Friday-Monday travel only. Minimum 2-night stay required.",
      destinations: ["Malindi", "Diani", "Lamu"],
      validUntil: "2025-11-30",
      image: "/images/Lamu.jpg"
    },
    {
      id: 3,
      title: "Student Discount",
      description: "15% off for students with valid ID on all domestic flights",
      code: "STUDENT15",
      terms: "Valid student ID required at check-in. Applies to base fare only.",
      destinations: ["All Domestic"],
      validUntil: "2026-06-30",
      image: "/images/Diani.jpg"
    }
  ];

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Exclusive Flight Deals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unlock special savings on your next trip with these limited-time offers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="h-40 bg-gray-100 relative overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {deal.destinations.length === 1 ? deal.destinations[0] : `${deal.destinations.length} Destinations`}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{deal.title}</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                    {deal.code}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{deal.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Valid until:</span> {new Date(deal.validUntil).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Destinations:</span> {deal.destinations.join(", ")}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/deals/${deal.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
                  >
                    View details <FaArrowRight className="text-sm" />
                  </Link>
                  
                  <Link 
                    to="/flights" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    onClick={() => localStorage.setItem('promoCode', deal.code)}
                  >
                    <FaPlane /> Apply Deal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/deals" 
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Flight Deals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;