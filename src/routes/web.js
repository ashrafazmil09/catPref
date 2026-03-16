import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "../layout/Topbar";
import Sidebar from "../layout/Sidebar";
import SwipePage from "../pages/SwipePage";
import LikedPage from "../pages/LikedPage";
import LandingPage from "../pages/LandingPage";
import "../App.css";

export default function WebRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/app/*"
        element={
          <div className="app-container">
            <TopBar />
            <div className="main-content">
              <Sidebar />
              <div className="page-content">
                <Routes>
                  <Route path="/" element={<Navigate to="/app/swipe" />} />
                  <Route path="swipe" element={<SwipePage />} />
                  <Route path="liked" element={<LikedPage />} />
                </Routes>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}