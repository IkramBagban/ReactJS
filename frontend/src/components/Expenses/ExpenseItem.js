import React, { useContext } from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import ExpenseContext from "../../store/expense-context";

const ExpenseItem = (props) => {
  const expenseCtx = useContext(ExpenseContext);

  const deleteHandler = () => {
    expenseCtx.onDelete(props.id);
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title} </h2>
          {/* <button onClick={()=> console.log('edit')}>Edit</button> */}
          <div className="expense-item__price">${props.amount}</div>
          <button
            className="deleteButton expense-item__price"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
