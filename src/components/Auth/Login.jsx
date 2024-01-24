import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { value, id } = e.target;
    setInputValue((prev) => ({ ...prev, [id]: value }));

    console.log(inputValue);
  };
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(inputValue);
  };

  return (
    <div className={styles.rootContainer}>
      <form onSubmit={submitHandler} className={styles.container}>
        <h3>Login</h3>
        <div className={styles.fieldControls}>
          <div className={styles.fieldContainer}>
            <label htmlFor="email">Email</label>
            <input
              value={inputValue.email}
              id="email"
              onChange={inputChangeHandler}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="password">Password</label>
            <input
              value={inputValue.password}
              id="password"
              onChange={inputChangeHandler}
            />
          </div>
          <div className={styles.btnContainer}>
            <button type="submit">Loginn</button>
            <Link
              style={{ alignSelf: "center", margin: "1rem 0 0 0" }}
              to="/signup"
            >
              Signup
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
