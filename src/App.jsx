import { useState,useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login,logout } from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => { 
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        } else {
          console.log('no user data')
          dispatch(logout())
        }
      }).catch((error)=>console.log("error in user authentication",error))
      .finally(()=>setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap
  content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
  </div>
  ): null;
}

export default App
