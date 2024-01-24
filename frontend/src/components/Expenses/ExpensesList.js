import React, { useContext } from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';
import ExpenseContext from '../../store/expense-context';

const ExpensesList = () => {
  const expenseCtx = useContext(ExpenseContext)

  if (expenseCtx.filteredExpenses.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
  }
  return (
    <ul className='expenses-list'>
      {expenseCtx.filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          id={expense._id}
          
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
