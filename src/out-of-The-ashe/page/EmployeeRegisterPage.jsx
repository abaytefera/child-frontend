import React, { useEffect } from 'react'
import DashbordNav from '../Component/AuthenticateComponent/DashbordNav'
import FooterComponent from '../Component/FooterComponent'
import EmployeeRegister from '../Component/AuthenticateComponent/EmployeeRegister'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const EmployeeRegisterPage = () => {
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
    <div className='w-full overflow-x-hidden relative min-h-screen flex flex-col  bg-[#D6E2ED] gap-[10px]   pt-30'>
      <DashbordNav></DashbordNav>

      <EmployeeRegister></EmployeeRegister>
      <FooterComponent></FooterComponent>

    </div>
  )
}

export default EmployeeRegisterPage
