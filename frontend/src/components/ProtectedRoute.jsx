import React from 'react'
import Login from './Auth/Login'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const isLoggedin = localStorage.getItem('token')
  return (
    isLoggedin ? children : <Navigate to='/login' />
  )
}

export default ProtectedRoute