import React, { useState } from "react";
import styles from "./SendOtp.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postData("api/v1/auth/verifyOtp", {
        otp: otp,
        email: email,
      });
      console.log("res", response);

      if (response.status === 401) {
        throw new Error("OTP Invalid Or Expired");
      }
      if (response.status === 500) {
        throw new Error("Internal Server Error");
      }

      if (!response.data.success) {
        throw new Error("Something went wrong!");
      }

      navigate("/reset-password", { state: { email: email } });
      console.log(email, otp);
    } catch (err) {
      console.log(err);
      alert(err || "Something went wrong");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Verify OTP</h2>
        <input
          type="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;
