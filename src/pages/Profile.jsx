import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../utils/api"; // Import the API helper

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");


  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest("/Manage/profile", "GET");

        if (data.statusCode === 200) {
          setUser((prevUser) => ({
            ...prevUser,
            name: data.data.name,
            email: data.data.email,
          }));
        } else {
          toast.error("Failed to fetch profile.");
          console.error(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching profile data.");
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Clear password error when user starts typing
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    // Validate password match
    if (user.password && user.password !== user.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const updatedData = {
        name: user.name,
        password: user.password, // Only send password if provided
      };

      const response = await apiRequest("/Manage/profile", "PUT", updatedData);

      if (response.statusCode === 200) {
        toast.success("Profile updated successfully!");
        // Clear password fields after successful update
        setUser((prevUser) => ({
          ...prevUser,
          password: "",
          confirmPassword: "",
        }));
      } else {
        toast.error(response.message || "Update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3 className="text-center mt-4">Loading profile...</h3>;

  return (
    <div className="container pt-4">
      <h2 className="text-center">Profile</h2>
      <div className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email (Read-only)</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            disabled
          />
        </div>

        {/* Password fields */}
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        {/* Password Error */}
        {passwordError && <p className="text-danger">{passwordError}</p>}

        <button
          className="btn btn-success w-100"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
