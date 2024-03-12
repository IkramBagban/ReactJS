import React, { useEffect, useState } from "react";
import styles from "./SendOtp.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location.state);

  useEffect(() => {
    if (!location.state || !location.state.email) {
      navigate("/login");
    }
  }, [location.state, navigate]);

  const email = location.state?.email;

  if (!email) return;


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Password Doesn't match");
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/resetpassword`,
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

      navigate("/login");
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
