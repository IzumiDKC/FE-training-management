// File: src/layouts/Main.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSidebar } from "../contexts/SidebarContext";

const Main = () => {
  const { expanded } = useSidebar();
  const sidebarWidth = expanded ? "220px" : "60px";

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{ marginLeft: sidebarWidth, transition: "margin-left 0.2s" }}
      >
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
