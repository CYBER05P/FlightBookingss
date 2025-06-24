import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How early you should I arrive at the airport?",
      answer: "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights."
    },
    {
      question: "Can I change or cancel my flight?",
      answer: "Yes, depending on your fare type. Please check the terms of your ticket or contact our customer service."
    },
    {
      question: "What's included in my ticket price?",
      answer: "Your ticket includes the flight, standard baggage allowance, and in-flight services. Meals may vary by route."
    },
    {
      question: "How do I apply promo codes?",
      answer: "Enter your promo code during checkout on our website or mobile app before payment."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <IoIosArrowDown className={`text-gray-500 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`} />
              </button>
              
              {activeIndex === index && (
                <div className="p-4 bg-gray-50 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;