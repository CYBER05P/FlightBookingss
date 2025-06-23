import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The smoothest booking experience I've ever had. Will definitely fly with FMS again!",
      author: "Sarah K., Nairobi",
      rating: "★★★★★"
    },
    {
      quote: "Affordable prices and great customer service. My go-to airline for domestic travel.",
      author: "James M., Mombasa",
      rating: "★★★★☆"
    },
    {
      quote: "Impressed with the on-time performance. The crew was exceptionally friendly.",
      author: "Fatuma A., Kisumu",
      rating: "★★★★★"
    }
  ];

  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-yellow-400 mb-3">{testimonial.rating}</div>
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-medium text-gray-800">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;