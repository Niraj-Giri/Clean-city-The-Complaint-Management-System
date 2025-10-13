import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Insights.css";

const COLORS = ["#55efc4", "#ffeaa7", "#74b9ff", "#ff7675", "#fd79a8"];

const Insights = () => {
  // Dummy data
  const stats = {
    total: 120,
    resolved: 75,
    pending: 45,
  };

  const categoryData = [
    { name: "Garbage", value: 40 },
    { name: "Street Light", value: 25 },
    { name: "Water", value: 20 },
    { name: "Roads", value: 15 },
    { name: "Other", value: 20 },
  ];

  const monthlyData = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 22 },
    { month: "Apr", count: 15 },
    { month: "May", count: 28 },
    { month: "Jun", count: 25 },
    { month: "Jul", count: 20 },
  ];

  return (
    <div className="insights-page">
      <h1>📊 City Insights Dashboard</h1>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <h3>Total Complaints</h3>
          <p>{stats.total}</p>
        </div>
        <div className="kpi-card">
          <h3>Resolved</h3>
          <p>{stats.resolved}</p>
        </div>
        <div className="kpi-card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Category-wise Complaints</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Monthly Complaints</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#55efc4" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Resolved", value: stats.resolved },
                  { name: "Pending", value: stats.pending },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                <Cell fill="#55efc4" />
                <Cell fill="#ffeaa7" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Insights;
