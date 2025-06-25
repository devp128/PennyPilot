import React, { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import EditExpenseModal from "../components/EditExpenseModal";
import styles from "./Expenses.module.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        setError(err.message || "Error loading expenses");
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [token]);

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = async (updated) => {
    try {
      const res = await fetch(`/api/expenses/${editingExpense._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update expense");
      const updatedExpense = await res.json();
      setExpenses(expenses.map((exp) => (exp._id === editingExpense._id ? updatedExpense : exp)));
      setEditingExpense(null);
    } catch (err) {
      setError(err.message || "Error updating expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete expense");
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      setError(err.message || "Error deleting expense");
    }
  };

  if (loading) return <div className={styles.expensesPage}>Loading...</div>;
  if (error) return <div className={styles.expensesPage}>Error: {error}</div>;

  return (
    <div className={styles.expensesPage}>
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onSave={handleUpdateExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}
      <div style={{ width: '100%', maxWidth: 950, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 4, marginTop: 16, color: '#11192a' }}>Expenses</h2>
        <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 18 }}>View and manage all your expenses</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <button
            className={styles.addButton}
            onClick={() => window.location.href = '/add-expense'}
          >
            Add Expense
          </button>
        </div>
        <div style={{ background: '#fff', borderRadius: '1.2rem', padding: '2rem 1.5rem', width: '100%', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(99,102,241,0.08)' }}>
          <ExpenseList
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
