import { createContext } from "react";

const ExpenseContext = createContext({
  expenses: [],
  onAddFetchedExpensesToStore : (expenses) =>{},
  onAddExpense: (expense) => {},
  onDelete: (id) => {},
  onSetFilteredYear: (year) => {},
  selectedYear: "all",
  filteredExpenses: () => {},
});

export default ExpenseContext;
