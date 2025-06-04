import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Details from "./Details";

export default function DashboardLayout() {
  return (
    <div style={{display:"flex", margin: "1rem 0"}}>
      <Sidebar />
      <Outlet />
      <Details />
    </div>
  );
}
