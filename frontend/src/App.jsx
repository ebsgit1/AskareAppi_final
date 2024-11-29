import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TasksPage from "./components/TaskPage";
import SettingsPage from "./components/SettingsPage";
import Sidebar from "./components/Sidebar";
import "./App.css";
import LogIn from "./components/Login";
import { AuthProvider } from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <div style={{ zIndex: 90 }} id="portal-root"></div>
        <Router>
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <TasksPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
