import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path ='/register' element={<Register/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path ='/dashboard' element = {<Dashboard/>}/>
        <Route path ='/admin' element = {<Admin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App