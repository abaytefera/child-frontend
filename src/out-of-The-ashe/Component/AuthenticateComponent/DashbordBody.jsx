import React, { useEffect } from 'react'
import { useGetChildsQuery } from '../../Redux/Childes'
import { useGetEmployeesQuery } from '../../Redux/Employee'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserQuery } from '../../Redux/User'
const DashbordBody = () => {
  let notificaton=[
    {
    titile:"assign new task for you"
  },
  {
    titile:"review 2 day task"
  }
] 
 const navigate=useNavigate();
const{data:childData}=useGetChildsQuery()

const {data:EmployeeData}=useGetEmployeesQuery()
console.log("test");
console.log(EmployeeData);
  const {id,isAuthenticate, isloading,error,token} =useSelector((state)=>state.auth);
  console.log("id");
  console.log(id);
const {data:User}=useGetUserQuery(id);


let ChildData=[
           {
            image:"https://res.cloudinary.com/dkzvlqjp9/image/upload/v1767960855/undraw_children_e6ln_1_chhsdf.svg",
            textChild:"All Child",
            NumChild:childData ?childData[2].totalChild :0

          },
            {
            image:"https://res.cloudinary.com/dkzvlqjp9/image/upload/v1767960854/undraw_young-man-avatar_wgbd_1_mmwgvi.svg",
            textChild:"Boys",
            NumChild:childData?childData[0].male:0

            
          },
          {
            image:"https://res.cloudinary.com/dkzvlqjp9/image/upload/v1767960854/undraw_cool-girl-avatar_fifz_1_jv9ulx.svg",
            textChild:"grils",
            NumChild:childData?childData[1].female:0

          }


           ]
   let EmployeeList=[
             {profile:"undraw_young-man-avatar_wgbd.svg",
              fullName:"Tigst Bereket",
              role:'social worker'

              },
               {profile:"undraw_young-man-avatar_wgbd.svg",
              fullName:"Asnakeck legesse",
              role:'Accountant'

              },
               {profile:"undraw_young-man-avatar_wgbd.svg",
              fullName:"Bereket mitike",
              role:'Admin'

              },
              {profile:"undraw_young-man-avatar_wgbd.svg",
              fullName:"Tigst berekt",
              role:'social worker'

              }


              ]
            
              
          
  return (
    <div className='w-full max-md:py-10 max-md:gap-20 md:grid md:grid-rows-[70px_250px_1fr] overflow-x-hidden md:gap-y-10 md:grid-cols-[1fr_1fr_300px] flex flex-col   min-h-screen'>

    <div className='flex self-center  col-span-2 md:justify-self-start md:ml-30  items-center gap-3'>
       <p className='text-[45px] koulen-regular text-[#0B18D0]'>welcome</p> 
       <p className='text-[30px] mb-2 krub-semibold'>{User?`${User.firstName} ${User.lastName}`:"user"}</p>
    </div>

    <div className='flex max-md:hidden invisible  max-md:ml-55 mid-screen:right-50 relative  gap-3 mt-20 self-start row-span-3  bg-[#E0B1B1] rounded-md px-1 flex-col h-auto  w-58 max-w-58'>
      <h1 className='text-[30px]  text-[#FF1919] joan-regular self-center'>recent notificaton</h1>
      
       <div className='flex flex-col gap-2'>
         {
          notificaton.map((nt,index)=>(
           
            <p key={index} className='cursor-pointer'>{nt.titile}</p>
          ))

         }
 
       </div> 
      
       
       
       
    </div>

       <div className='flex md:col-start-1 mid-screen:right-40  mid-screen:relative   max-md:w-[90%] md:w-118 md:justify-self-end md:col-end-3 md:mr-20  relative px-5 max-md:self-center items-center bg-white/40 rounded-[15px] justify-between min-h-55'>
         {ChildData.map((Child)=>(
              
           <div key={Child.textChild} className=' flex flex-col items-center '>
             <h1 className='text-5 font-medium'>{Child.textChild}</h1>
              <p>{Child.NumChild}</p>
              <img src={Child.image}  className='w-12 h-12'/>
           </div>

         ))

         }
    </div>


    <div className='flex bg-[#A6AE9E] md:ml-20 rounded-md  px-3 gap-5 flex-col self-center max-md:w-[90%] md:w-90 py-3'>
      <h1 className='self-center font-bold text-[20px] text-[#103DE1]'>Employee</h1>
      {
     (EmployeeData??[]).map((EmpList,index)=>{
         if(EmpList._id!==id){
          return(
             <Link to={`/EmployeeSingle/${EmpList._id}`} key={index} className='flex w-full px-1 cursor-pointer transtion duration-300 easy-out hover:bg-white rounded-md justify-between items-center'>
              <img src={EmpList.profile.mediaurl
 || EmpList.profile} alt="" className='w-15 rounded-full h-15' />
              <div className='flex flex-col'>
              <h1 className='font-bold'>{EmpList.firstName} {EmpList.lastName}</h1>
               <p className='font-light'>{EmpList.role}</p>

              </div>
              <button className=' cursor-pointer px-2 py-2 bg-[#103DE1] rounded-md  text-white '>View</button>


             </Link>
          )

         }


})
        


      }
       

    </div>
    </div>
  )
}

export default DashbordBody
