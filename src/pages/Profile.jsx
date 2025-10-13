import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Dummy user data
  const navigate=useNavigate();
  const [user] = useState({
    name: "Niraj Giri",
    email: "niraj@example.com",
    phone: "+91 9876543210",
    address: "123, Green Street, Bangalore, India",
    totalComplaints: 25,
    resolved: 18,
    pending: 7,
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
  });

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.avatar} alt="avatar" className="avatar" />
          <h2>{user.name}</h2>
          <p className="email">{user.email}</p>
        </div>

        <div className="profile-details">
          <h3>Contact Information</h3>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>

          <h3>Complaints Summary</h3>
          <p>
            <strong>Total Complaints:</strong> {user.totalComplaints}
          </p>
          <p>
            <strong>Resolved:</strong> {user.resolved}
          </p>
          <p>
            <strong>Pending:</strong> {user.pending}
          </p>
        </div>

        <div className="profile-actions">
          <button className="edit-btn" onClick={()=>navigate("/EditProfile")}>✏️ Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
