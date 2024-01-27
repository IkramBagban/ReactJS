import React, { useContext } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import ExpenseContext from "../../store/expense-context";

const Header = ({onLogout,onProfileToggle}) => {
 

  const profileHandler = () => {};
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Logo</div>
      <ul className={styles.nav}>
        <li onClick={onProfileToggle} className={styles.navItem}>
          Profile
        </li>
        <li
          style={{ background: "transparent" }}
          onClick={onLogout}
          className={styles.navItem}
        >
          Logout
        </li>
      </ul>
    </header>   
  );
};

export default Header;
