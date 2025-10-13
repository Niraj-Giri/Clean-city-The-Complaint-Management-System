import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Complaint from "./pages/Complaint";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import MyComplaints from "./pages/my-complaints";
import ComplaintDetails from "./pages/complaint-details";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Help from "./pages/Help";
import NavbarLayout from "./pages/NavbarLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes with Navbar */}
      <Route element={<NavbarLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/help" element={<Help />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
