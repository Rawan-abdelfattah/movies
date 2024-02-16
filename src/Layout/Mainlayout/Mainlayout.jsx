import React from 'react'
import Navbar from'../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import {Outlet, useNavigate} from 'react-router-dom';
export default function Mainlayout({UserData ,setUserData}) {
  let navigate = useNavigate()
  function logout(){
    localStorage.removeItem('userToken')
    setUserData(null)
    return navigate('/login')
  }
  return (
    <>
    <Navbar logout={logout } UserData={UserData}/>
    <Outlet/>
    <Footer/>
    </>
  )
}
