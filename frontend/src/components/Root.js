import React from "react";
import { useNavigate } from "react-router-dom";
import './Root.css'
import Expenses from "./Expenses/Expenses";

const Root = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/add-expense");
  };

  return (
    <div>
      <div className="btn-container">
        <button onClick={clickHandler}>Adddd New Expense</button>
      </div>
      <Expenses />
    </div>
  );
};

export default Root;
