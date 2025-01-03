import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import PasswordReset from './pages/PasswordReset'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/email-verify' element={<EmailVerify/>} />
        <Route path='/password-reset' element={<PasswordReset/>} />
      </Routes>
    </div>
  )
}

export default App
