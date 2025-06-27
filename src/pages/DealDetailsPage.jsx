import { useParams, useNavigate } from "react-router-dom";
import { FaPlane, FaTag, FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const deals = [
  {
    id: 1,
    title: "Early Bird Special",
    description: "Book 60+ days in advance and save up to 20% on select routes",
    code: "EARLY20",
    discount: 0.20,
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
    discount: 0.15,
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
    discount: 0.15,
    terms: "Valid student ID required at check-in. Applies to base fare only.",
    destinations: ["All Domestic"],
    validUntil: "2026-06-30",
    image: "/images/Diani.jpg"
  }
];

const DealDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const foundDeal = deals.find((d) => d.id === parseInt(id));
    setDeal(foundDeal);

    if (foundDeal) {
      const calculateDaysLeft = (date) => {
        const now = new Date();
        const end = new Date(date);
        const diffTime = end - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
      };
      setDaysLeft(calculateDaysLeft(foundDeal.validUntil));
    }
  }, [id]);

  const handleApply = () => {
    localStorage.setItem("promoCode", deal.code);
    localStorage.setItem("promoDiscount", deal.discount);
    toast.success(`"${deal.title}" applied! You save ${(deal.discount * 100)}% 🎉`);
    setTimeout(() => navigate("/flights"), 1500);
  };

  if (!deal) {
    return <div className="text-center py-20 text-gray-600">Offer not found.</div>;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl h-[90%] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        {/* Left: Image */}
        <div className="md:w-1/2 h-64 md:h-full">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2 flex flex-col justify-between p-4 md:p-6 overflow-y-auto">
          <div className="space-y-4 flex-grow">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaTag className="text-blue-600" />
              {deal.title}
            </h2>

            {/* Expiry badge */}
            {daysLeft !== null && (
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  daysLeft < 5
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                🕒 Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
              </span>
            )}

            {/* Promo Codes */}
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                <FaTag /> {deal.code}
              </span>
              <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                <FaCheckCircle /> Save {deal.discount * 100}%
              </span>
            </div>

            <p className="text-gray-700 text-sm">{deal.description}</p>

            {/* Grid Info */}
            <div className="text-sm grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-500">Valid Until:</p>
                <p className="font-semibold">{new Date(deal.validUntil).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Destinations:</p>
                <p className="font-semibold truncate">{deal.destinations.join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-500">Valid Days:</p>
                <p className="font-medium text-gray-700">Monday to Friday</p>
              </div>
              <div>
                <p className="text-gray-500">Example Route:</p>
                <p className="font-medium text-blue-700">Nairobi → Mombasa → Kisumu</p>
              </div>
            </div>

            {/* Animated Route */}
            <div className="flex items-center justify-start gap-1 text-blue-600 text-xs pt-1">
              <FaPlane className="animate-bounce" />
              <span className="font-medium">Nairobi</span>
              <span className="text-gray-500">→</span>
              <span className="font-medium">Mombasa</span>
              <span className="text-gray-500">→</span>
              <span className="font-medium">Kisumu</span>
            </div>

            {/* Map Preview */}
            <div className="rounded-lg overflow-hidden shadow border border-gray-200">
              <img
                src="/images/kenya-map-routes.png"
                alt="Map Routes"
                className="w-full object-cover h-28"
              />
            </div>

            {/* Example Booking */}
            <div className="bg-gray-100 p-2 rounded-md text-xs">
              <p className="font-semibold mb-1">Example Booking:</p>
              <p>Book on July 1st for a September 5th flight and save {deal.discount * 100}% on Mombasa route!</p>
            </div>

            {/* Ideal For */}
            <div className="text-xs">
              <p className="text-gray-500">Ideal For:</p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Early planners & vacationers</li>
                <li>Families during holidays</li>
                <li>Budget-conscious flyers</li>
              </ul>
            </div>

            {/* Terms */}
            <div className="bg-blue-50 p-3 rounded-md text-xs">
              <p className="font-semibold mb-1">Terms & Conditions:</p>
              <p className="text-gray-600">{deal.terms}</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleApply}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2 text-sm"
          >
            <FaPlane /> Apply This Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealDetailsPage;
