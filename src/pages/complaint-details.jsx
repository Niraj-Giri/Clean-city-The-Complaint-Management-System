import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./complaint-details.css"

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🧠 Dummy complaint data (replace with backend fetch later)
  const complaint = {
    id,
    category: "Garbage Overflow",
    location: "Sector 12, Green Park",
    description:
      "Garbage bins have not been cleared for the past 3 days, causing bad odor and health risk.",
    status: "Resolved",
    assignedTo: "Ramesh Kumar (Sanitation Officer)",
    date: "2025-10-07",
    beforeImage: "https://via.placeholder.com/300x200?text=Before+Cleanup",
    afterImage: "https://via.placeholder.com/300x200?text=After+Cleanup",
  };

  return (
    <div className="complaint-details-page">
      <div className="details-container">
        <h2>Complaint Details</h2>

        <div className="details-section">
          <p><strong>Complaint ID:</strong> {complaint.id}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Location:</strong> {complaint.location}</p>
          <p><strong>Status:</strong> <span className={`status ${complaint.status.toLowerCase()}`}>{complaint.status}</span></p>
          <p><strong>Assigned To:</strong> {complaint.assignedTo}</p>
          <p><strong>Date Reported:</strong> {complaint.date}</p>
        </div>

        <div className="description-box">
          <h3>Description</h3>
          <p>{complaint.description}</p>
        </div>

        <div className="image-section">
          <div className="image-card">
            <h4>Before</h4>
            <img src={complaint.beforeImage} alt="Before" />
          </div>
          <div className="image-card">
            <h4>After</h4>
            <img src={complaint.afterImage} alt="After" />
          </div>
        </div>

        <button className="back-btn" onClick={() => navigate("/my-complaints")}>
          ← Back to My Complaints
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetails;
