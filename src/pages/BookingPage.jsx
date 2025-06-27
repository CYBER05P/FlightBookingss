import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlane, FaMoneyBill, FaCheckCircle, FaTag, FaDownload, FaRedo } from 'react-icons/fa';

const BookingPage = () => {
  const { state: flight } = useLocation();
  const navigate = useNavigate();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [seatClass, setSeatClass] = useState('ECONOMY');
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const code = localStorage.getItem('promoCode');
    if (code) setPromoCode(code);
  }, []);

  useEffect(() => {
    let pricePerAdult = 0;
    if (seatClass === 'ECONOMY') pricePerAdult = flight.economyPrice;
    if (seatClass === 'BUSINESS') pricePerAdult = flight.businessPrice;
    if (seatClass === 'FIRST') pricePerAdult = flight.firstClassPrice;

    const adultTotal = adults * pricePerAdult;
    const childTotal = children * (pricePerAdult * 0.5);
    let total = adultTotal + childTotal;
    let discount = 0;

    if (promoCode) {
      discount = total * 0.15;
      total -= discount;
    }

    setDiscountAmount(discount);
    setTotalPrice(total);
  }, [adults, children, seatClass, promoCode, flight]);

  const handleBooking = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.post('http://192.168.1.143:8085/api/bookings/book', {
        flightId: flight.flightId,
        numberOfAdults: adults,
        numberOfChildren: children,
        seatClass: seatClass.toUpperCase()
      });

      setConfirmation(res.data);
      toast.success('Booking successful!', {
        position: 'top-center',
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.error('Booking failed. Please try again.', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = () => {
    if (!confirmation || !confirmation.qrCodeBase64) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${confirmation.qrCodeBase64}`;
    link.download = `Ticket_${confirmation.confirmationCode}.png`;
    link.click();
  };

  const bookAnother = () => {
    navigate(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex items-center justify-center">
      <motion.div className="bg-white p-6 rounded-2xl shadow-2xl max-w-3xl w-full space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {!confirmation ? (
          <>
            <h2 className="text-3xl font-bold text-blue-700 text-center mb-4">Confirm Your Booking</h2>

            <div className="space-y-2 text-gray-700">
              <p><FaPlane className="inline text-blue-600 mr-1" /> {flight.departureCity} → {flight.arrivalCity}</p>
              <p>Aircraft: {flight.aircraftModel}</p>
              <p>Flight No: {flight.flightNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-600">Adults</label>
                <input type="number" min="1" value={adults} onChange={(e) => setAdults(parseInt(e.target.value) || 1)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block mb-1 text-gray-600">Children</label>
                <input type="number" min="0" value={children} onChange={(e) => setChildren(parseInt(e.target.value) || 0)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Seat Class</label>
              <select value={seatClass} onChange={(e) => setSeatClass(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="ECONOMY">Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST">First Class</option>
              </select>
            </div>

            <div className="text-xl font-semibold text-gray-800 space-y-1">
              <div className="flex items-center gap-2">
                <FaMoneyBill className="text-green-600" /> Total: KSH {totalPrice.toFixed(2)}
              </div>
              {promoCode && (
                <p className="text-sm text-green-700 flex items-center gap-2">
                  <FaTag /> Promo <strong>{promoCode}</strong> applied! You saved KSH {discountAmount.toFixed(2)}
                </p>
              )}
            </div>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={handleBooking} disabled={loading} className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-full transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
                </svg>
              ) : (
                <>
                  <FaCheckCircle className="inline" /> Book Now
                </>
              )}
            </motion.button>
          </>
        ) : (
          <motion.div className="flex flex-col md:flex-row items-start justify-between bg-green-100 rounded-xl shadow-lg p-6 text-gray-800 gap-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-bold text-green-700">Booking Confirmed!</h3>
              <p><strong>Confirmation Code:</strong> {confirmation.confirmationCode}</p>
              <p><strong>Name:</strong> {confirmation.name}</p>
              <p><strong>Email:</strong> {confirmation.email}</p>
              <p><strong>Flight Number:</strong> {confirmation.flightNumber}</p>
              <p><strong>Departure:</strong> {new Date(confirmation.departureTime).toLocaleString()}</p>
              <p><strong>Arrival:</strong> {new Date(confirmation.arrivalTime).toLocaleString()}</p>
              <p><strong>Seats:</strong> {confirmation.seatNumbers.join(', ')} ({confirmation.seatClasses.join(', ')})</p>
              <p><strong>Total Price:</strong> KSH {confirmation.totalPrice}</p>
              <div className="flex gap-4 mt-4 flex-wrap">
                <button onClick={downloadTicket} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                  <FaDownload /> Download Ticket
                </button>
                <button onClick={bookAnother} className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition text-sm">
                  <FaRedo /> Book Another Flight
                </button>
              </div>
            </div>
            {confirmation.qrCodeBase64 && (
              <div className="w-40 md:w-48 shrink-0">
                <p className="font-semibold mb-2">Your Boarding QR Code:</p>
                <img src={`data:image/png;base64,${confirmation.qrCodeBase64}`} alt="QR Code" className="w-full h-auto rounded bg-white p-1 shadow-md" />
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default BookingPage;
