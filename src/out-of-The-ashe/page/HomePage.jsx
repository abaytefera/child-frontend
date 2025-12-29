import React, { useEffect } from 'react'
import NavComponent from '../Component/NavComponent'
import HeroComponent from '../Component/HomeComponent.jsx/HeroComponent'
import OurServiceComponent from '../Component/HomeComponent.jsx/OurServiceComponent'
import FounderComponent from '../Component/HomeComponent.jsx/FounderComponent'
import FooterComponent from '../Component/FooterComponent'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



const HomePage = () => {
 const {isAuthenticate}=useSelector((state)=>state.auth);
    const navigate=useNavigate()
   useEffect(()=>{
  
  
      if(isAuthenticate){
   
        navigate('/DashbordPage');
  
      }
    },[isAuthenticate])
      useEffect(()=>{
    
        window.scrollTo(0,0)
    
      },[])
  
  return (
    <section className='w-full overflow-x-hidden border-1 relative min-h-screen flex flex-col  bg-[#D6E2ED]     pt-[200px] '>
      <NavComponent></NavComponent>
       <HeroComponent></HeroComponent>
       <div className='flex  pb-30 flex-col gap-[200px]'>
       <OurServiceComponent></OurServiceComponent>
       <FounderComponent></FounderComponent>
   
</div>
       <FooterComponent></FooterComponent>
      
    </section>
  )
}

export default HomePage
