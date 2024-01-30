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
import SendOtp from "./components/Auth/SendOtp";
import VerifyOtp from "./components/Auth/VerifyOtp";
import Resetpassword from "./components/Auth/Resetpassword";

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
  {
    path: "login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "signup",
    element: (
      <ProtectedRoute>
        <Signup />
      </ProtectedRoute>
    ),
  },

  {
    path: "forgot-password",
    element: (
      <ProtectedRoute>
        <SendOtp />
      </ProtectedRoute>
    ),
  },
  {
    path: "verify",
    element: (
      <ProtectedRoute>
        <VerifyOtp />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ProtectedRoute>
        <Resetpassword />
      </ProtectedRoute>
    ),
  },
]);

root.render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
