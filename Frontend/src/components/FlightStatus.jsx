import React from 'react';

const FlightStatus = () => {
  return (
    <section className="mx-6 mb-12 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Check Flight Status</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Flight Number</label>
          <input 
            type="text" 
            placeholder="e.g. FMS123" 
            className="w-full p-3 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Date</label>
          <input 
            type="date" 
            className="w-full p-3 border rounded"
          />
        </div>
        <div className="flex items-end">
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Check Status
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlightStatus;