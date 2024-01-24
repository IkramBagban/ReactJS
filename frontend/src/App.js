import React, { useEffect } from "react";
import Root from "./components/Root";
import Login from "./components/Auth/Login";
import { useNavigate } from "react-router-dom";

const App = () => {
  const isLoggedin = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(()=>{
    // isLoggedin ? navigate('/') : navigate('/login')
    if(!isLoggedin){
      navigate('/login')
    }
  },[isLoggedin])
  return (
    <>
      <Root />
    </>
  );
};

export default App;
