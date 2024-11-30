import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const SignOutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "100px",
        border: "1px solid #8380fe",
        allignItems: "center",
        width: "300px",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#8380fe")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
