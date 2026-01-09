import { Navigate } from "react-router-dom";

export function UserProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// للمدير
export function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("admintoken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}
