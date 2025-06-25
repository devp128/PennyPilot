import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddExpense.module.css";

const AddExpense = () => {
  

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add expense");
      setForm({ amount: "", category: "", description: "", date: "" });
      navigate("/expenses");
    } catch (err) {
      alert(err.message || "Error adding expense");
    }
  };

  return (
    <div className={styles.addExpensePage}>
      <h2>Add New Expense</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Amount</label>
        <input className={styles.input} name="amount" type="number" placeholder="Enter amount" value={form.amount} onChange={handleChange} required />
        <label className={styles.label}>Category</label>
        <select className={styles.input} name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <label className={styles.label}>Description</label>
        <input className={styles.input} name="description" placeholder="Enter description" value={form.description} onChange={handleChange} required />
        <label className={styles.label}>Date</label>
        <input className={styles.input} name="date" type="date" value={form.date} onChange={handleChange} required />
        <button className={styles.button} type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
