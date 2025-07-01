import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
import FlightResultPage from "./pages/FlightResultPage";
import BookingPage from "./pages/BookingPage";
import DealDetailsPage from "./pages/DealDetailsPage";
import PromoMombasa from './pages/PromoMombasa'; // adjust path as needed
import PromoDubaiPage from './pages/PromoDubaiPage';
import PromoKisumuPage from './pages/PromoKisumuPage';
import DestinationNairobiPage from "./pages/DestinationNairobiPage";
import DestinationKisumuPage from "./pages/DestinationKisumuPage";
import DestinationEldoretPage from "./pages/DestinationEldoretPage";
import DestinationMalindiPage from "./pages/DestinationMalindiPage";
import About from './pages/About';
import Contact from './pages/Contact';
import TravelArticle from './pages/TravelArticle';
import MyBookingsPage from './pages/MyBookingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/flights" element={<FlightResultPage />} />
        <Route path="/booking" element={<BookingPage />} /> {/* Booking Route */}
        <Route path="/deals/:id" element={<DealDetailsPage />} />
        <Route path="/promo-mombasa" element={<PromoMombasa />} />
        <Route path="/promo-dubai" element={<PromoDubaiPage />} />
        <Route path="/promo-kisumu" element={<PromoKisumuPage />} />
        <Route path="/destinations/nairobi" element={<DestinationNairobiPage />} />
        <Route path="/destinations/kisumu" element={<DestinationKisumuPage />} />
        <Route path="/destinations/eldoret" element={<DestinationEldoretPage />} />
        <Route path="/destinations/malindi" element={<DestinationMalindiPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/travel/:slug" element={<TravelArticle />} />
        <Route path="/bookings" element={<MyBookingsPage />} />

        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/flights" element={<AdminRoute><ManageFlights /></AdminRoute>} />
        <Route path="/admin/aircrafts" element={<AdminRoute><ManageAircrafts /></AdminRoute>} />
        <Route path="/admin/airports" element={<AdminRoute><ManageAirports /></AdminRoute>} />
        <Route path="/admin/promotions" element={<AdminRoute><ManagePromotions /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />
        <Route path="/admin/stats" element={<AdminRoute><AdminStats /></AdminRoute>} />
        <Route path="/admin/trends" element={<AdminRoute><AdminTrends /></AdminRoute>} />
        <Route path="/admin/notifications" element={<AdminRoute><AdminNotifications /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/logs" element={<AdminRoute><SystemLogs /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;