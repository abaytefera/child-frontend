import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faTwitter,faLinkedin } from '@fortawesome/free-brands-svg-icons'

const FooterComponent = () => {
  return (
   <section className='max-md:flex-col bg-[url(https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768032260/Child_1_axdjgd.png)]  backdrop-blur-sm   max-md:items-center  mb-1  bg-brandColor flex justify-between w-full left-0 px-[48px] py-[10px] bottom-0  '> 
     <p className='max-w-[269px]   self-center text-center text-white'>
     website Design and Development
     ©All Right Reserved  by Abay Tefera
     </p>
      <div className='flex flex-col gap-2 '>
      <h3 className='self-center text-white text-[20px]   '>Contact</h3>
      <div className='grid grid-cols-2 gap-5'>
        <FontAwesomeIcon className='text-[24px] text-[#2E37B0]' icon={faFacebook}></FontAwesomeIcon>
        <FontAwesomeIcon className='text-[24px] text-[#2E37B0]' icon={faTwitter}></FontAwesomeIcon>
        <FontAwesomeIcon className='text-[24px] text-red-600' icon={faLinkedin}></FontAwesomeIcon>
            <FontAwesomeIcon className='text-[24px] ' icon={faMailBulk}></FontAwesomeIcon>
      </div>
      </div>
       <p className='max-w-[269px] text-white self-center  text-center '>
      website  content  ©All Right Reserved 
      by ️out of The Ashe
       </p>

   </section>
       
  )
}

export default FooterComponent
