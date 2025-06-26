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
          {/* Avatar always on right */}
          <img
            src={avatarImg}
            alt="avatar"
            className={styles.avatarCircle}
            onClick={() => setShowDropdown((d) => !d)}
            style={{ cursor: "pointer" }}
          />
          {/* Mobile dropdown: dashboard, expenses, settings, logout */}
          {showDropdown && (
            <div className={styles.profileDropdownMenu} tabIndex={-1}>
              {window.innerWidth <= 600 ? (
                <>
                  <div className={
                    `${styles.profileDropdownItem} ${location.pathname.startsWith('/dashboard') ? styles.selected : ''}`
                  } onClick={() => { setShowDropdown(false); navigate('/dashboard'); }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" style={{marginRight:'8px'}}><path d="M3 13h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2z"/><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14"/></svg>
                    Dashboard
                  </div>
                  <div className={
                    `${styles.profileDropdownItem} ${location.pathname.startsWith('/expenses') ? styles.selected : ''}`
                  } onClick={() => { setShowDropdown(false); navigate('/expenses'); }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" style={{marginRight:'8px'}}><rect x="4" y="8" width="16" height="8" rx="2"/><path d="M4 12h16"/></svg>
                    Expenses
                  </div>
                  <div className={
                    `${styles.profileDropdownItem} ${location.pathname.startsWith('/settings') ? styles.selected : ''}`
                  } onClick={() => { setShowDropdown(false); navigate('/settings'); }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" style={{marginRight:'8px'}}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"/></svg>
                    Settings
                  </div>
                  <div className={styles.profileDropdownDivider} />
                  <div className={styles.profileDropdownItem} onClick={() => { setShowDropdown(false); handleLogout(); }} style={{color:'#e53935',fontWeight:600}}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" style={{marginRight:'8px'}}><path d="M16 17l5-5-5-5M21 12H9"/><path d="M12 19a9 9 0 1 1 0-14"/></svg>
                    Logout
                  </div>
                </>
              ) : (
                <div className={styles.profileDropdownItem} onClick={() => { setShowDropdown(false); handleLogout(); }} style={{color:'#e53935',fontWeight:600}}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" style={{marginRight:'8px'}}><path d="M16 17l5-5-5-5M21 12H9"/><path d="M12 19a9 9 0 1 1 0-14"/></svg>
                  Logout
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
