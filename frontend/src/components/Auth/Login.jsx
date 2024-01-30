import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../../utils/var";
import { postData } from "../../utils/api";

function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { value, id } = e.target;
    setInputValue((prev) => ({ ...prev, [id]: value }));

    console.log(inputValue);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("api/v1/auth/login", inputValue);

      if (response.status === 404 || response.status === 401) {
        throw new Error("Invalid Email Or Password");
      }

      if (response.status === 500) {
        throw new Error("Server Side Error");
      }

      if (response.status !== 200) {
        throw new Error("Something went wrong. Please try again.");
      }

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        navigate("/");
      }
    } catch (err) {
      console.log("error => ", err);
      alert(err);
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
            <button type="submit">Login</button>
            <Link
              style={{ alignSelf: "center", margin: "1rem 0 0 0"}}
              to="/forgot-password"
            >
              Forgot Password
            </Link>
            <div style={{ alignSelf: "center", margin: "1rem 0 0 0" }}>
              Don't have an account yet?{" "}
              <Link
                style={{
                  margin: "0 2px",
                }}
                to="/signup"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
