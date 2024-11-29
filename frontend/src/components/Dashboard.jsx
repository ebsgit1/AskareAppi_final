import React from "react";
import logo from "../components/askareappi.png";
import "../App.css";

const Dashboard = () => {
  const storedToken = localStorage.getItem("token");
  console.log(storedToken);
  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={{ width: "20%", height: "11%", marginTop: "0" }}
      />
      <section className="dashboard-container">
        <p style={{ marginTop: "20px", fontSize: "18px", color: "#555" }}>
          Welcome to AskareAppi, your personal task management solution for a
          clean and organized home. You can add new tasks, mark them as
          completed, and keep track of your progress. Get started by clicking on
          the "Add New Task" button in the sidebar.
        </p>
      </section>
      <section className="dashboard-container">
        <p style={{ marginTop: "20px", fontSize: "18px", color: "#555" }}>
          This page is under development and will soon feature fun graphics to
          motivate you with your tasks.
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
