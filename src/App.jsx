import React, { useContext } from 'react'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import { UserContext } from './context/UserContext'

const App = () => {
  const { id } = useContext(UserContext);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] md:mt-5 mb-5 rounded-4xl">
      <ToastContainer/>
      <Routes>
        <Route path='/' element={id ? <Home/> : <Login/>} />
      </Routes>
    </div>
  )
}

export default App
