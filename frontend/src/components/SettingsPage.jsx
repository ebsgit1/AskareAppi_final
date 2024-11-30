import React from "react";
import "../App.css";
import logo from "../components/askareappi.png";

const SettingsPage = () => {
  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={{ width: "20%", height: "11%", marginTop: "0" }}
      />
      <h1>Profile settings</h1>
      <section className="dashboard-container">
        <p style={{ marginTop: "20px", fontSize: "18px", color: "#555" }}>
          Here you could change your profile settings.
        </p>
      </section>
    </div>
  );
};

export default SettingsPage;
