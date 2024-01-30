import React, { useState } from 'react';
import styles from './SendOtp.module.css'; 
import { useNavigate } from 'react-router-dom';
const SendOtp = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/verify')
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
