import { createContext } from "react";


const ExpenseContext = createContext({
    expenses : [],
    onAddExpense: (expense)=>{},
    onDelete:(id)=>{}
})

export default ExpenseContext;