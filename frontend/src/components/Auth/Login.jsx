import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../../utils/var";

function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const inputChangeHandler = (e) => {
    const { value, id } = e.target;
    setInputValue((prev) => ({ ...prev, [id]: value }));

    console.log(inputValue);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        inputValue
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
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
