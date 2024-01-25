import React, { useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
// import ExpensesChart from "../Chart/ExpensesChart";
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

    fetchedExpenses.forEach((expense) => {
      expenseCtx.onAddExpense({ ...expense, date: new Date(expense.date) });
    });
  }, [isLoading]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.log("there is an error", isError);
    // return
  }
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
        // selected={expenseCtx.filteredYear}
        // onSetFilteredYear={setFilteredYear}
        />
        {/* <ExpensesChart /> */}

        {/* {isLoading ? <h1>Loading...</h1>:<ExpensesList /> } */}
        <ExpensesList isLoading={isLoading}/>
      </Card>
    </div>
  );
};

export default Expenses;
