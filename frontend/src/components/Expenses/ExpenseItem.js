import React, { useContext } from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';
import ExpenseContext from '../../store/expense-context';

const ExpenseItem = (props) => {

  const expenseCtx = useContext(ExpenseContext)

  return (
    <li>
      <Card className='expense-item'>
        <ExpenseDate date={props.date} />
        <div className='expense-item__description'>
          <h2>{props.title} </h2>
          {/* <button onClick={()=> console.log('edit')}>Edit</button> */}
          <div className='expense-item__price'>${props.amount}</div>
        <button  className='deleteButton expense-item__price' onClick={()=> expenseCtx.onDelete(props.id)}>Delete</button>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
