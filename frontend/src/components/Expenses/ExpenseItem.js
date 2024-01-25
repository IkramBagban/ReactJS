import React, { useContext } from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import ExpenseContext from "../../store/expense-context";
import axios from "axios";
import { API_URL } from "../../utils/var";

const ExpenseItem = (props) => {
  const expenseCtx = useContext(ExpenseContext);

  const deleteHandler = async () => {
    const confirmDelete = window.confirm("Do You Want To Delete This Item?");
try{

  if (!confirmDelete) return;
  const response = await axios.delete(
    `${API_URL}/api/v1/expenses/delete/${props.id}`
    );
    console.log(props.id);

    console.log("response.data", response.data);
    console.log("response.status", response.status);
    expenseCtx.onDelete(props.id);
  }catch(err){
    // console.log(err.response.status)
    if(err.response.status === 401){
      return alert(err.response.data.message || "Not Authenticated")
    }
    alert("Something went wrong")
  }
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
