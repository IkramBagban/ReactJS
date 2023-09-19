import React from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

const App = () => {
  return (
    <div>
      <NewExpense />
      <Expenses />
    </div>
  );
};

export default App;
