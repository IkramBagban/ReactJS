import React, { useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import ExpenseContext from "../../store/expense-context";
import useFetch from "../../CustomerHooks/useFetch";

const Expenses = () => {
  const expenseCtx = useContext(ExpenseContext);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  const headers = {
    Authroization: "Bearer " + token,
  };
  const [fetchedExpenses, isLoading, isError] = useFetch(
    `api/v1/expenses/${userId}`,
    headers
  );

  useEffect(() => {
    if (!fetchedExpenses) return console.log("expenses not fetched yet");

    const expensesWithModifiedDate = fetchedExpenses.map((expense) => {
      return { ...expense, date: new Date(expense.date) };
    });

    expenseCtx.onAddExpensesToContext(expensesWithModifiedDate);
  }, [isLoading]);

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter />
        {/* <ExpensesChart /> */}

        <ExpensesList isLoading={isLoading} />
      </Card>
    </div>
  );
};

export default Expenses;
