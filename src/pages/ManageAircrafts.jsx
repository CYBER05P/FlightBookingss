// ManageAircrafts.jsx
import { useState, useEffect } from "react";
import axios from "../axiosConfig";

export default function ManageAircrafts() {
  const [aircrafts, setAircrafts] = useState([]);
  const [model, setModel] = useState("");
  const [economySeats, setEconomySeats] = useState("");
  const [businessSeats, setBusinessSeats] = useState("");
  const [firstClassSeats, setFirstClassSeats] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const fetchAircrafts = async () => {
    try {
      const res = await axios.get("/admin/aircrafts");
      setAircrafts(res.data);
    } catch (err) {
      alert("Failed to fetch aircrafts");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { model, economySeats, businessSeats, firstClassSeats };

    try {
      if (editId) {
        await axios.put(`/api/aircrafts/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post("/api/aircrafts", payload);
      }
      fetchAircrafts();
      setModel("");
      setEconomySeats("");
      setBusinessSeats("");
      setFirstClassSeats("");
    } catch (err) {
      alert("Failed to save aircraft");
    }
  };

  const handleEdit = (ac) => {
    setModel(ac.model);
    setEconomySeats(ac.economySeats);
    setBusinessSeats(ac.businessSeats);
    setFirstClassSeats(ac.firstClassSeats);
    setEditId(ac.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this aircraft?")) return;
    await axios.delete(`/api/aircrafts/${id}`);
    fetchAircrafts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Aircrafts</h2>

      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} className="border p-2 w-full" required />
        <input type="number" placeholder="Economy Seats" value={economySeats} onChange={(e) => setEconomySeats(e.target.value)} className="border p-2 w-full" required />
        <input type="number" placeholder="Business Seats" value={businessSeats} onChange={(e) => setBusinessSeats(e.target.value)} className="border p-2 w-full" required />
        <input type="number" placeholder="First Class Seats" value={firstClassSeats} onChange={(e) => setFirstClassSeats(e.target.value)} className="border p-2 w-full" required />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">{editId ? "Update" : "Add"} Aircraft</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Model</th>
            <th className="p-2 border">Economy</th>
            <th className="p-2 border">Business</th>
            <th className="p-2 border">First Class</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {aircrafts.map((ac) => (
            <tr key={ac.id} className="border-t">
              <td className="p-2 border">{ac.model}</td>
              <td className="p-2 border">{ac.economySeats}</td>
              <td className="p-2 border">{ac.businessSeats}</td>
              <td className="p-2 border">{ac.firstClassSeats}</td>
              <td className="p-2 border flex space-x-2">
                <button onClick={() => handleEdit(ac)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(ac.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
