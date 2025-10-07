import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [Emp, setEmp] = useState([]);
  // const statusOptions = ["pending", "Assigned","in progress", "completed"];
  const [error, setError] = useState(null);
  const[search,setSearch]=useState("");
const [loading, setLoading] = useState(true);
const [counts, setCount]=useState({})

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


       useEffect(( )=>{
 const token = localStorage.getItem("token");
    const fetchComplaintsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8081/cleancity/complaints/status/counts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCount(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaintsCount()
    const interval = setInterval(fetchComplaintsCount, 1000);
    return () => clearInterval(interval);

       },[])
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8081/cleancity/complaints/admin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // 🔹 CHANGE 1: normalize complaints so assignedId is always set
        const normalized = response.data.map(c => ({
          ...c,
          assignedId: c.assignedId ?? "" // if backend sent null, keep empty string
        }));

        setComplaints(normalized);
        console.log(normalized);
      } catch (error) {
        if (error.response?.status === 403) {
          setError("forbidden");
        }
      }
    };

    fetchComplaints(); // initial fetch
    const interval = setInterval(fetchComplaints, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchEmployee = async () => {
      try {
        const response = await axios.get("http://localhost:8081/cleancity/complaints/admin/allemp", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEmp(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployee();
    const interval = setInterval(fetchEmployee, 1000);
    return () => clearInterval(interval);
  }, []);

  // const handleStatusChange = async (id, newStatus) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.put(
  //       `http://localhost:8081/cleancity/complaints/${id}/status`,
  //       { status: newStatus },
  //       {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }
  //     );

  //     setComplaints(prev =>
  //       prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
  //     );
  //   } catch (error) {
  //     if (error.response?.status === 403) {
  //       setError("forbidden");
  //     }
  //   }
  // };

  if (error === "forbidden") {
    return <h2>🚫 Page Not Available</h2>;
  }

  const handleEmpChange = async (compId, userId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8081/cleancity/complaints/${compId}/assign`,
        { assignedId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaints(prev =>
        prev.map(c => (c.id === compId ? { ...c, assignedId: userId } : c))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch=(e)=>{
    setSearch(e.target.value);
  }

  const handleFilter = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `http://localhost:8081/cleancity/complaints/filterBy/${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComplaints(response.data); // ✅ update state here
  } catch (error) {
    console.log(error);
  }
};
   
useEffect(() => {
  if (search === "") return; // skip if empty

  const timer = setTimeout(() => {
    handleFilter();
  }, 500); // wait 500ms after typing

  return () => clearTimeout(timer);
}, [search]);

if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-2xl">
        Loading...
      </div>
    );
  }


  const getUrgencyIndicator = (urgency) => {
  const colors = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  return (
    <span>
      {urgency}{" "}
      <span
        style={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          backgroundColor: colors[urgency],
          borderRadius: "50%",
          marginLeft: "6px",
        }}
      ></span>
    </span>
  );
};
 return (
  <div>
    {error === "forbidden" && <h2>🚫 Page Not Available</h2>}

    {error !== "forbidden" && (
      <>
        <h2>All Complaints (Admin)</h2>

          <div>
      <h2>Complaint Summary</h2>
      <p>Pending: {counts["pending"] || 0}</p>
      <p>Assigned: {counts["Assigned"] || 0}</p>
      <p>In Progress: {counts["in progress"] || 0}</p>
      <p>Completed: {counts["Completed"] || 0}</p>
      <h2>Total: {complaints.length}</h2>
    </div>
        <label>Search
          <input type="text" value={search} onChange={handleSearch} />
        </label>
        <button style={{ border: "1px solid black" }} onClick={handleFilter}>Search</button>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Id</th>
              <th>City</th>
              <th>Address</th>
              <th>UserId</th>
              <th>Description</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Assign To</th>
              <th>Image</th>
              <th>After Image</th> {/* NEW COLUMN */}
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.city}</td>
                <td>{c.address}</td>
                <td>{c.userid}</td>
                <td>{c.description}</td>
               <td>{getUrgencyIndicator(c.urgency)}</td>

                <td>
                  {c.status}
                  {/* <select
                    value={c.status}
                    onChange={e => handleStatusChange(c.id, e.target.value)}
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select> */}
                  
                </td>
                <td>
                  <select
                    value={c.assignedId || ""}
                    onChange={e => handleEmpChange(c.id, e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {Emp.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName}
                      </option>
                    ))}
                  </select>
                </td>
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
      </>
    )}
  </div>
);

}

export default Admin;
