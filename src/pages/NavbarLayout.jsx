import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { logout } from "../auth";

const NavbarLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Niraj"); // You can fetch this from API/localStorage

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // redirect after logout
  };

  return (
    <>
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        userName={userName}
        handleLogout={handleLogout}
      />
      <Outlet /> {/* This renders the child route content */}
    </>
  );
};

export default NavbarLayout;
