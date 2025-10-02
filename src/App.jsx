import React, { useContext, useEffect  } from 'react'
import Login from './pages/Login'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import { UserContext } from './context/UserContext'
import Happening from './pages/Happening'
import Appreciate from './pages/Appreciate'
import Profile from './pages/Profile'
import RequestUser from './pages/RequestUser'
import HomeLogin from './pages/HomeLogin'
import HrPage from './pages/HrPage'
import AdminHomePage from './pages/Admin Pages/AdminHomePage'
import Unauthorized from './pages/Unauthorized'
import AuthService from './services/AuthService'

const isTokenValid = (token) => {
  if (!token || typeof token !== 'string') return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch (e) {
    return true;
  }
};

const App = () => {
  const { user, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ['/', '/login', '/requestuser', '/about'];
    const path = location.pathname;
    if (publicPaths.includes(path)) return;
    if (user) return;

    // use AuthService.getToken() as source of truth
    const token = AuthService.getToken();
    if (token && isTokenValid(token)) {
      return;
    }

    navigate('/login');
  }, [user, navigate, location.pathname]);

  return (
    <div className="px-2 py-2">
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomeLogin/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/happenings' element = {<Happening/>}/>
         <Route path='/appreciate' element = {<Appreciate/>}/>
          <Route path='/profile' element = {<Profile/>}/>
          <Route path='/requestuser' element = {<RequestUser/>}/>
          <Route path = '/admin' element = {isAdmin ? <AdminHomePage/> : <Unauthorized/>}/>
          <Route path='/about' element = {<HrPage/>}/>
      </Routes>
    </div>
  )
}

export default App
