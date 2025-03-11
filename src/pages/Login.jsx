import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Import Cookies

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // Replace with your API URL
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        // Save token in cookies (expires in 7 days)
        Cookies.set("authToken", data.user.token, { expires: 7, secure: true, sameSite: "Strict" });
        console.log(data.token);
        // Save user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.user.name));

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Error logging in. Check your connection.");
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row shadow p-4 bg-white rounded w-100 w-md-50">
        
        {/* Left Side - Image */}
        <div className="col-md-6 d-none d-md-block">
          <img src="/auth.jpg" alt="Login" className="img-fluid rounded" />
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="w-100">
            <h2 className="text-center mb-4">Login</h2>
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
            <button className="btn btn-petrol w-100" onClick={handleLogin}>Login</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
