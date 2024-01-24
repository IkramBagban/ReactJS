import React from "react";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.rootContainer}>
      <form className={styles.container}>
        <h3>Login</h3>
        <div className={styles.fieldControls}>
          <div className={styles.fieldContainer}>
            <label htmlFor="email">Email</label>
            <input id="email" />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="password">Password</label>
            <input id="password" />
          </div>
          <div className={styles.btnContainer}>
            <button>Loginn</button>
            <a
              style={{ alignSelf: "center", margin: "1rem 0 0 0" }}
              href="/signup"
            >
              Signup
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
