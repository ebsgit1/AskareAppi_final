import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaThList, FaPlusCircle, FaRegSun, FaBullseye } from "react-icons/fa";
import "../App.css";
import Portal from "./Portal";
import "./Sidebar.css";
import SignOutButton from "./SignOutButton";
import { useAuth } from "./AuthProvider";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [showPortal, setShowPortal] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const response = await fetch("http://localhost:5001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      window.location.href = "/";
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <>
      <div className="sidebar">
        <button
          className="add-task-button"
          onClick={() => setShowPortal(!showPortal)}
        >
          <FaPlusCircle className="add-task-icon" />
          <span className="add-task-text">ADD NEW TASK</span>
        </button>
        <nav>
          <ul className="menu-list">
            <li
              className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
            >
              <Link to="/" className="menu-link">
                <FaThList className="menu-icon" /> Dashboard
              </Link>
            </li>
            <li className={`menu-item ${isActive("/tasks") ? "active" : ""}`}>
              <Link to="/tasks" className="menu-link">
                <FaBullseye className="menu-icon" /> Tasks
              </Link>
            </li>
            <li
              className={`menu-item ${isActive("/settings") ? "active" : ""}`}
            >
              <Link to="/settings" className="menu-link">
                <FaRegSun className="menu-icon" /> Settings
              </Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </div>
      {showPortal && (
        <Portal>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              zIndex: 999,
            }}
            onClick={() => setShowPortal(false)}
          ></div>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
            }}
            className="popup"
          >
            <h1 className="title">New Task</h1>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={onSubmit}
            >
              <label htmlFor="name">Name</label>
              <input
                required
                type="text"
                id="name"
                name="name"
                placeholder="e.g. name"
              />
              <label htmlFor="description">Task Description</label>
              <input
                required
                type="text"
                id="description"
                name="description"
                placeholder="e.g. dusting"
              />
              <label htmlFor="room">Room</label>
              <input
                required
                type="text"
                id="room"
                name="room"
                placeholder="e.g. bedroom"
              />
              <label htmlFor="due_date">Due Date</label>
              <input required type="date" id="due_date" name="due_date" />
              <label htmlFor="frequency">Frequency</label>
              <select id="frequency" name="frequency">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <button type="submit" className="yes">
                Add Task
              </button>
            </form>
            <button onClick={() => setShowPortal(false)}>Close</button>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Sidebar;
