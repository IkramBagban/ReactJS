import React, { useState } from 'react';
import styles from './SendOtp.module.css'; 
const SendOtp = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Sending OTP to:', email);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Send OTP</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default SendOtp;
