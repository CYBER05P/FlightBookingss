import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './pages/HomePage';
import FlightResultPage from "./pages/FlightResultPage";
import BookingPage from "./pages/BookingPage"; 
import DealDetailsPage from "./pages/DealDetailsPage";

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
      </Routes>
    </Router>
  );
}

export default App;
