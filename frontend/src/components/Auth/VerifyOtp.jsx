import React, { useState } from 'react'
import styles from './SendOtp.module.css'; 


function VerifyOtp() {
    
  const [otp, setOtp] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('OTP:', otp);
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
  )
}

export default VerifyOtp