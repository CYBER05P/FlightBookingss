import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Mwangi",
    location: "Nairobi, Kenya",
    feedback: "Booking my flight was super easy and the service was excellent. Highly recommend FMS Airways!",
    rating: 5,
    avatar: "/images/Men.jpg",
  },
  {
    name: "Sophia Njeri",
    location: "Mombasa, Kenya",
    feedback: "Affordable prices and smooth travel experience. Will definitely book again!",
    rating: 4,
    avatar: "/images/Sophia.jpg",
  },
  {
    name: "Michael Otieno",
    location: "Kisumu, Kenya",
    feedback: "I love the customer support. They assisted me quickly when I had an issue.",
    rating: 5,
    avatar: "/images/Michael.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition group"
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 object-cover border-4 border-blue-500"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{review.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{review.location}</p>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 ${i < review.rating ? "" : "opacity-30"}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">"{review.feedback}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
