import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";

const Settings = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile({ name: data.name, email: data.email });
      } catch (err) {
        setError(err.message || "Error loading profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [currency, setCurrency] = useState("INR");
  const [notifications, setNotifications] = useState(false);

  return (
    <div className={styles.settingsPageBg}>
      {/*<div className={styles.heading}>Settings</div>*/}
      <div className={styles.settingsPage}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 4, marginTop: 16, color: '#11192a' }}>Settings</h2>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Profile Information</div>
          <input className={styles.input} placeholder="Name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
          <input className={styles.input} placeholder="Email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
          <button className={styles.button} style={{ alignSelf: 'flex-end' }}>Update Profile</button>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Change Password</div>
          <input className={styles.input} placeholder="Enter current password" type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
          <input className={styles.input} placeholder="Enter new password" type="password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} />
          <input className={styles.input} placeholder="Confirm new password" type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
          <button className={styles.button} style={{ alignSelf: 'flex-end' }}>Change Password</button>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>App Preferences</div>
          <div className={styles.label}>Currency</div>
          <select className={styles.input} value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
          <div className={styles.label} style={{ marginTop: '1.5rem' }}>Notifications</div>
          <label className={styles.switch}>
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(n => !n)} />
            <span className={styles.slider}></span>
          </label>
        </div>
        <input className={styles.input} placeholder="Enter current password" type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
        <input className={styles.input} placeholder="Enter new password" type="password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} />
        <input className={styles.input} placeholder="Confirm new password" type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
        <button className={styles.button} style={{ alignSelf: 'flex-end' }}>Change Password</button>
      </div>
      {/* <div className={styles.section}>
        <div className={styles.sectionTitle}>App Preferences</div>
        <div className={styles.label}>Currency</div>
        <select className={styles.input} value={currency} onChange={e => setCurrency(e.target.value)}>
          <option value="INR">INR (₹)</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
        <div className={styles.label} style={{ marginTop: '1.5rem' }}>Notifications</div>
        <label className={styles.switch}>
          <input type="checkbox" checked={notifications} onChange={() => setNotifications(n => !n)} />
          <span className={styles.slider}></span>
        </label>
      </div> */}
    </div>
  );
};

export default Settings;
