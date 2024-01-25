import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import ContextProvider from "./store/ContextProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ExpenseForm from "./components/NewExpense/ExpenseForm";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "add-expense",
    element: (
      <ProtectedRoute>
        <ExpenseForm />
      </ProtectedRoute>
    ),
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
]);

root.render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
