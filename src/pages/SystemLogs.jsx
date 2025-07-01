import { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function SystemLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/api/admin/logs");
      setLogs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch logs");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Activity Logs</h2>

      <ul className="space-y-4">
        {logs.map((log) => (
          <li key={log.id} className="border p-4 rounded shadow bg-white">
            <p>{log.action}</p>
            <p className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
