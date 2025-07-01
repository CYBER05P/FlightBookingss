import { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function ManagePromotions() {
  const [promotions, setPromotions] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    discount: "",
    image: null
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await axios.get("/api/promotions");
      setPromotions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch promotions");
    }
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("discount", form.discount);
    if (form.image) data.append("image", form.image);

    try {
      await axios.post("/api/promotions", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchPromotions();
      setForm({ title: "", description: "", discount: "", image: null });
    } catch (err) {
      console.error(err);
      alert("Failed to add promotion");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this promotion?")) return;
    try {
      await axios.delete(`/api/promotions/${id}`);
      fetchPromotions();
    } catch (err) {
      console.error(err);
      alert("Failed to delete promotion");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Promotions</h2>

      <form onSubmit={handleAddPromotion} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="border p-2 w-full"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Promotion</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Discount (%)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo.id} className="border-t">
              <td className="p-2 border">
                {promo.imageUrl ? (
                  <img src={promo.imageUrl} alt="Promo" className="w-20 h-20 object-cover" />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-2 border">{promo.title}</td>
              <td className="p-2 border">{promo.description}</td>
              <td className="p-2 border">{promo.discount}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(promo.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
