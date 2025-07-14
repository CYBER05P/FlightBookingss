import { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [view, setView] = useState("general");

  // General Notification State
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Modal State for Personal Reply
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyStatus, setReplyStatus] = useState("IN_PROGRESS");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/complaints");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch notifications");
    }
  };

  const handleSendGeneral = async () => {
    if (!newSubject.trim() || !newMessage.trim()) return alert("Subject and message required");
    try {
      await axios.post("/admin/notify", { subject: newSubject, message: newMessage });
      showSuccess("✅ General notification sent successfully!");
      setNewSubject("");
      setNewMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send general notification");
    }
  };

  const openReplyModal = (complaint) => {
    setSelectedComplaint(complaint);
    setReplyMessage("");
    setReplyStatus("IN_PROGRESS");
    setShowModal(true);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return alert("Reply message cannot be empty");
    try {
      await axios.put(`/complaints/${selectedComplaint.id}`, {
        adminResponse: replyMessage,
        status: replyStatus,
      });
      showSuccess("✅ Reply sent successfully!");
      setShowModal(false);
      fetchNotifications();
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 rounded shadow">
      <button
        onClick={() => window.history.back()}
        className="bg-gray-500 text-white px-3 py-1 rounded mb-4 hover:bg-gray-600"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-4 text-center">Admin Notifications Panel</h2>

      {successMsg && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center font-semibold">
          {successMsg}
        </div>
      )}

      <div className="mb-4 text-center">
        <button
          onClick={() => setView("general")}
          className={`px-4 py-2 mr-2 rounded font-semibold ${
            view === "general" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          General Notifications
        </button>
        <button
          onClick={() => setView("personal")}
          className={`px-4 py-2 rounded font-semibold ${
            view === "personal" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Personal Notifications
        </button>
      </div>

      {view === "general" && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Subject"
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a general notification..."
            className="w-full p-2 border rounded mb-2"
          ></textarea>
          <button
            onClick={handleSendGeneral}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          >
            Send General Notification
          </button>
        </div>
      )}

      {view === "personal" && (
        <>
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No personal notifications found.</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((note) => (
                <li key={note.id} className="border p-4 rounded bg-white shadow space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">From User ID: {note.userId}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        note.status === "OPEN"
                          ? "bg-yellow-100 text-yellow-700"
                          : note.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {note.status}
                    </span>
                  </div>

                  <p className="text-gray-700 break-words">{note.message}</p>

                  {note.adminResponse && (
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-xs text-gray-600 font-semibold">Admin Response:</p>
                      <p className="text-sm text-gray-800">{note.adminResponse}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Sent: {new Date(note.createdAt).toLocaleString()}
                    </p>
                    {note.status === "RESOLVED" ? (
                      <button
                        disabled
                        title="This complaint is already resolved"
                        className="bg-gray-400 text-white px-3 py-1 rounded text-xs cursor-not-allowed"
                      >
                        Reply (Disabled)
                      </button>
                    ) : (
                      <button
                        onClick={() => openReplyModal(note)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                      >
                        Reply
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Reply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-2">Reply to Complaint</h3>
            <p className="text-gray-700 mb-2">
              <strong>User ID:</strong> {selectedComplaint.userId}
            </p>
            <p className="text-gray-600 mb-4 italic">
              "{selectedComplaint.message}"
            </p>

            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
              className="w-full p-2 border rounded mb-2"
            ></textarea>

            <select
              value={replyStatus}
              onChange={(e) => setReplyStatus(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
