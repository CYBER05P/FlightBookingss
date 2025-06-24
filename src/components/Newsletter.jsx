import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Get the Best Deals in Your Inbox</h2>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter for exclusive offers and travel inspiration</p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 p-3 border rounded"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 whitespace-nowrap">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  );
};

export default Newsletter;