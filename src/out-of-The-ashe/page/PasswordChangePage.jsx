import React, { useEffect } from 'react'
import FooterComponent from '../Component/FooterComponent'
import DashbordNav from '../Component/AuthenticateComponent/DashbordNav'
import PasswordChange from '../Component/AuthenticateComponent/PasswordChange'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PasswordChangePage = () => {
   const {isAuthenticate}=useSelector((state)=>state.auth);
    const navigate=useNavigate()
   useEffect(()=>{
  
  
      if(!isAuthenticate){
   
        navigate('/loginpage');
  
      }
    },[isAuthenticate])
      useEffect(()=>{
    
        window.scrollTo(0,0)
    
      },[])
  return (
     <div className='w-full pt-25 relative gap-10 flex flex-col bg-[#D6E2ED]  min-h-screen'>
      <DashbordNav></DashbordNav>

     <PasswordChange></PasswordChange>
 
     <FooterComponent></FooterComponent>

    </div>
  )
}

export default PasswordChangePage
