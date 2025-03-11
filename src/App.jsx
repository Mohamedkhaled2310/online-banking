import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Index } from "./pages/Index";
import ContactPage from "./pages/Cantact";
import Profile from "./pages/Profile";
import TransferMoneyPage from "./pages/TransferMoneyPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading process or API calls
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false once the process is done
    }, 3000); // Adjust the time according to your needs
  }, []);

  // Display a custom loading spinner while the app is loading
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="container-fluid" style={{ height: "calc(100vh - 56px)" }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route element = {<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transfer" element={<TransferMoneyPage />} /> 
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
