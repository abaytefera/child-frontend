import React, { useEffect } from 'react'
import { useState } from 'react'
const HeroComponent = () => {
      const [scrollObserver,setScrollobserver]=useState(0);
      useEffect(()=>{
      
          const onScroll=()=>setScrollobserver(window.scrollY);
          window.addEventListener('scroll',onScroll);
      return()=>{
      
        
      }
        },[])
  return (
    <div className=' flex gap-[100px]     self-center max-md:gap-10   max-md:flex-col-reverse '>

              <div className={`${scrollObserver<=200 ? "md:translate-x-0 ":" md:opacity-[0%] md:-translate-x-100"} transition-all easy-out duration-900   lg:max-w-[600px] md:max-w-[390px]  max-md:max-w-[374px] h-[211px]`}>
                   <img src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768032260/Child_1_axdjgd.png" alt="" className=' rounded-[12px] ' />
              </div>
              <div className={`${scrollObserver<=200 ? "md:translate-x-0 ":" md:opacity-[0%] md:translate-x-100"} transition-all easy-out duration-900 flex self-center flex-col gap-[9px]`}>

                   <h1 className='italiana-regular'>our Vesion</h1>
                   <p className='island-moments-regular'>Breaking the Cycle</p>
                   <p className='font-bold text-[18px]'>of Poverty through Education</p>
                   <p className='text-[16px] text-center w-[257px]'>Reducing the suffering of orphans & vulnerable children in Korah, Ethiopia.</p>

              </div>

      </div>
  )
}

export default HeroComponent
