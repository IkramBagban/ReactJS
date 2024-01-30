import React, { useState } from 'react'
import styles from './SendOtp.module.css'; 
import { useNavigate } from 'react-router-dom';


function VerifyOtp() {
    
  const [otp, setOtp] = useState('');
    const navigate = useNavigate();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
        navigate('/reset-password')
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