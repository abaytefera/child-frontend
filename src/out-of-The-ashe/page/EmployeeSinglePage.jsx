import React, { useEffect } from 'react'
import DashbordNav from '../Component/AuthenticateComponent/DashbordNav'
import FooterComponent from '../Component/FooterComponent'
import EmployeeProfile from '../Component/AuthenticateComponent/Employeesingle'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EmployeeSinglePage = () => {
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
  <div className='w-full pt-25  gap-10 flex flex-col bg-[#D6E2ED]  min-h-screen'>
      <DashbordNav></DashbordNav>

   <EmployeeProfile></EmployeeProfile>

     <FooterComponent></FooterComponent>

    </div>
  )
}

export default EmployeeSinglePage
