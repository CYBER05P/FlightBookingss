import { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`/api/admin/users/${id}/role`, { role });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  const handleToggleActive = async (id, isActive) => {
    if (!window.confirm(isActive ? "Deactivate this user?" : "Activate this user?")) return;
    try {
      await axios.put(`/api/admin/users/${id}/toggle-active`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle user status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const handleSendMessage = async (id) => {
    const message = window.prompt("Enter message to send:");
    if (!message) return;
    try {
      await axios.post(`/api/admin/users/${id}/send-message`, { message });
      alert("Message sent successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.active ? "Active" : "Deactivated"}</td>
              <td className="p-2 border space-x-1">
                <button
                  onClick={() => handleRoleChange(u.id, u.role === "admin" ? "user" : "admin")}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                >
                  {u.role === "admin" ? "Demote" : "Promote"}
                </button>
                <button
                  onClick={() => handleToggleActive(u.id, u.active)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                >
                  {u.active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSendMessage(u.id)}
                  className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                >
                  Send Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
