import React, { useEffect, useState } from "react";
import axios from "axios";
import '../AdminNavigation/ManageEmployee.css'

const ManageEmployee = () => {
 const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/cleancity/complaints/admin/allemp",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
    const interval = setInterval(fetchEmployees, 100000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="employee-container">
      <h2 className="employee-title">Employee Directory</h2>

      {employees.length === 0 ? (
        <p className="no-employee">No employees found.</p>
      ) : (
        employees.map((emp) => (
          <div key={emp.empId} className="employee-card">
            <div className="employee-info">
              <div className="employee-avatar">
                {emp.firstName ? emp.firstName[0].toUpperCase() : "E"}
              </div>
              <div>
                <h3 className="employee-name">
                  {emp.firstName} {emp.lastName}
                </h3>
                <p className="employee-role">{emp.role}</p>
              </div>
            </div>

            <div className="employee-details">
              <p>
                <strong>Email:</strong> {emp.email}
              </p>
              <p>
                <strong>Phone:</strong> {emp.phoneNumber}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`status ${
                    emp.status === "active" ? "active" : "inactive"
                  }`}
                >
                  {emp.status}
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};



export default ManageEmployee;
