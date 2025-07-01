import { useState } from "react";
import axios from "../axiosConfig";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot-password", { email });
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      console.error(err);
      alert("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        {message ? (
          <p className="text-green-600">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 border rounded"
              required
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
