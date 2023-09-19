import React, { useContext } from 'react';

import './ExpensesFilter.css';
import ExpenseContext from '../../store/expense-context';

const ExpensesFilter = () => {
  const expenseCtx = useContext(ExpenseContext)

  const dropdownChangeHandler = (event) => {
    expenseCtx.onSetFilteredYear(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select value={expenseCtx.selectedYear} onChange={dropdownChangeHandler}>
          <option value='all'>All</option>
          <option value='2023'>2023</option>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
