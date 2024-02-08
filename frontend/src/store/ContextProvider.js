import React, { useState } from "react";
import ExpenseContext from "./expense-context";

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
    const filteredExpenses = expenses?.filter((expense) => expense._id !== id);

    setExpenses(filteredExpenses);
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedYear === "all") return expense;

    return expense.date.getFullYear().toString() === selectedYear;
  });

  const clearContext = () => {
    setExpenses([]);
    setSelectedYear("all");
  };

  const value = {
    expenses: expenses,
    onAddExpense: addExpenseHandler,
    onDelete: DeleteExpenseHandler,
    onSetFilteredYear: setSelectedYear,
    onAddExpensesToContext: setExpenses,
    onClearContext: clearContext,
    selectedYear: selectedYear,
    filteredExpenses: filteredExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ContextProvider;
