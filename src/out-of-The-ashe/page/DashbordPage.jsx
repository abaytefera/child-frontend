import React, { useEffect } from 'react'
import DashbordNav from '../Component/AuthenticateComponent/DashbordNav'
import FooterComponent from '../Component/FooterComponent'
import DashbordBody from '../Component/AuthenticateComponent/DashbordBody'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DashbordPage = () => {
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
    <div className='w-full pt-25 gap-10 flex flex-col bg-[#D6E2ED]  min-h-screen'>
      <DashbordNav></DashbordNav>

     <DashbordBody></DashbordBody>

     <FooterComponent></FooterComponent>

    </div>
  )
}

export default DashbordPage

