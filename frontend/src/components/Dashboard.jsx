import React from "react";
import ExpenseCharts from "./ExpenseCharts";
import styles from "./Dashboard.module.css";

const Dashboard = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgPerTransaction = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const categoriesUsed = new Set(expenses.map(e => e.category)).size;

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>Spending Overview</h1>
          <p style={{ color: '#6b7280', marginTop: 4 }}>Track and analyze your expenses</p>
        </div>
      </div>
      {/* Stats */}
      <div className={styles.dashboard}>
        <div className={styles.card}>
          <div className={styles["card-value"]}>₹{totalExpenses.toFixed(2)}</div>
          <div className={styles["card-title"]}>Total spent</div>
        </div>
        <div className={styles.card}>
          <div className={styles["card-value"]}>₹{avgPerTransaction.toFixed(2)}</div>
          <div className={styles["card-title"]}>Average per transaction</div>
        </div>
        <div className={styles.card}>
          <div className={styles["card-value"]}>{categoriesUsed}</div>
          <div className={styles["card-title"]}>Different categories</div>
        </div>
      </div>
      {/* Charts Section */}
      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', marginBottom: 8 }}>Category Distribution</h2>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', marginBottom: 8 }}>Monthly Totals</h2>
        </div>
        <ExpenseCharts expenses={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;
