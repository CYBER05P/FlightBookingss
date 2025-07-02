// components/FlightStatus.jsx

import { FaPlane, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const flights = [
  {
    airline: "FMS Airways",
    route: "Nairobi → Mombasa",
    time: "11:30 AM",
    status: "On Time",
  },
  {
    airline: "FMS Airways",
    route: "Kisumu → Nairobi",
    time: "12:15 PM",
    status: "Delayed",
  },
  {
    airline: "Partner Air",
    route: "Dubai → Nairobi",
    time: "2:00 PM",
    status: "Boarding",
  },
  {
    airline: "Skyways",
    route: "Eldoret → Kisumu",
    time: "3:45 PM",
    status: "On Time",
  },
  {
    airline: "FMS Airways",
    route: "Nairobi → Malindi",
    time: "5:00 PM",
    status: "Delayed",
  },
];

export default function FlightStatus() {
  const getStatusColor = (status) => {
    switch (status) {
      case "On Time":
        return "text-green-600";
      case "Delayed":
        return "text-red-600";
      case "Boarding":
        return "text-yellow-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Live Flight Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((flight, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <FaPlane className="text-blue-600 text-2xl mr-3" />
                <h3 className="text-lg font-bold text-gray-800">
                  {flight.airline}
                </h3>
              </div>

              <p className="text-gray-600 mb-2">
                <span className="font-medium">Route:</span> {flight.route}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Departure:</span> {flight.time}
              </p>

              <div className="flex items-center mt-4">
                {flight.status === "On Time" && <FaCheckCircle className="text-green-600 mr-2" />}
                {flight.status === "Delayed" && <FaExclamationTriangle className="text-red-600 mr-2" />}
                {flight.status === "Boarding" && <FaClock className="text-yellow-500 mr-2" />}

                <span className={`font-semibold ${getStatusColor(flight.status)}`}>
                  {flight.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
