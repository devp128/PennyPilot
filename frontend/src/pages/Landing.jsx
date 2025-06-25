import React from "react";
import styles from "./Landing.module.css";

const Landing = ({ onSignUp, onLogIn }) => (
  <div className={styles.landingRoot}>
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <span className={styles.logoIcon}>
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path></svg>
        </span>
        <h2 className={styles.logoText}>PennyPilot</h2>
      </div>
      <nav className={styles.navLinks}>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </nav>
      {/* <div className={styles.authButtons}>
        <button className={styles.signUpBtn} onClick={onSignUp}>Sign Up</button>
        <button className={styles.logInBtn} onClick={onLogIn}>Log In</button>
      </div> */}
    </header>
    <main className={styles.mainContent}>
      <section className={styles.heroSection}>
        <div className={styles.heroTextBox}>
          <h1>Track Your Expenses, Simplify Your Finances</h1>
          <h2>Take control of your spending with our intuitive expense tracker. Visualize your financial habits, set budgets, and achieve your financial goals.</h2>
          <div className={styles.heroBtns}>
            <button className={styles.signUpBtn} onClick={onSignUp}>Sign Up</button>
            <button className={styles.logInBtn} onClick={onLogIn}>Log In</button>
          </div>
        </div>
        <div className={styles.heroImage} />
      </section>
      <section className={styles.featuresSection} id="features">
        <h1>Key Features</h1>
        <p>Our expense tracker offers a range of features to help you manage your finances effectively.</p>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>{/* Chart SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path></svg>
            </span>
            <div>
              <h2 style={{color: "#121416"}}>Expense Tracking</h2>
              <p>Easily record your daily expenses and categorize them for better insights.</p>
            </div>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>{/* Dollar SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path></svg>
            </span>
            <div>
              <h2 style={{color: "#121416"}}>Budgeting</h2>
              <p>Set monthly budgets for different categories and track your progress.</p>
            </div>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>{/* Bell SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path></svg>
            </span>
            <div>
              <h2 style={{color: "#121416"}}>Notifications</h2>
              <p>Receive notifications for budget limits and important financial events.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className={styles.footer}>
      <div>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#contact">Contact Us</a>
      </div>
      <p>© 2024 PennyPilot. All rights reserved.</p>
    </footer>
  </div>
);

export default Landing;
