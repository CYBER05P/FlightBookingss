import { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/admin/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch notifications");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Notifications</h2>

      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li key={note.id} className="border p-4 rounded shadow bg-white">
              <p>{note.message}</p>
              <p className="text-sm text-gray-500">{new Date(note.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
