import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../pages/Admin.css'

function Admin() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [Emp, setEmp] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 🔹 Fetch all complaints
  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8081/cleancity/complaints/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const normalized = res.data.map(c => ({ ...c, assignedId: c.assignedId ?? "" }));
      setComplaints(normalized);
    } catch (err) {
      if (err.response?.status === 403) setError("forbidden");
      else console.log(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 🔹 Fetch all employees
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:8081/cleancity/complaints/admin/allemp", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmp(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployee();
  }, []);

  // 🔹 Assign employee
  const handleEmpChange = async (compId, userId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8081/cleancity/complaints/${compId}/assign`,
        { assignedEmployeeId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints(prev =>
        prev.map(c => (c.id === compId ? { ...c, assignedId: userId } : c))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Search input
  const handleSearch = (e) => setSearch(e.target.value);

  // 🔹 Apply filter
  const handleApplyFilter = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
         `http://localhost:8081/cleancity/complaints/filterBy/${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
  if (search === "") return; // skip if empty

  const timer = setTimeout(() => {
    handleApplyFilter();
  }, 500); // wait 500ms after typing

  return () => clearTimeout(timer);
}, [search]);

  // 🔹 Clear filter
  const clearFilters = () => {
    setStatus("");
    setEmployeeId("");
    setSearch("");
    fetchComplaints();
  };

  if (error === "forbidden") return <h2>🚫 Page Not Available</h2>;
  if (loading) return <div className="loading">Loading...</div>;

    const handleEmpChangeFilter=async(empId)=>{
     const token=localStorage.getItem("token");

     try{
          if (!empId) {
      // 🟢 empId is empty — call the "all complaints" API
      const result = await axios.get("http://localhost:8081/cleancity/complaints/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(result.data);
      return;
      }



       const result=await axios.get(`http://localhost:8081/cleancity/complaints/admin/${empId}/complaints`,{
         headers:{
          Authorization:`Bearer ${token}`
         }
       },
        
       )
        setComplaints(result.data)
      }
    

       catch(error){
        console.log(error);
       }
     }
    
    const handleStatusChangeFilter=async(status)=>{
       const token=localStorage.getItem("token");
       if(status!==""){
          try{
            const response=await axios.get( `http://localhost:8081/cleancity/complaints/admin/complaintsBy/${status}`,{
         headers:{
          Authorization:`Bearer ${token}`
         }
       },
        
       )
        setComplaints(response.data)
      }
    

       catch(error){
        console.log(error);
       }
      }
      else{
         const res = await axios.get("http://localhost:8081/cleancity/complaints/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const normalized = res.data.map(c => ({ ...c, assignedId: c.assignedId ?? "" }));
      setComplaints(normalized);
      }
     }
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Complaint Management Dashboard</h2>
        <button className="manage-employee-link" onClick={() => navigate("/ManageEmployee")}>
          Manage Employees
        </button>
      </div>

      {/* 🔹 Filter Section */}
      <div className="filter-container">
        <div className="filter-item">
          <label>Status</label>
          <select value={status} onChange={(e) => (setStatus(e.target.value),handleStatusChangeFilter(e.target.value))}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Employee</label>
          <select value={employeeId} onChange={(e) =>( setEmployeeId(e.target.value),handleEmpChangeFilter(e.target.value))}>
            <option value="">All Employees</option>
            {Emp.map(emp => (
              <option key={emp.empId} value={emp.empId}  >
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by city, user..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="filter-actions">
          <button onClick={handleApplyFilter}>Apply Filter</button>
          <button onClick={clearFilters} className="clear-btn">Clear</button>
        </div>
      </div>

      {/* 🔹 Complaints Table */}
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>City</th>
            <th>Address</th>
            <th>User ID</th>
            <th>Description</th>
            <th>Urgency</th>
            <th>Status</th>
            <th>Assign To</th>
            <th>Before Image</th>
            <th>After Image</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.city}</td>
              <td>{c.address}</td>
              <td>{c.userid}</td>
              <td>{c.description}</td>
              <td>
                <div className="urgency">
                  {c.urgency}
                  <span
                    style={{
                      backgroundColor:
                        c.urgency === "High" ? "red" :
                        c.urgency === "Medium" ? "orange" : "green",
                    }}
                  ></span>
                </div>
              </td>
              <td>{c.status}</td>
              <td>
                <select
                  value={c.assignedEmployeeId || ""}
                  onChange={(e) => handleEmpChange(c.id, e.target.value)}
                >
                  <option value="">Select Employee</option>
                  {Emp.map((emp) => (
                    <option key={emp.empId} value={emp.empId}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {c.imageBase64 ? (
                  <img src={`data:image/jpeg;base64,${c.imageBase64}`} alt="Before" width="80" height="60"/>
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>
                {c.afterImageBase64 ? (
                  <img src={`data:image/jpeg;base64,${c.afterImageBase64}`} alt="After" width="80" height="60"/>
                ) : (
                  <span>Not Solved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
