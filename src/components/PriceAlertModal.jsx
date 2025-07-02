// components/PriceAlertModal.jsx

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PriceAlertModal({ isOpen, onClose, destination }) {
  const [targetPrice, setTargetPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!targetPrice || isNaN(targetPrice)) {
      toast.error("Please enter a valid price");
      return;
    }

    // For now, simulate alert saving
    toast.success(`Price alert set for ${destination} at ${targetPrice}`);
    setTargetPrice("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Set Price Alert for {destination}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="Enter target price"
            className="w-full border px-3 py-2 rounded focus:outline-none"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
