import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { logout } from '../../Redux/auth'
import { useGetUserQuery } from '../../Redux/User'
import { useGetChildbyNameQuery } from '../../Redux/Childes'
import { socket } from './SocketIoConfig'
import { useGetUnreadMessageQuery } from '../../Redux/message'
import { APi } from '../../Redux/CenteralAPI'



const DashbordNav= () => {

  const [isDisplayADd,SetIsDisplay]=useState(false)
  const [isDisplayNavList,setIsDisplayNavList]=useState(false)
  const [searchControl,setSearchControl]=useState(false);
  const [searchValue,setSearchValue]=useState('');
  const {data:childResult}=useGetChildbyNameQuery(searchValue);
  const [isDisplaySettingControl,setIsDisplaySettingControl]=useState(false);

  const Dispatch=useDispatch();
  const {id}=useSelector((state)=>state.auth);
   const {data:User}=useGetUserQuery(id)
   const [countUnreadMessage,setcountUnreadMessage]=useState(0);
   const {data:unreadMessage}=useGetUnreadMessageQuery(id)
  const {ActiveChatId}=useSelector((state)=>state.webState);


  const navigate=useNavigate();
  useEffect(()=>{
setcountUnreadMessage(unreadMessage)

  },[unreadMessage])
  

  let NavList=[
    {
        image:"https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/house-regular-full.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL2hvdXNlLXJlZ3VsYXItZnVsbC5zdmciLCJpYXQiOjE3NjcwMTc0OTQsImV4cCI6MTc5ODU1MzQ5NH0.f-GhVNwPqThqqMDE_ny9j98eNzh_XLLKvANDUnqTLgw",
        Text:"Dashbord",
        resposivehidden:true,
        type:"Dashbord"
    },
      {
        image:"https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/square-plus-regular-full.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL3NxdWFyZS1wbHVzLXJlZ3VsYXItZnVsbC5zdmciLCJpYXQiOjE3NjcwMTgwNTUsImV4cCI6MTc5ODU1NDA1NX0.vnWEJ-HproMgA2c8m5kJBi51VwlthMCl3PFaHxhan44",
        Text:"Add",
        resposivehidden:true,
        type:"add"
    },
      {
        image:"https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/address-card-regular-full%20(1).svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL2FkZHJlc3MtY2FyZC1yZWd1bGFyLWZ1bGwgKDEpLnN2ZyIsImlhdCI6MTc2NzAxODU2MSwiZXhwIjoxNzk4NTU0NTYxfQ.N3jqAH7-lkDk8sKmYQ6htEgdQ49E8ghihnXZDWst0lE",
        Text:"Profile",
        resposivehidden:false,
        type:"profile"
    },
      {
        image:"https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/setting-5-svgrepo-com.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL3NldHRpbmctNS1zdmdyZXBvLWNvbS5zdmciLCJpYXQiOjE3NjcwMTc5OTQsImV4cCI6MTc5ODU1Mzk5NH0.B_1FP8W_BErz65vYs1MMyN5LubhioAzP5mYgB9t5YUg",
        Text:"Setting",
       resposivehidden:false,
       type:"setting"
    },
    {
        image:"https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/logout_3889524.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL2xvZ291dF8zODg5NTI0LnBuZyIsImlhdCI6MTc2NzAxODM2MSwiZXhwIjoxNzk4NTU0MzYxfQ.9nXhPVMr-U09Npy6Qmlw3WOMs2Ap1s4tfpIIhvwLv38",
        Text:"logout",
       resposivehidden:false,
       type:"logout"
    }


  ]

  let ListAdd = [
    {
        image: "https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/undraw_true-friends_1h3v%20(1).svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL3VuZHJhd190cnVlLWZyaWVuZHNfMWgzdiAoMSkuc3ZnIiwiaWF0IjoxNzY3MDE5MTEyLCJleHAiOjE3OTg1NTUxMTJ9.kBLVZxPfW3AMkh39ptzopzJ_FD9wPSOcpZbFtDx6oFw",
        Text: "Register New Child",
        type:'child'
    },

    {
        image: "https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/undraw_hr-presentation_uunk.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL3VuZHJhd19oci1wcmVzZW50YXRpb25fdXVuay5zdmciLCJpYXQiOjE3NjcwMTkwODEsImV4cCI6MTc5ODU1NTA4MX0.3qMVkdLF1JR2REackzw12APiArIn0KXMu_BRUYMsq8g",
        Text: "Employee account create",
        type:'employee'
    },

   
];
  let ListSetting = [
    {
        image: "https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/security_13166299.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL3NlY3VyaXR5XzEzMTY2Mjk5LnBuZyIsImlhdCI6MTc2NzAxODQyOCwiZXhwIjoxNzk4NTU0NDI4fQ.Nh9x-B-gNJDL8AQEynj0b0oOniQZIo-c09SzLv9jg6A",
        Text: "Password Chage",
        type:'passwordChange'
    },

    {
        image: "https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/scanning_7065964.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL3NjYW5uaW5nXzcwNjU5NjQucG5nIiwiaWF0IjoxNzY3MDE4NTE2LCJleHAiOjE3OTg1NTQ1MTZ9.bjsERVuZuSE_ENch-w5iex3OwUR537sMvl_u4YkVfAc",
        Text: "FQA",
        type:'FQA'
    },

  
];
// useEffect(()=>{

//    const handleMarkAsRead=(data)=>{
 
//   Dispatch(APi.util.invalidateTags([{type:"unreadMessage",id:"unread"}]))
//   Dispatch(APi.util.invalidateTags([{type:"conversion",id:"coversionId"}]));

//    setcountUnreadMessage(0);

//    }
// socket.on('succfuly_mark_as_read',handleMarkAsRead)

// return()=>{
//   socket.off('succfuly_mark_as_read',handleMarkAsRead)
// }
// },[])
  const NavListControl=(type)=>{
        
            if(type=="add"){
          
               SetIsDisplay((pre)=>!pre)
             }
            if(type=="setting"){
              setIsDisplaySettingControl((pre)=>!pre);

             }
           if(type=="Dashbord"){
    
                 navigate("/DashbordPage");
             }
             if(type=="profile"){

              navigate('/ProfilePage')
             }
             if(type=="logout"){
              console.log("logout");
              Dispatch(logout());
             }
             


          }

const AddListControl=(type)=>{
  console.log("start of Add button");
console.log(type);
         if(type=="child"){
                navigate('/ChildRegister')

               
              return

            }

        if(type=="task"){
         
            
                navigate('/Createtask')

  return
            }
        if(type=="employee"){
          navigate('/EmployeerRgister')
return

            }



}

const  settingListControl=(type)=>{

       if(type=="passwordChange"){
        navigate('/PasswordChange');
        return



       }




}


useEffect(()=>{
const handleMessageReceive=(data)=>{
console.log("wagawan")
 if(ActiveChatId!==data.senderId){
  console.log('un equal ');
   
   Dispatch(APi.util.invalidateTags([{type:"unreadMessage",id:"unread"},{type:"conversion",id:"coversionId"}]))

  }else{
    console.log('man brother');
 
   Dispatch(APi.util.invalidateTags([{type:"conversion",id:"coversionId"}]))
   socket.emit('both_message_mark',{id:id,other_id:data.senderId})

  }
}
  socket.on('receive_message', handleMessageReceive)
    
  
  
 return()=>{
  socket.off('receive_message',handleMessageReceive);
 }
},[ActiveChatId,APi,Dispatch, socket, id])


  return (
    <div className='flex  z-100  backdrop-blur-sm w-full fixed top-0 left-0 items-center px-5  bg-white/30 justify-between h-[90px]'>
      <img src="https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/out.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL291dC5wbmciLCJpYXQiOjE3NjcwMTc3NDUsImV4cCI6MTc5ODU1Mzc0NX0.kiAbVZpu9DvN_7CjBQocDC0vDSv7YCR9lRvY4nnBYnU" alt=""   className='w-[102px] max-smallmobile:hidden h-[42px]'/>
       <nav className='flex items-center  max-[300px]:gap-1  gap-10'>
       
        <div  className='relative '>
              <img onClick={()=>{
          setSearchControl((pre)=>!pre);
      }} src="https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/magnifying-glass-solid-full.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL21hZ25pZnlpbmctZ2xhc3Mtc29saWQtZnVsbC5zdmciLCJpYXQiOjE3NjcwMTc2NDgsImV4cCI6MTc5ODU1MzY0OH0.eFjIwqRH8BEl4Wj8fEH6VFFRY7JdxlJl8kvkUTBOWD0" alt="" className='w-8 cursor-pointer h-8' />
            { searchControl &&( <div className='absolute   search:w-100  top-10 md:-left-10'>
              <input type="search" value={searchValue}  onChange={(e)=>{
                 setSearchValue(e.target.value);
              }}   placeholder='Search...' className='pl-4 max-search:w-60   border-none outline-1 outline-blue-600   search:w-100  rounded-md   h-10 bg-white border-1' />
              {childResult?.length>0 && (
                <div className='flex  bg-white max-search:w-60  rounded-b-md px-4 py-4 h-70 overflow-y-auto flex-col gap-4'>
                  {
                 childResult.map((child)=>(


                    <Link to={`/ChildSingle/${child._id}`} key={child._id} className='flex  trantion duration-300 easy-out hover:bg-[#D6E2ED] rounded-md px-2 py-2 cursor-pointer items-center justify-between'>
                    <div className='flex gap-3 items-center'>
                      <img src={child.Childfile[0].mediaurl} alt="" className='w-15 rounded-full h-15' />
                      <p>{child.childFirstName} {child.childLastName}</p>
                    </div>
                    <div className='flex items-center flex-col'>
                      <p className='font-semibold'>Grade</p>
                    <p className='font-light'>{child.Grade}</p>
                    </div>

                    </Link >
                 )


                 )
                }


              </div>)}
              </div>
              )}
          </div>
          <Link className='max-md:hidden cursor-pointer' to={'/DashbordPage'}>
        
            
             <img src="https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/house-regular-full.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL2hvdXNlLXJlZ3VsYXItZnVsbC5zdmciLCJpYXQiOjE3NjcwMTc0OTQsImV4cCI6MTc5ODU1MzQ5NH0.f-GhVNwPqThqqMDE_ny9j98eNzh_XLLKvANDUnqTLgw" className='w-8 h-8'  alt="" />
         </Link>

         <Link to={"/MessagePage"}   className=' relative cursor-pointer'>
        
           
            <img src="https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/message-regular-full.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL21lc3NhZ2UtcmVndWxhci1mdWxsLnN2ZyIsImlhdCI6MTc2NzAxNzY5MywiZXhwIjoxNzk4NTUzNjkzfQ.hgy6iupgE8vVJb5ljG-vM0Vkg2gmIAT1JZjegSyFp5M" alt="" className='w-8 h-8' />
             <span className="absolute -top-2 -right-1  text-xs font-bold bg-red-600 text-white rounded-full px-1">{countUnreadMessage>0?countUnreadMessage:""}</span>
        </Link>

        {/* <Link to={"/Notification"} className='cursor-pointer'>
        <img src="bell-regular-full.svg" alt="" className='w-8 h-8' />
          
       </Link> */}
        <div className='relative max-md:hidden '>
     
           <img src="https://vhglunlzlgjgdmwsihgc.supabase.co/storage/v1/object/sign/file/square-plus-regular-full.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MTIzOTYyYS04NzVkLTRjODUtYmUxMC04YmQzMjE1ZjA3N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmaWxlL3NxdWFyZS1wbHVzLXJlZ3VsYXItZnVsbC5zdmciLCJpYXQiOjE3NjcwMTkzNjYsImV4cCI6MTc5ODU1NTM2Nn0.b0u7fk3eY_eP8js5c-pymjGeF6P92HpJ0hWGlj-2VUQ" className='max-md:hidden w-8 h-8 cursor-pointer' onClick={()=>{
        SetIsDisplay((pre)=>!pre);
           }}   alt="" />
          
          <div className={` ${isDisplayADd ? "absolute -left-20 rounded-md top-12 px-3 py-5 w-68 bg-white flex flex-col gap-2":"hidden"}`}>
           {
            ListAdd.map((ListAdd)=>(

           
           
            <div key={ListAdd.type} onClick={()=>{
              AddListControl(ListAdd.type)
            }} className={ `${User?.role!=='Admin'? ListAdd.type=="employee" ?"hidden":"flex"  :"flex"   }  px-1 py-3 gap-2 cursor-pointer hover:bg-[#D6E2ED] rounded-lg items-center`}>
                <img src={ListAdd.image} className='w-8 h-8' alt="" />
                <p>{ListAdd.Text}</p>

            </div>
             ))
           }

            

          </div>
            
           </div>
           
       
          

      </nav>
      <div className='flex gap-2 relative items-center cursor-pointer'
        >
          <img src={User?.profile.mediaurl ||  User?.profile} alt=""  className=' w-[50px] h-[50px] rounded-[50%]' />
          <p className='font-bold max-smallmobile:hidden'>{User?`${User.firstName} ${User.lastName}`:"user"}</p>
          <FontAwesomeIcon icon={faChevronDown} 
             onClick={(e)=>{
              e.preventDefault()
            setIsDisplayNavList((pre)=>!pre);
         }} className='text-[20px]'></FontAwesomeIcon>
           <div   className={`${isDisplayNavList ?"absolute max-smallmobile:-left-15 rounded-md smallmobile:left-10 py-3 top-13 bg-white w-40 gap-5 px-1  flex flex-col":"hidden"} `}>
               {NavList.map((list)=>(
               <div key={list.type} 
                  onClick={(e)=>{
                    e.preventDefault();
                   NavListControl(list.type)

                     }}
                 className={`flex md:${list.resposivehidden && ("hidden")} ${list.type=="add" &&("relative")} items-center  rounded-md trantion duration-300 easy-out hover:bg-[#D6E2ED] w-full gap-1  py-2`}> 
                <img src={list.image} alt="" className='w-7 h-7' />
                <p>{list.Text}</p>

               {list.type=="add" &&(

                 <div  onClick={(e)=>{
                                    e.stopPropagation();
                         }} 
                   className={` ${isDisplayADd?"absolute  smallmobile:-left-68 rounded-md max-smallmobile:-left-20 max-smallmobile:top-10 top-5 px-3 py-5 w-68 bg-white flex flex-col gap-2":"hidden"}`}>
                      {
                       ListAdd.map((AddList)=>(

                        
                         <div
                         onClick={(e)=>{
                                    e.stopPropagation();
                                    e.preventDefault();
                                     AddListControl(AddList.type);
                                
                         }}
                          key={AddList.type} 
                          className={`${User?.role!='Admin'? AddList.type=="employee" || AddList.type=="child"?"hidden":"flex"  :"flex"   }    px-1 py-3 gap-2 cursor-pointer hover:bg-[#D6E2ED] rounded-lg items-center`}>
                         <img src={AddList.image} className='w-8 h-8' alt="" />
                         <p>{AddList.Text}</p>

                         </div>
                        
                           ))
                            }

            

                 </div>
                  

                   )}
                  
                   {list.type=='setting' && (

                  <div  onClick={(e)=>{
                                    e.stopPropagation();
                         }} 
                   className={` ${isDisplaySettingControl?"absolute  smallmobile:-left-68 rounded-md max-smallmobile:-left-20 max-smallmobile:top-60 top-25 px-3 py-5 w-68 bg-white flex flex-col gap-2":"hidden"}`}>
                      {
                       ListSetting.map((ListSt)=>(

                        
                         <div
                         onClick={(e)=>{
                                    e.stopPropagation();
                                    e.preventDefault();
                                     settingListControl(ListSt.type);
                                
                         }}
                          key={ListSt.type} 
                          className={`flex   px-1 py-3 gap-2 cursor-pointer hover:bg-[#D6E2ED] rounded-lg items-center`}>
                         <img src={ListSt.image} className='w-8 h-8' alt="" />
                         <p>{ListSt.Text}</p>

                         </div>
                        
                           ))
                            }

            

                 </div>


                   )


                   }
                </div>

                   ))}
            </div>

           

               
      </div>


    </div>
  )
}

export default DashbordNav
