import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
const API_URL = "https://askareappi-final-i2hd.onrender.com";

const LogIn = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password || (!isLoginMode && !name)) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const url = isLoginMode ? `${API_URL}/login` : `${API_URL}/signup`;

      const body = JSON.stringify(
        isLoginMode ? { email, password } : { name, email, password }
      );
      console.log(body);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "An error occurred. Please try again."
        );
        return;
      }

      const data = await response.json();
      console.log(isLoginMode ? "Login Success:" : "Sign-Up Success:", data);

      if (isLoginMode) {
        login(data.token);
        setSuccessMessage("Login successful!");
        window.location.href = "/";
      } else {
        setSuccessMessage("Sign-Up successful! You can now log in.");
        setIsLoginMode(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>{isLoginMode ? "Login" : "Sign Up"}</h2>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}

        {!isLoginMode && (
          <div style={styles.field}>
            <label htmlFor="name" style={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required={!isLoginMode}
            />
          </div>
        )}

        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          {isLoginMode ? "Login" : "Sign Up"}
        </button>

        <p style={styles.toggle}>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <span
            style={styles.link}
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMessage("");
              setSuccessMessage("");
              setName("");
              setEmail("");
              setPassword("");
            }}
          >
            {isLoginMode ? " Sign Up" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  toggle: {
    marginTop: "10px",
    textAlign: "center",
  },
  link: {
    color: "#007BFF",
    cursor: "pointer",
    marginLeft: "5px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
  success: {
    color: "green",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default LogIn;
