import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // get JWT token

    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:8081/cleancity/complaints", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComplaints(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints(); // initial fetch
    const interval = setInterval(fetchComplaints, 5000); // auto-refresh every 5 sec

    return () => clearInterval(interval); // cleanup
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleComplaint=()=>{
    navigate("/complaint");
  }

  return (
    <div>
      <h2>Your Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Address</th>
              <th>Status</th>
              <th>User_id</th>
              <th>Before Image</th>
              <th>After Image</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.description}</td>
                <td>{c.address}</td>
                { c.status==="pending"? <td><b> {c.status}</b></td>:<td><b>{c.assignedName}</b></td>}
                
                <td>{c.userid}</td>
                <td>
                  {c.imageBase64 ? (
                    <img 
                      src={`data:image/jpeg;base64,${c.imageBase64}`} 
                      alt="image" 
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  {c.afterImage ? (
                    <img 
                      src={`data:image/jpeg;base64,${c.afterImage}`} 
                      alt="after image" 
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    <span>Complaint not solved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleComplaint}>Register new complaint</button>
    </div>

  );
}

export default Home;
