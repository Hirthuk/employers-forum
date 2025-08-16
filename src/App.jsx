import React, { useContext, useEffect  } from 'react'
import Login from './pages/Login'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import { UserContext } from './context/UserContext'
import Happening from './pages/Happening'
import Appreciate from './pages/Appreciate'
import Profile from './pages/Profile'
import Requestuser from './pages/Requestuser'
import HomeLogin from './pages/HomeLogin'
import HrPage from './pages/HrPage'

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // allow these public paths without authentication
    const publicPaths = ['/login', '/requestuser', '/about'];
    if (!user && !publicPaths.includes(location.pathname)) {
      navigate('/login');
    }
  }, [user, navigate, location.pathname]);
  
  return (
    <div className="px-2 py-2">
      <ToastContainer/>
      <Routes>
          <Route path='/' element={user ? <Home/> : <HomeLogin/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/happenings' element = {<Happening/>}/>
         <Route path='/appreciate' element = {<Appreciate/>}/>
          <Route path='/profile' element = {<Profile/>}/>
          <Route path='/requestuser' element = {<Requestuser/>}/>
          <Route path='/about' element = {<HrPage/>}/>
      </Routes>
    </div>
  )
}

export default App
