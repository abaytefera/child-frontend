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
    <div className=' flex gap-[100px]     self-center max-md:gap-10   max-md:flex-col-reverse border-black'>

              <div className={`${scrollObserver<=200 ? "md:translate-x-0 ":" md:opacity-[0%] md:-translate-x-100"} transition-all easy-out duration-900   lg:max-w-[600px] md:max-w-[390px]  max-md:max-w-[374px] h-[211px]`}>
                   <img src="https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/Child.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL0NoaWxkLnBuZyIsImlhdCI6MTc2NzAxNzM3NCwiZXhwIjoxNzk4NTUzMzc0fQ.APfT_5ombWb8oG1MTmzzp8NJJQLHIq6B9mszUJX_QLU" alt="" className=' rounded-[12px] ' />
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
