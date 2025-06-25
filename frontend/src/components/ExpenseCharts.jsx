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
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";
import styles from "./ExpenseCharts.module.css";

const COLORS = ["#6366f1", "#f59e42", "#10b981", "#ef4444", "#fbbf24", "#a78bfa"];

const ExpenseCharts = ({ expenses }) => {
  
  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];
  
  const categoryData = categories.map(cat => ({
    category: cat,
    amount: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  }));
  
  const maxAmount = Math.max(...categoryData.map(c => c.amount), 1);
  
  const [hovered, setHovered] = React.useState(null);

  
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  // Generate all months for the current year
  const now = new Date();
  const year = now.getFullYear();
  const months = Array.from({length: 12}, (_, i) => {
    const m = String(i + 1).padStart(2, '0');
    return { key: `${year}-${m}`, label: new Date(`${year}-${m}-01`).toLocaleString('en-US', { month: 'short' }) };
  });
  // Map expense data to all months, filling 0 for missing
  const barData = months.map(({key, label}) => ({
    month: label,
    amount: monthlyData[key] || 0
  }));

  return (
    <div className={styles.charts}>
      {/* Bar Chart for Category Distribution (custom, not Recharts) */}
      <div style={{ width: '100%', marginBottom: 32 }}>
        <h3 className={styles["charts-title"]}>By Category</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%', background: '#f8fafc', padding: '2rem 0', borderRadius: '1.2rem' }}>
          {categoryData.map(({ category, amount }, i) => (
            <div key={category} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px', position: 'relative' }}>
              <div
                style={{
                  width: 60,
                  height: `${amount === 0 ? 0 : Math.max(24, Math.round((amount / maxAmount) * 120))}px`,
                  background: '#e7eff7',
                  borderTop: '3px solid #6b7280',
                  borderRadius: '6px 6px 0 0',
                  marginBottom: 8,
                  transition: 'height 0.3s',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  cursor: amount > 0 ? 'pointer' : 'default',
                  position: 'relative'
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {hovered === i && amount > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: -32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    color: '#222b45',
                    padding: '4px 12px',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    fontWeight: 600,
                    fontSize: 15,
                    zIndex: 10
                  }}>
                    ₹{amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </div>
                )}
              </div>
              <span style={{ color: '#3b5bfd', fontWeight: 600, fontSize: 15, marginTop: 8 }}>{category}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Line Chart for Monthly Totals */}
      <div style={{ width: '100%' }}>
        <h3 className={styles["charts-title"]}>Total Spending per Month</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={barData} margin={{ top: 24, right: 24, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f6fdc" stopOpacity={0.35}/>
                <stop offset="100%" stopColor="#4f6fdc" stopOpacity={0.07}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e7eff7" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#3b5bfd', fontWeight: 500, fontSize: 15 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis hide />
            <Tooltip formatter={v => `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`} contentStyle={{ borderRadius: 10, fontWeight: 600, fontSize: 15 }}/>
            <Area type="monotone" dataKey="amount" stroke="#3b5bfd" strokeWidth={3} fill="url(#colorSpending)" dot={false} activeDot={{ r: 7, fill: '#fff', stroke: '#3b5bfd', strokeWidth: 3 }}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseCharts;
