import React, { useState } from 'react';
import styles from './SendOtp.module.css'; 
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utils/api';
const SendOtp = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{

    const response = await postData("api/v1/auth/sendotp", {email : email});
    console.log('res',response);

      if (response.status === 404) {
        throw new Error("Email doesn't exist.");
      }

      if (!response.data.success) {
        throw new Error("Something went wrong!");
      }

      // navigate("/login");
    navigate('/verify',{ state: { email: email } })
    // console.log(email)

    console.log('Sending OTP to:', email);
  } catch (err) {
    console.log(err);
    alert(err || "Something went wrong");
  }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Enter Your Email</h2>
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
