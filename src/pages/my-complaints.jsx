import React, { useState } from "react";
import "./my-complaints.css";
import { useNavigate } from "react-router-dom"; 

const MyComplaints = () => {
  // Dummy complaint data (replace later with API/database)
  const navigate = useNavigate();

  const [complaints] = useState([
    {
      id: "C001",
      category: "Garbage Overflow",
      description: "Garbage not collected from street for 3 days.",
      location: "Bangalore, Indiranagar",
      date: "2025-10-05",
      status: "Pending",
    },
    {
      id: "C002",
      category: "Street Light Issue",
      description: "Street light flickering near park.",
      location: "Mumbai, Andheri East",
      date: "2025-10-03",
      status: "In Progress",
    },
    {
      id: "C003",
      category: "Water Leakage",
      description: "Water leaking from main pipeline at sector 18.",
      location: "Delhi, Rohini",
      date: "2025-09-28",
      status: "Resolved",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter + search logic
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mycomplaints-page">
      <h2 className="page-title">My Complaints</h2>

      {/* Search & Filter */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search complaints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Complaints Table */}
      <div className="complaints-list">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <div className="complaint-card" key={complaint.id}>
              <div className="complaint-main">
                <div>
                  <h3>{complaint.category}</h3>
                  <p className="desc">{complaint.description}</p>
                  <p className="location">📍 {complaint.location}</p>
                  <p className="date">🗓️ {complaint.date}</p>
                </div>
              </div>

              <div className="complaint-actions">
                <span
                  className={`status-tag ${complaint.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {complaint.status}
                </span>
                <button onClick={() => navigate(`/complaint/${complaint.id}`)} style={{backgroundColor:"#51f3c0ff"}}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
