import React, { useState } from 'react'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Links } from 'react-router-dom';
const NavComponent = () => {
  const [meanuControl,setMeanuControl]=useState(false);
  console.log(meanuControl);
  return (
    <section className='w-full   backdrop-blur-md   z-100 fixed top-0 left-0 h-[90px] fixed top-0 bg-white/30  lg:px-[64px] 
            max-lg:px-[32px]  max-md:px-[16px] 
               flex  justify-between items-center '>

        {/* logo box */}
     <div className='w-[102px] h-[42px]  '>

         <img src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1767960857/out_1_ligvau.png" alt="profile" />

     </div>

{/* nav box */}
    <button onClick={()=>{
      console.log("selam");
setMeanuControl((pre)=>!pre);
    }} className='md:hidden z-100 cursor-pointer'>

            <FontAwesomeIcon icon={faBars} className='text-black font-bold text-[30px] font-bold'></FontAwesomeIcon>

     </button>

     <nav className={`${meanuControl ?"translate-y-0 ":"-translate-y-20 opacity-0"} transition-all  px-5 py-3 duration-900 easy-out   -z-100 rounded-md  absolute right-0 gap-5 bg-white   top-22 md:hidden text-white flex-col  flex justify-between items-center`}>

         <Link to={'/'} className=' px-5 py-3  rounded-md hover:bg-[#D6E2ED] transtion-color duration-300 easy-out'>
             <button className='text-[16px] hover:font-bold  max-lg:text-[18px] pxhover:text-[#2E37B0] 
                               hover:text-[20px text-black font-bold transtion-all duration-300] cursor-pointer'>Home
              </button>
          </Link>

          <Link className='px-5 py-3  ' to={'/loginpage'}
          className='hover:bg-'><button className='w-[93px] h-[46px] text-[16px] hover:bg-blue-900 
                               transtion-all duration-300 ease  cursor-pointer 
                                 rounded-[12px] bg-[#3B39CE]'>Login
          </button>
          </Link>

      </nav>
      
      <nav className={`  w-[259px] h-[68px]  max-md:hidden text-white  flex justify-between items-center`}>

         <Link to={'/'}>
             <button className='text-[16px] hover:font-bold  max-lg:text-[18px] pxhover:text-[#2E37B0] 
                               hover:text-[20px text-black font-bold transtion-all duration-300] cursor-pointer'>Home
              </button>
          </Link>

          <Link to={'/loginpage'}><button className='w-[93px] h-[46px] text-[16px] hover:bg-[#2E37B0] 
                               transtion-all duration-300 ease  cursor-pointer 
                                 rounded-[12px] bg-[#3B39CE]'>Login
          </button>
          </Link>

      </nav>

      
    </section>
  )
}

export default NavComponent
