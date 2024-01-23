import React, { useContext, useState } from 'react';

import './ExpenseForm.css';
import ExpenseContext from '../../store/expense-context';
import { useNavigate } from 'react-router-dom';

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const navigate = useNavigate();
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
    navigate('/')
  };


  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    saveExpenseDataHandler(expenseData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  const cancelHandler = () =>{
    navigate('/')
  }
  
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max={new Date().toISOString().split('T')[0]}
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type="button" onClick={cancelHandler}>Cancel</button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
