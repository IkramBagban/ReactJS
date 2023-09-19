import React, { useContext, useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import ExpenseContext from "../../store/expense-context";

const NewExpense = () => {
  const [isEditing, setIsEditing] = useState(false);
  const expenseCtx = useContext(ExpenseContext)

  const isEmpty = (data) => {
    const isEmpty = Object.values(data).some(
      (value) => value.toString() === "Invalid Date" || value === ""
    );

    if (isEmpty) {
      alert("All The Fields Are Required!");
      return true;
    }
    return false;
  };
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    if(isEmpty(expenseData)) return;

    expenseCtx.onAddExpense(expenseData);
    setIsEditing(false);
  };


  const editingHandler = ()=>{
    setIsEditing(!isEditing);
  }

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={editingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={editingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
