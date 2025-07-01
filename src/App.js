import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
import FlightResultPage from "./pages/FlightResultPage";
import BookingPage from "./pages/BookingPage";
import DealDetailsPage from "./pages/DealDetailsPage";
import PromoMombasa from "./pages/PromoMombasa";
import PromoDubaiPage from "./pages/PromoDubaiPage";
import PromoKisumuPage from "./pages/PromoKisumuPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TravelArticle from "./pages/TravelArticle";
import MyBookingsPage from "./pages/MyBookingsPage";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageFlights from "./pages/ManageFlights";
import ManagePromotions from "./pages/ManagePromotions";
import ManageBookings from "./pages/ManageBookings";
import AdminStats from "./pages/AdminStats";
import AdminTrends from "./pages/AdminTrends";
import AdminNotifications from "./pages/AdminNotifications";
import ManageUsers from "./pages/ManageUsers";
import SystemLogs from "./pages/SystemLogs";
import ManageAircrafts from "./pages/ManageAircrafts";
import ManageAirports from "./pages/ManageAirports";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));

  if (user && user.role && user.role.toLowerCase() === "admin") {
    return children;
  } else {
    window.location.href = "/login";
    return null;
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/flights" element={<FlightResultPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/deals/:id" element={<DealDetailsPage />} />
        <Route path="/promo-mombasa" element={<PromoMombasa />} />
        <Route path="/promo-dubai" element={<PromoDubaiPage />} />
        <Route path="/promo-kisumu" element={<PromoKisumuPage />} />
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
