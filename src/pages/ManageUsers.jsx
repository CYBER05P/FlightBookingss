import { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
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

  const handleDeactivate = async (id) => {
    if (!window.confirm("Deactivate this user?")) return;
    try {
      await axios.put(`/api/admin/users/${id}/deactivate`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to deactivate user");
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
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleRoleChange(u.id, u.role === "admin" ? "user" : "admin")}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  {u.role === "admin" ? "Demote to User" : "Promote to Admin"}
                </button>
                {u.active && (
                  <button
                    onClick={() => handleDeactivate(u.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
