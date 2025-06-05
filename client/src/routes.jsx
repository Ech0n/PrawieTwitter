import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import UserSettings from "./components/UserSettings.jsx";
import Login from "./components/Login.jsx";
import DashboardLayout from "./components/DashbordLayout.jsx";
import MainPanel from "./components/MainPanel.jsx";
import Register from "./components/Register.jsx";
import Posts from "./components/Posts.jsx";
import UserPanel from "./components/UserPanel.jsx";

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<MainPanel />}/>
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/user/:id" element={<UserPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
