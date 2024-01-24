import React from "react";
import styles from "./Signup.module.css";

function Signup() {
  return (
    <div className={styles.rootContainer}>
      <form className={styles.container}>
        <h3>Signup</h3>
        <div className={styles.fieldControls}>
          <div className={styles.fieldContainer}>
          <div className={styles.fieldContainer}>
            <label htmlFor="username">Username</label>
            <input id="username" />
          </div>
            <label htmlFor="email">Email</label>
            <input id="email" />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="password">Password</label>
            <input id="password" />
          </div>
          <div className={styles.btnContainer}>
            <button>Signup</button>
            <a
              style={{ alignSelf: "center", margin: "1rem 0 0 0" }}
              href="/login"
            >
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
