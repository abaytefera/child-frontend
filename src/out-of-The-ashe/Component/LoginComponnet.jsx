import React, { useEffect } from 'react'
import { useState,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LoginUser } from '../Redux/auth';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginComponnet = () => {
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [showError,setShowError]=useState(false);
   const [showFeedBack,setshowFeedBack]=useState(false);
   const [FirstTimelogin,setFirstTimelogin]=useState(false);

   const [showPassword,setShowPassword]=useState(true)

   const [feedBackText,setFeedBackText]=useState('');
   const Dispatch=useDispatch();
   const {id,isAuthenticate, isloading,error,token, logout} =useSelector((state)=>state.auth);
   const navigate=useNavigate();


  
  const  onLogin=async()=>{
  
     setshowFeedBack(false)
     setFeedBackText('');
  
       if(email==''){
          console.log('email is empty');
          setshowFeedBack(true)
          setShowError(true)
         setFeedBackText(
             <div className='flex text-red-900 items-center justify-center'>
            <FontAwesomeIcon icon={faTimes} className='text-[20px] mt-1 text-red-800'></FontAwesomeIcon>
          please enter  email
            </div>);
          
       }else if(password==''){
            console.log('email is empty');
            setshowFeedBack(true)
            setShowError(true)
       setFeedBackText(
           <div className='flex text-red-900 items-center justify-center'>
            <FontAwesomeIcon icon={faTimes} className='text-[20px] mt-1 text-red-800'></FontAwesomeIcon>
          please enter  password
            </div>)
  
       }else{
  

   Dispatch(LoginUser({email,password}));
setFirstTimelogin(true);


     
       

    

        

    



        



   }
  }


      useEffect(()=>{
      
        if(id && isAuthenticate && token){

       
          localStorage.setItem('authToken',token);
            setshowFeedBack(true)
            setShowError(false)
         setFeedBackText(
            <div className='z-15 font-bold text-green-800 ml-20'>
             
            <FontAwesomeIcon icon={faCheck} className='text-[20px] mt-1 '></FontAwesomeIcon>
            succfuly login redirect....
           </div>
           );
           if(FirstTimelogin){
           setTimeout(()=>{
          navigate('/DashbordPage');
          setFirstTimelogin(false);
           },3000)}else{
    navigate('/DashbordPage');

           }
           return

       }
    
     
if(error){

     setshowFeedBack(true)
          setShowError(true)
         setFeedBackText(
             <div className='flex text-red-900 items-center justify-center'>
            <FontAwesomeIcon icon={faTimes} className='text-[20px] mt-1 text-red-800'></FontAwesomeIcon>
         {error[0].msg || error}
            </div>);
          
}

      },[id,isAuthenticate,token,error])
    
 

  return (
    <div className=' mb-100 mt-50 flex justify-center '>
      <div className='flex max-w-90 w-90 gap-[42px] flex-col'>
         <h1 className='self-center text-[#3B39CE] text-[25px] font-bold '>
            welcome
         </h1>
         <div className={`${showFeedBack  ?`w-full text-white pt-1 h-10 border-1 text-center rounded-md ${showError ?"bg-red-400":"bg-green-200 flex relative"}`:'hidden'}`} > <div className={`bg-green-400 rounded-md ${showError ?"hidden":"block"} w-full transtion-all duration-1000  z-10 top-0 loginAni absolute left-0 h-full `}></div>  {feedBackText}</div>
         <div className={` ${isloading ?"w-full font-bold text-blue-900 flex gap-1 bg-blue-300 justify-center  pt-1 h-10  text-center rounded-md":"hidden"} `}>
            <div className='rounded-full w-7 h-7 animate-spin border-t-transparent border-4 border-blue-900'></div>
            loading...
         </div>
      
          <div className="w-full">
            <label className="block text-gray-600 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
               value={email}
              onChange={(e)=>{
                  setEmail(e.target.value);

                   }}
        className="w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
           
          </div>

         <div className="w-full relative">
            <label className="block text-gray-600 font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>{
                   setPassword(e.target.value);

                   }}
             
              className="w-full px-4 py-2 border border-gray-300 rounded pr-10 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="absolute top-9 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
           
          </div>
           <button onClick={()=>{
            onLogin()}} className='border-1 text-center cursor-pointer hover:bg-blue-900 transition-color duration-300 easy-out px-6 py-2  self-center  text-white bg-[#3B39CE]   rounded-[12px]'>
            login
           </button>



      </div>
      

      
    </div>
  )
}

export default LoginComponnet
