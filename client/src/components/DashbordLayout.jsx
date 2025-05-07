import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Details from "./Details";

export default function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <Details />
    </>
  );
}
