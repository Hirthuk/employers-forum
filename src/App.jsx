import React, { useContext } from 'react'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import { UserContext } from './context/UserContext'
import Happening from './pages/Happening'
import Appreciate from './pages/Appreciate'
import Profile from './pages/Profile'
import Requestuser from './pages/RequestUser'
import HomeLogin from './pages/HomeLogin'

const App = () => {
  const { id } = useContext(UserContext);

  return (
    <div className="px-2 py-2">
      <ToastContainer/>
      <Routes>
         <Route path='/' element={id ? <Home/> : <HomeLogin/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/happenings' element = {<Happening/>}/>
         <Route path='/appreciate' element = {<Appreciate/>}/>
          <Route path='/profile' element = {<Profile/>}/>
          <Route path='/requestuser' element = {<Requestuser/>}/>
      </Routes>
    </div>
  )
}

export default App
