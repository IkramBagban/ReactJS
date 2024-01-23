import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import ContextProvider from "./store/ContextProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ExpenseForm from "./components/NewExpense/ExpenseForm";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "add-expense", element: <ExpenseForm /> },
]);

root.render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
