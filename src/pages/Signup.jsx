import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // Replace with your API URL
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.message === "تم التسجيل بنجاح") {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error signing up. Check your connection.");
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row shadow p-4 bg-white rounded w-100 w-md-50">
        
        {/* Left Side - Image */}
        <div className="col-md-6 d-none d-md-block">
          <img src="/auth.jpg" alt="Sign Up" className="img-fluid rounded" />
        </div>

        {/* Right Side - Signup Form */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="w-100">
            <h2 className="text-center mb-4">Sign Up</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-petrol w-100" onClick={handleSignup}>Sign Up</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;