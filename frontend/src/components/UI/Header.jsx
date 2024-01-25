import React, { useContext } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import ExpenseContext from "../../store/expense-context";

const Header = () => {
  const navigate = useNavigate();
  const expenseCtx = useContext(ExpenseContext);
  const logoutHandler = () => {
    const confirmLogout = window.confirm("do you want to logout?");
    if (!confirmLogout) return;

    localStorage.clear();
    navigate("/login");

    expenseCtx.onClearContext();
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Logo</div>
      <nav className={styles.nav}>
        <button href="/profile" className={styles.navItem}>
          Profile
        </button>
        <button
          style={{ background: "transparent" }}
          onClick={logoutHandler}
          className={styles.navItem}
        >
          Logout
        </button>
      </nav>
    </header>
    // </div>
  );
};

export default Header;
