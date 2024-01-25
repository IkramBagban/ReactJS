import { createContext } from "react";

const ExpenseContext = createContext({
  expenses: [],
  onAddExpensesToContext : (expenses) =>{},
  onAddExpense: (expense) => {},
  onDelete: (id) => {},
  onSetFilteredYear: (year) => {},
  onClearContext : ()=>{},
  selectedYear: "all",
  filteredExpenses: () => {},
});

export default ExpenseContext;
