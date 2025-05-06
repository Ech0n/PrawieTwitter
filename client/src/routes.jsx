import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from "./components/NotFound.jsx";
import UserSettings from "./components/UserSettings.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/"  />
            <Route path="/userSettings" element={<UserSettings />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}