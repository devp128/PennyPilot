import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import maleAvatar from "../assets/avatar-male.png";
import femaleAvatar from "../assets/avatar-female.png";

const Header = () => {
  const gender = localStorage.getItem("gender") || "male";
  const tabs = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard" },
    { id: "expenses", label: "Expenses", path: "/expenses" },
    { id: "settings", label: "Settings", path: "/settings" },
  ];
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarImg = gender === "female" ? femaleAvatar : maleAvatar;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.logoIcon}>
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
          </svg>
        </span>
        <span className={styles.appName}>PennyPilot</span>
      </div>
      <div className={styles.right}>
        <nav className={styles.nav}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={location.pathname.startsWith(tab.path) ? styles.active : styles.tab}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarImg}
            alt="avatar"
            className={styles.avatarCircle}
            onClick={() => setShowDropdown((d) => !d)}
            style={{ cursor: "pointer" }}
          />
          {showDropdown && (
            <div
              className={styles.dropdown}
              onClick={() => {
                setShowDropdown(false);
                handleLogout();
              }}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
