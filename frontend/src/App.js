import React from "react";
import Root from "./components/Root";
import Login from "./components/Auth/Login";

const App = () => {
  const isAuth = false;
  return (
    <>
    {
      isAuth ? <Root /> : <Login />
    }
    </>
  );
};

export default App;
