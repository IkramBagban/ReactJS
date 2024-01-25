import React from 'react'
import Login from './Auth/Login'

function ProtectedRoute({children}) {
    const isLoggedin = localStorage.getItem('token')
  return (
    isLoggedin ? children : <Login />
  )
}

export default ProtectedRoute