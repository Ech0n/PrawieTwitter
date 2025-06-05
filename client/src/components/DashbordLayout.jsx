import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Details from "./Details";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function DashboardLayout() {
  const {getUserData} = useCurrentUser();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserData()
      .then((data) => {
        setUser(data);
      })

      .catch((err) => setError(true));
  }, []);

  return (
    <div
      style={{ display: "flex", margin: "1rem 0", justifyContent: "center" }}
    >
      <Sidebar />
      <Outlet />
      {user && <Details />}
    </div>
  );
}
