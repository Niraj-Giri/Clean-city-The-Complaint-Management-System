import React, { useState } from "react";
import "./EditProfile.css";

const EditProfile = () => {
  // Dummy user data
  const [user, setUser] = useState({
    name: "Niraj Kumar",
    email: "niraj@example.com",
    phone: "+91 9876543210",
    address: "123, Green Street, Bangalore, India",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
  });

  const [preview, setPreview] = useState(user.avatar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setUser({ ...user, avatar: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send data to your backend
    alert("Profile updated successfully!");
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="avatar-section">
            <img src={preview} alt="avatar" className="avatar-preview" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

          <button type="submit" className="save-btn">
            💾 Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
