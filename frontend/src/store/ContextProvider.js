import React, { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";
import useFetch from "../CustomerHooks/useFetch";
// const DUMMY_EXPENSES = [
//   {
//     _id: "e1",
//     title: "Toilet Paper",
//     amount: 94.12,
//     date: new Date(2020, 7, 14),
//   },
//   { _id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
//   {
//     _id: "e3",
//     title: "Car Insurance",
//     amount: 294.67,
//     date: new Date(2021, 2, 28),
//   },
//   {
//     _id: "e4",
//     title: "New Desk (Wooden)",
//     amount: 450,
//     date: new Date(2021, 5, 12),
//   },
// ];
const ContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");



  const addExpenseHandler = (expense) => {
    console.log(expense);

    setExpenses((prevExpenses) => {
      console.log("expenses data", new Date(expense.date));
      return [expense, ...prevExpenses];
    });
  };

  const DeleteExpenseHandler = (id) => {
    const filteredExpenses = expenses.filter((expense) => expense._id !== id);

    setExpenses(filteredExpenses);
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedYear === "all") return expense;

    return expense.date.getFullYear().toString() === selectedYear;
  });

  const value = {
    expenses: expenses,
    onAddExpense: addExpenseHandler,
    onDelete: DeleteExpenseHandler,
    onSetFilteredYear: setSelectedYear,
    onAddExpensesToContext : setExpenses,
    selectedYear: selectedYear,
    filteredExpenses: filteredExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ContextProvider;
