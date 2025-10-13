import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [recentComplaints, setRecentComplaints] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [countRes, complaintsRes] = await Promise.all([
          axios.get("http://localhost:8081/cleancity/complaints/status/counts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8081/cleancity/complaints/admin/recent", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCounts(countRes.data);
        setRecentComplaints(complaintsRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, Admin</h1>
        <button onClick={() => navigate("/login")} className="logout-btn">Logout</button>
      </header>

      <section className="summary-cards">
        {["Pending", "Assigned", "In Progress", "Completed"].map((status) => (
          <div key={status} className="card">
            <h3>{status}</h3>
            <p>{counts[status] || 0}</p>
          </div>
        ))}
      </section>

      <section className="recent-section">
        <div className="recent-header">
          <h2>Recent Complaints</h2>
          <button onClick={() => navigate("/admin/complaints")} className="view-all-btn">
            View All
          </button>
        </div>

        <table className="recent-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>City</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentComplaints.slice(0, 5).map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.city}</td>
                <td>{c.description}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="actions">
        <button onClick={() => navigate("/admin")}>Manage Complaints</button>
        <button onClick={() => navigate("/ManageEmployee")}>Manage Employees</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
