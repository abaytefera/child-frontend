import React from 'react'
import { useState,useEffect } from 'react'

const FounderComponent = () => {
  const [ScrollObserver,setScrollobserver]=useState(0);

  useEffect(()=>{
    const  onScroll=()=>setScrollobserver(window.scrollY);
         
      window.addEventListener('scroll',onScroll);
   return()=>{
     window.removeEventListener('scroll',onScroll);

   }
    },[])
  return (
    <section className='flex  flex-col gap-[30px]'>

          <h1 className={`${ScrollObserver >=1400 ?"max-md:translate-y-0":" max-md:opacity-0 max-md:-translate-y-10"}  ${ScrollObserver >=500 ?"md:translate-y-0":" md:opacity-0 md:-translate-y-20"} transform-all duration-900 easy-out  istok-web   self-center`}>
              About out of the Ashe
          </h1>
          <div className='flex max-md:flex-col gap-[20px] md:gap-[100px]  self-center'>
           <img src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1767960857/out_1_ligvau.png" alt="" className={` ${ScrollObserver >=1550 ?"max-md:scale-100":" max-md:opacity-0 max-md:scale-0"} ${ScrollObserver >=600 ?"md:scale-100":" md:opacity-0 md:scale-0"} transform duration-900 easy-out lg:max-w-[302px] max-w-[200px] h-[88px] self-center lg:h-[132px]`} />
            
            <div className={` ${ScrollObserver >=1650 ?"max-md:translate-x-0":" max-md:opacity-0 max-md:translate-x-80"} ${ScrollObserver >=600 ?"md:translate-x-0":" md:opacity-0 md:translate-x-80"} transform duration-900 easy-out  lg:max-w-[407px] max-w-[376px] max-[500px]:px-5 flex flex-col gap-[30px]`}>
              <h2 className='self-center opacity-70 font-bold text-[20px]'>
               Out of The Ashe
              </h2>
               <p className='text-justify'>
                Out of the Ashes is an International non-governmental 
                organization. It is registered under the Ethiopian Charities
                 and Societies Agency with Reg. no. 4776. The organization was 
                 established in 2013. It partnered with an Ethiopian NGO until 2020 when they received their international license. It started with the vision of contributing to poverty reduction in Addis Ababa and bringing positive behavioral 
                and social change through empowering children and families
               </p>
            </div>

          </div>

   </section>
  )
}

export default FounderComponent
