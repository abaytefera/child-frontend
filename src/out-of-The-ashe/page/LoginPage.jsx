import React, { useEffect } from 'react'
import NavComponent from '../Component/NavComponent'
import FooterComponent from '../Component/FooterComponent'
import LoginComponnet from '../Component/LoginComponnet'
const LoginPage = () => {
    useEffect(()=>{
  
      window.scrollTo(0,0)
  
    },[])
  return (
   <section className='w-full overflow-x-hidden relative min-h-screen bg-[#D6E2ED] gap-[200px]      '>
<NavComponent></NavComponent>

<LoginComponnet></LoginComponnet>
<FooterComponent></FooterComponent>
   </section>
  )
}

export default LoginPage
