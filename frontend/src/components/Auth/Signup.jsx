import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";

function Signup() {
  const [inputValue, setInputValue] = useState({
    username: "",
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
      const response = await postData("api/v1/auth/signup", inputValue);

      if (response.status === 401) {
        const validationError = response.data.errors[0].msg;
        throw new Error(validationError);
      }

      if (response.status === 409) {
        throw new Error(response.data.message);
      }

      if (!response.data.success) {
        throw new Error("Something went wrong!");
      }

      navigate("/login");
      console.log("loggedin");
    } catch (err) {
      console.log(err);
      alert(err || "Something went wrong");
    }
  };

  return (
    <div className={styles.rootContainer}>
      <form onSubmit={submitHandler} className={styles.container}>
        <h3>Signup</h3>
        <div className={styles.fieldControls}>
          <div className={styles.fieldContainer}>
              <label htmlFor="username">Username</label>
              <input
                value={inputValue.username}
                id="username"
                onChange={inputChangeHandler}
              />
            </div>
            
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
            <button className={styles.button}>Signup</button>
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
