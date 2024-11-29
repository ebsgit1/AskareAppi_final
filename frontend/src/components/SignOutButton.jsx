import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const SignOutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout(); // Clear JWT and authentication state
    navigate("/login"); // Redirect to login page
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "20px",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
