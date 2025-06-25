import React, { useState } from "react";
import styles from "./ExpenseList.module.css";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = Array.from(new Set(expenses.map((expense) => expense.category)));

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedExpenses = filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={styles.list}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Search by description or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem', flex: 1 }}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem' }}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>No expenses found.</td>
              </tr>
            ) : (
              sortedExpenses.map((expense) => (
                <tr key={expense._id || expense.id}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.description}</td>
                  <td>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '0.375rem', background: '#dbeafe', color: '#2563eb', fontSize: '0.85rem', fontWeight: 600 }}>
                      {expense.category}
                    </span>
                  </td>
                  <td>₹{expense.amount.toFixed(2)}</td>
                  <td className={styles.actions}>
                    <button
                      onClick={() => onEdit(expense)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(expense._id || expense.id)}
                      style={{ background: '#fee2e2', color: '#b91c1c' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
