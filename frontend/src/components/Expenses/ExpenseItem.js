import React, { useContext } from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import ExpenseContext from "../../store/expense-context";
import axios from "axios";

const ExpenseItem = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  const token = localStorage.getItem("token");

  const deleteHandler = async () => {
    const confirmDelete = window.confirm("Do You Want To Delete This Item?");
    if (!confirmDelete) return;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/expenses/delete/${props.id}`,
        { headers }
      );

      if (response.status === 204) {
        expenseCtx.onDelete(props.id);
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        localStorage.clear();
        return alert("Authorization Failed! Refresh the page and login");
        // throw new Error("Authorization Failed!");
      }
      // if (err.response.status === 401) {
      //   return alert(err.response.data.message || "Not Authenticated");
      // }
      alert("Something went wrong");
    }
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title} </h2>
          <div style={{ display: "flex" }}>
            <div className="expense-item__price">${props.amount}</div>
            <div>
              <button className="deleteButton" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
