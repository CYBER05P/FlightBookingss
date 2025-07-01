import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../axiosConfig";

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/auth/reset-password", { token, password });
      alert("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="block w-full p-2 border rounded"
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
