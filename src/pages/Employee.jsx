import { useEffect, useState } from "react";
import axios from "axios";

function Employee() {
  const [complaints, setComplaints] = useState([]);
  const [images, setImages] = useState({});
  const [statuses, setStatuses] = useState({});
  const [counts, setCount]=useState({})


  // ✅ Fetch assigned complaints
  const fetchAssignedComplaints = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8081/cleancity/complaints/employee",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
    // Refresh every 60 seconds
    const interval = setInterval(fetchAssignedComplaints, 60000);
    return () => clearInterval(interval);
  }, []);


  // handle status of complaints count

       useEffect(( )=>{
 const token = localStorage.getItem("token");
    const fetchComplaintsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8081/cleancity/complaints/employee/status/counts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCount(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaintsCount()
    const interval = setInterval(fetchComplaintsCount, 100000);
    return () => clearInterval(interval);

       },[])
  // ✅ Handle image selection
  const handleFileChange = (complaintId, e) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [complaintId]: file }));
    }
  };

  // ✅ Handle checkbox toggle
  const handleCheckedUnchecked = (complaintId, checked) => {
    setStatuses((prev) => ({
      ...prev,
      [complaintId]: checked ? "completed" : "in progress",
    }));
  };

  // ✅ Submit data to backend
  const handleSubmit = async (complaintId) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("complaintId", complaintId);
    formData.append("status", statuses[complaintId] || "in progress");

    if (images[complaintId]) {
      formData.append("file", images[complaintId]);
    }

    try {
      const response = await axios.put(
        "http://localhost:8081/cleancity/complaints/employee/setcomplaintStatus",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Complaint updated:", response.data);
      // ✅ Refresh complaints after update
      fetchAssignedComplaints();
      alert("Complaint updated successfully!");

      // Reset fields
      setImages((prev) => ({ ...prev, [complaintId]: null }));
      setStatuses((prev) => ({ ...prev, [complaintId]: null }));
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("Failed to update complaint");
    }
  };

  return (
    <div>
  
     <h2>Complaint Summary</h2>
      <p>Pending: {counts["pending"] || 0}</p>
      <p>Assigned: {counts["Assigned"] || 0}</p>
      <p>In Progress: {counts["in progress"] || 0}</p>
      <p>Completed: {counts["Completed"] || counts["completed"]|| 0}</p>
      <h2>Total: {complaints.length}</h2>

      <h2>Assigned Complaints</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Description</th>
            <th>Status</th>
            <th>Upload Image</th>
            <th>Preview</th>
            <th>Completed</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.address}</td>
              <td>{c.description}</td>
              <td>{c.status}</td>

              {c.status==="Assigned" || c.status==="in progress" ? (
                <>
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(c.id, e)}
                    />
                  </td>
                  <td>
                    {images[c.id] && (
                      <img
                        src={URL.createObjectURL(images[c.id])}
                        alt="Preview"
                        width="120"
                      />
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={statuses[c.id] === "completed"}
                      onChange={(e) =>
                        handleCheckedUnchecked(c.id, e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleSubmit(c.id)}
                      disabled={!images[c.id] && !statuses[c.id]}
                    >
                      Submit
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    ✅ Completed
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
