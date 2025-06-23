import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "What is your baggage allowance?",
      answer: "Our standard allowance is 23kg for checked baggage and 7kg for cabin baggage on domestic flights."
    },
    {
      question: "Can I change my flight date?",
      answer: "Yes, you can change your flight date up to 24 hours before departure, subject to availability and fare difference."
    },
    {
      question: "How early should I arrive at the airport?",
      answer: "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights."
    },
    {
      question: "Do you offer special assistance for passengers with disabilities?",
      answer: "Yes, we provide special assistance. Please inform us at least 48 hours before your flight."
    }
  ];

  return (
    <section className="mx-6 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button className="flex justify-between items-center w-full text-left font-medium text-gray-800">
              <span>{faq.question}</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div className="mt-2 text-gray-600">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;