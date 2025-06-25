import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseCharts from "../components/ExpenseCharts";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const initialExpenses = [
  { id: 1, amount: 50, category: "Food", description: "Lunch", date: "2025-06-24" },
  { id: 2, amount: 20, category: "Transport", description: "Bus ticket", date: "2025-06-23" },
  { id: 3, amount: 120, category: "Shopping", description: "T-shirt", date: "2025-06-22" },
];

const Home = ({ defaultTab = "dashboard" }) => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch expenses from backend 
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
      
      }
    };
    fetchExpenses();
    
  }, [token]);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleAddExpense = (expense) => {
    setExpenses([
      ...expenses,
      { ...expense, id: Date.now() },
    ]);
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleUpdateExpense = (updated) => {
    setExpenses(expenses.map((exp) => (exp.id === editingExpense.id ? { ...updated, id: editingExpense.id } : exp)));
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setShowForm(false);
  };

  // Calculate stats for dashboard
  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const avgSpent = expenses.length ? (totalSpent / expenses.length).toFixed(2) : 0;
  const categories = [...new Set(expenses.map(e => e.category))];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <main className={styles.home}>
        <div style={{ width: '100%', maxWidth: 950, margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 4, marginTop: 16, color: '#11192a' }}>Spending Overview</h2>
          <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 12 }}>Track and analyze your expenses</div>
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              ₹{totalSpent.toFixed(2)}
              <span className={styles.statDesc}>Total spent</span>
            </div>
            <div className={styles.statCard}>
              ₹{avgSpent}
              <span className={styles.statDesc}>Average per transaction</span>
            </div>
            <div className={styles.statCard}>
              {categories.length}
              <span className={styles.statDesc}>Different categories</span>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', maxWidth: 950, margin: '0 auto' }}>
          <ExpenseCharts expenses={expenses} />
        </div>
      </main>
    </div>
  );
};

export default Home;
