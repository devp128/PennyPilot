import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import styles from "./ExpenseCharts.module.css";

const COLORS = ["#6366f1", "#f59e42", "#10b981", "#ef4444", "#fbbf24", "#a78bfa"];

const ExpenseCharts = ({ expenses }) => {
  // Prepare data for category pie chart
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // Prepare data for monthly bar chart
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const barData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  })).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className={styles.charts}>
      {/* Pie Chart for Category Distribution */}
      <div style={{ width: '100%', marginBottom: '2rem' }}>
        <h3 className={styles["charts-title"]}>By Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Bar Chart for Monthly Totals */}
      <div style={{ width: '100%' }}>
        <h3 className={styles["charts-title"]}>By Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            <Bar dataKey="amount" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseCharts;
