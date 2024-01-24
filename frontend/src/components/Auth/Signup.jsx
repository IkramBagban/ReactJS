import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

function Signup() {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { value, id } = e.target;
    setInputValue((prev) => ({ ...prev, [id]: value }));

    console.log(inputValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };

  return (
    <div className={styles.rootContainer}>
      <form onSubmit={submitHandler} className={styles.container}>
        <h3>Signup</h3>
        <div className={styles.fieldControls}>
          <div className={styles.fieldContainer}>
            <div className={styles.fieldContainer}>
              <label htmlFor="username">Username</label>
              <input
                value={inputValue.username}
                id="username"
                onChange={inputChangeHandler}
              />
            </div>
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
            <button>Signup</button>
            <Link
              style={{ alignSelf: "center", margin: "1rem 0 0 0" }}
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
