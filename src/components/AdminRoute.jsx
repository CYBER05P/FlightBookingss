import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (!storedUser || storedUser.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}

