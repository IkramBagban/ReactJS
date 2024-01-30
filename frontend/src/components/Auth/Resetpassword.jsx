import React, { useState } from 'react'
import styles from './SendOtp.module.css'; 
import { useNavigate } from 'react-router-dom';


function Resetpassword() {
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
          navigate('/login')

      console.log('password', password);
      console.log('confirmPassword', confirmPassword);
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
  )
}

export default Resetpassword