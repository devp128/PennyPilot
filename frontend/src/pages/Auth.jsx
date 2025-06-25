import React, { useState } from "react";
import styles from "./Auth.module.css";

import { useNavigate } from "react-router-dom";

const Auth = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = mode === "signup"
        ? `${import.meta.env.VITE_API_URL}/api/auth/register`
        : `${import.meta.env.VITE_API_URL}/api/auth/login`;
      const body = mode === "signup" ? { name, email, password, gender } : { email, password };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        if (mode === "login") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.user && data.user.gender) {
            localStorage.setItem("gender", data.user.gender);
          }
          if (onAuthSuccess) onAuthSuccess();
          navigate("/dashboard");
        } else {
          // After signup, save gender if present
          if (data.user && data.user.gender) {
            localStorage.setItem("gender", data.user.gender);
          }
          setMode("login");
        }
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authRoot}>
      <header className={styles.header}>
        <div className={styles.logoSection} style={{ cursor: 'pointer' }} onClick={() => navigate('/') }>
          <span className={styles.logoIcon}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path></svg>
          </span>
          <h2 className={styles.logoText}>PennyPilot</h2>
        </div>
      </header>
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome to PennyPilot</h2>
        <div className={styles.tabs}>
          <button className={mode === "login" ? styles.activeTab : styles.tab} onClick={() => setMode("login")}>Login</button>
          <button className={mode === "signup" ? styles.activeTab : styles.tab} onClick={() => setMode("signup")}>Sign Up</button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
              <label className={styles.label}>Gender</label>
              <select
                className={styles.input}
                value={gender}
                onChange={e => setGender(e.target.value)}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </>
          )}
          <label className={styles.label}>
            <span>Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? (mode === "login" ? "Logging in..." : "Signing up...") : (mode === "login" ? "Login" : "Sign Up")}
          </button>
        </form>
        <div className={styles.switchText}>
          {mode === "login" ? (
            <span>Don't have an account? <button className={styles.link} onClick={() => setMode("signup")}>Sign up</button></span>
          ) : (
            <span>Already have an account? <button className={styles.link} onClick={() => setMode("login")}>Login</button></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
