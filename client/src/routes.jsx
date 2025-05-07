import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import UserSettings from "./components/UserSettings.jsx";
import Login from "./components/Login.jsx";
import DashboardLayout from "./components/DashbordLayout.jsx";
import MainPanel from "./components/MainPanel.jsx";
import Register from "./components/Register.jsx";
import Posts from "./components/Posts.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<MainPanel />}/>
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/posts" element={<Posts />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
