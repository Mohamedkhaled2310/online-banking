import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../utils/api"; // Import the API helper

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest("/user/profile", "GET");
        
        if (data.statusCode === 200) {
          setUser({ name: data.user.name, email: data.user.email });
        } else {
          toast.error("Failed to fetch profile.");
        }
      } catch (error) {
        toast.error("Error fetching profile.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const response = await apiRequest("/user/profile/update", "PUT", user);
      
      if (response.statusCode === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.message || "Update failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile.");
    }
  };

  if (loading) return <h3 className="text-center mt-4">Loading profile...</h3>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Profile</h2>
      <div className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email (Read-only)</label>
          <input type="email" className="form-control" value={user.email} disabled />
        </div>
        <button className="btn btn-petrol w-100" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
