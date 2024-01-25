import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Root.module.css'
import Expenses from "./Expenses/Expenses";
import Header from "./UI/Header";
import Profile from "./Profile/Profile";

const Root = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/add-expense");
  };

  return (
    <div className={styles.root}>
      <Header />
      <Profile />
      <div className={styles.btnContainer}>
        <button className={styles.addExpenseButton} onClick={clickHandler}>Add New Expense</button>
      </div>
      <Expenses />
    </div>
  );
};

export default Root;
