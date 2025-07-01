import { FaPlaneDeparture, FaSearch, FaUser } from "react-icons/fa";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <FaPlaneDeparture className="text-blue-600 text-2xl" />,
      title: "Modern Fleet",
      desc: "Fly in comfort with our state-of-the-art aircraft featuring the latest amenities.",
    },
    {
      icon: <FaSearch className="text-blue-600 text-2xl" />,
      title: "Best Prices",
      desc: "We guarantee the best prices for your flights or we'll match the difference.",
    },
    {
      icon: <FaUser className="text-blue-600 text-2xl" />,
      title: "24/7 Support",
      desc: "Our customer service team is available around the clock to assist you.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose FMS Airways?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                {b.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}