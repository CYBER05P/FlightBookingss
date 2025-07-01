import { useState, useEffect } from "react";
import axios from "../axiosConfig";

export default function ManageAirports() {
  const [airports, setAirports] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/airports");
      setAirports(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch airports");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, code, city, country };

    try {
      if (editId) {
        await axios.put(`/admin/airports/${editId}`, payload);
      } else {
        await axios.post("/admin/airports", payload);
      }

      resetForm();
      fetchAirports();
    } catch (err) {
      console.error(err);
      alert("Failed to save airport");
    }
  };

  const handleEdit = (airport) => {
    setName(airport.name);
    setCode(airport.code);
    setCity(airport.city);
    setCountry(airport.country);
    setEditId(airport.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this airport?")) return;

    try {
      await axios.delete(`/admin/airports/${id}`);
      fetchAirports();
    } catch (err) {
      console.error(err);
      alert("Failed to delete airport");
    }
  };

  const resetForm = () => {
    setName("");
    setCode("");
    setCity("");
    setCountry("");
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Airports</h2>

      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" required />
        <input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} className="border p-2 w-full" required />
        <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="border p-2 w-full" required />
        <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="border p-2 w-full" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update Airport" : "Add Airport"}
        </button>
      </form>

      {loading ? (
        <p>Loading airports...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Country</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {airports.map((ap) => (
              <tr key={ap.id} className="border-t">
                <td className="p-2 border">{ap.name}</td>
                <td className="p-2 border">{ap.code}</td>
                <td className="p-2 border">{ap.city}</td>
                <td className="p-2 border">{ap.country}</td>
                <td className="p-2 border flex space-x-2">
                  <button onClick={() => handleEdit(ap)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(ap.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}