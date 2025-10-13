import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../auth";
import axios from "axios";
import "./Home.css";
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      description: "Garbage in Road",
      address: "Greater Noida",
      status: "pending",
    },
    {
      id: 2,
      description: "Garbage in Road",
      address: "Greater Noida",
      status: "completed",
    },
    {
      id: 2,
      description: "Garbage in Road",
      address: "Greater Noida",
      status: "pending",
    },
    {
      id: 2,
      description: "Garbage in Road",
      address: "Greater Noida",
      status: "pending",
    },
  ]);
  const [userName, setUserName] = useState("Niraj");
  const [stats, setStats] = useState({
    resolved: 0,
    pending: 0,
    monthly: 0,
    feedback: 4.6,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/cleancity/complaints",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setComplaints(data);

        const resolved = data.filter((c) => c.status === "completed").length;
        const pending = data.filter((c) => c.status === "pending").length;
        const monthly = data.length;
        setStats({ resolved, pending, monthly, feedback: 4.6 });
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints();
    const interval = setInterval(fetchComplaints, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleComplaint = () => {
    navigate("/complaint");
  };

  return (
    <div className="cleancity-app">
      {/* TOPBAR (full width) */}
      {/* <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        userName={userName}
        handleLogout={handleLogout}
      /> */}
      {/* WELCOME - full-bleed banner but centered content */}
      <section className="welcome-section full-bleed">
        <div className="container welcome-inner">
          <div className="welcome-text">
            <h1>Hi, {userName} 👋</h1>
            <p className="muted">
              Thanks for keeping your city clean and green!
            </p>
          </div>
          <div>
            <button className="report-btn" onClick={handleComplaint}>
              📝 Report a New Complaint
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* STATS (centered) */}
        <section className="stats-section container">
          <div className="stat-card">
            <h4>✅ Resolved</h4>
            <div className="stat-value">{stats.resolved}</div>
          </div>
          <div className="stat-card">
            <h4>⏳ Pending</h4>
            <div className="stat-value">{stats.pending}</div>
          </div>
          <div className="stat-card">
            <h4>🗓️ This Month</h4>
            <div className="stat-value">{stats.monthly}</div>
          </div>
          <div className="stat-card">
            <h4>💬 Feedback</h4>
            <div className="stat-value">{stats.feedback}/5</div>
          </div>
        </section>

        {/* RECENT COMPLAINTS */}
        <section className="recent-section container">
          <h2>🧾 Recent Complaints</h2>
          {complaints.length === 0 ? (
            <p className="no-data">No complaints submitted yet 😅</p>
          ) : (
            <div className="table-wrap">
              <table className="complaints-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Submitted On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.slice(0, 6).map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td className="desc-cell">{c.description}</td>
                      <td>{c.address}</td>
                      <td>
                        <span
                          className={`status-tag ${
                            c.status === "pending" ? "pending" : "resolved"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td>
                        {new Date(c.date || Date.now()).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="details-btn"
                          onClick={() => navigate(`/complaints/${c.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* MAP */}
        <section className="map-section container">
          <h2>🗺️ City Cleanliness Map</h2>
          <div className="map-frame-wrap">
            <iframe
              title="city-map"
              className="map-frame"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31513.09259893689!2d77.5806431!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16d22e59e8b3%3A0xd22b5867dd9f3a61!2sBengaluru!5e0!3m2!1sen!2sin!4v1690389060075!5m2!1sen!2sin"
              allowFullScreen
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
