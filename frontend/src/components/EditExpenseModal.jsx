import React, { useState } from "react";
import styles from "./EditExpenseModal.module.css";

const EditExpenseModal = ({ expense, onSave, onClose }) => {
  const [form, setForm] = useState({
    amount: expense.amount,
    category: expense.category,
    description: expense.description,
    date: expense.date.slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err.message || "Error updating expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Date
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
          <label>
            Category
            <input type="text" name="category" value={form.category} onChange={handleChange} required />
          </label>
          <label>
            Description
            <input type="text" name="description" value={form.description} onChange={handleChange} required />
          </label>
          <label>
            Amount (₹)
            <input type="number" name="amount" value={form.amount} onChange={handleChange} min="0" step="0.01" required />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>{loading ? "Saving..." : "Done"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
