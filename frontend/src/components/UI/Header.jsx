import React from "react";
import styles from "./Header.module.css";

const Header = ({onLogout,onProfileToggle}) => {
 

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

export default React.memo(Header);
