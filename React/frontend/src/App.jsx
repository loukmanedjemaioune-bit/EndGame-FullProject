import { useState } from "react";
import Game from "./Game.jsx";
import Login from "./component/Login.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLog from "./component/ManageInput.jsx";
import DashBoard from "./component/TableDash.jsx";
import { UserProtectedRoute, AdminProtectedRoute } from "./ProtectedRoute.jsx";
export default function App() {
  /* const [IsLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  return IsLogged ? (
    <Game />
  ) : (
    <Login
      onSuccess={() => {
        setIsLogged(true);
      }}
    />
  ); */
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/game"
        element={
          <UserProtectedRoute>
            <Game />
          </UserProtectedRoute>
        }
      />
      <Route path="/admin/login" element={<AdminLog />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <DashBoard />
          </AdminProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
