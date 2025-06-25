import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Helper to render Header only on main app pages
  const location = window.location.pathname;
  const hideHeader = location === "/" || location.startsWith("/auth");

  // Navigation helpers for Landing page buttons
  const navigate = useNavigate ? useNavigate() : null;
  const handleSignUp = () => navigate && navigate("/auth?tab=signup");
  const handleLogIn = () => navigate && navigate("/auth?tab=login");

  return (
    <>
      {!hideHeader && <Header activeTab={activeTab} onTabChange={tab => setActiveTab(tab)} />}
      <Routes>
        <Route path="/" element={<Landing onSignUp={handleSignUp} onLogIn={handleLogIn} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
        <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
