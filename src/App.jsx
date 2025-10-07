import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute"; 
import Complaint from "./pages/Complaint";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
      path="/complaint"
       element={
        <ProtectedRoute>
       <Complaint/>
       </ProtectedRoute>
       }/>  
      {/* Protected Route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
       <Route
        path="/admin"
        element={
          <ProtectedRoute>
            < Admin/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            < Employee/>
          </ProtectedRoute>
        }
      />
     
    </Routes>
    
  );
}

export default App;
