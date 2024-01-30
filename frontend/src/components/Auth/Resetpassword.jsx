import React, { useState } from "react";
import styles from "./SendOtp.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import axios from "axios";
import { API_URL } from "../../utils/var";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const { email } = location.state;

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Password Doesn't match");
      }
      const response = await axios.patch(
        `${API_URL}/api/v1/auth/resetpassword`,
        {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      console.log("res", response);

      if (!response.data.success) {
        throw new Error("Something went wrong!");
      }

      console.log(email, password, confirmPassword);
      navigate("/login");

      console.log("password", password);
      console.log("confirmPassword", confirmPassword);
    } catch (err) {
      console.log(err);
      alert(err || "Something went wrong");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default Resetpassword;