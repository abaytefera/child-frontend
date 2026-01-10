import React from 'react'
import { useState ,useEffect} from 'react';
const OurServiceComponent = () => {
  const [scrollObserver,setScrollobserver]=useState(0);
  useEffect(()=>{

    const onScroll=()=>setScrollobserver(window.scrollY);
    window.addEventListener('scroll',onScroll);
return()=>{

  
}
  },[])
  console.log(scrollObserver);
  return (
    <section className=' flex relative  self-center gap-[60px] flex-col'>
      
          <h1 className={`${scrollObserver >=100 ? "md:translate-y-0":" md:opacity-0 md:-translate-y-5"} ${scrollObserver >=200 ? "max-md:translate-y-0":"opacity-0 max-md:-translate-y-5"}     transform-all duration-300 easy-out  istok-web-regular-italic self-center`}>
              Our Service
          </h1>
          <div className='flex  max-md:flex-col gap-[100px] '>
                <div className='flex flex-col '>
                   <img src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768031988/school_yiltyp.png" alt="" className={`md:w-[267px] md:w-[296px]  ${scrollObserver>=200 ? "md:translate-x-0 ":" md:opacity-[0%] md:-translate-x-100"}   ${scrollObserver >=300 ?"max-md:translate-x-0":"max-md:-translate-x-100 max-md:opacity-0"} transform-all duration-900 easy-out max-md:self-center max-md:max-w-full max-md:h-[426px] lg:w-[400px] lg:h-[300px]  rounded-[8px]`} />
                   <div className={`${scrollObserver>=300 ? "md:translate-y-0":"md:translate-y-20"} transform-all duration-900 easy-out  ${scrollObserver >=600 ? "max-md:translate-y-0":"max-md:translate-y-20"} flex flex-col `}>
                     <h1 className={` text-[20px] self-center  text-[#3B39CE]`}>
                      Education
                     </h1>
                     <p className='w-[206px] text-center self-center'>
                      Tech Orphan Private School for
                       Better Learning
                     </p>
                   </div>


                </div>

                <div>
                   <div className='flex flex-col '>
                      <img src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1767961085/lunch_ujtozk.png" alt="" className={`${scrollObserver>=200 ? "md:translate-x-0 ":" md:opacity-[0%] md:translate-x-100"} ${scrollObserver>=800 ? "max-md:translate-x-0 ":" max-md:opacity-[0%] max-md:translate-x-100"} transform-all duration-900 easy-out  max-md:self-center max-md:max-w-full max-md:h-[426px] md:w-[267px] md:w-[296px]  lg:w-[400px] lg:h-[300px]  rounded-[8px]`}/>

                      <div className={` ${scrollObserver >=1200 ? "max-md:translate-y-0":"max-md:translate-y-20"}  ${scrollObserver >=300 ? "md:translate-y-0":"md:translate-y-20"} transform-all duration-900 easy-out  flex flex-col `}>
                         <h1 className='text-[20px] self-center  text-[#3B39CE]'>
                         Food
                         </h1>
                         <p className='w-[206px] text-center self-center'>
                         Provide nutritious food 
                         for orphaned children
                         </p>
                      </div>


                  </div>
                </div>


         </div>
    </section>
  )
}

export default OurServiceComponent
