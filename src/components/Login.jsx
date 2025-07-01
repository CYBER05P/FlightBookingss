import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../axiosConfig";
import { FaPlaneDeparture, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });

      const userData = {
        name: res.data.name,
        email: res.data.email,
        role: res.data.role.toLowerCase(), // Normalize role here
        token: res.data.token,
        idOrPassport: res.data.idOrPassport,
        country: res.data.country,
        dateOfBirth: res.data.dateOfBirth
      };

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('token', userData.token);
      }

      console.log("Logged in as:", userData.role);

      if (userData.role === "admin") {
        navigate('/admin/dashboard');
      } else {
        navigate('/homepage');
      }

    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <FaPlaneDeparture className="text-blue-600 text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">FMS Airways Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 border rounded focus:outline-blue-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 border rounded focus:outline-blue-500"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
