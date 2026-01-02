import React, { useEffect } from 'react'
import DashbordNav from '../Component/AuthenticateComponent/DashbordNav'
import FooterComponent from '../Component/FooterComponent'
import DashbordBody from '../Component/AuthenticateComponent/DashbordBody'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../Redux/User'
import { useGetChildsQuery } from '../Redux/Childes'
import { useGetEmployeesQuery } from '../Redux/Employee'
const Spinner = () => (
  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
);
const DashbordPage = () => {
  const {id,isAuthenticate}=useSelector((state)=>state.auth);
  const navigate=useNavigate()
    const {data:User,isLoading:UserDataLoading}=useGetUserQuery(id);
  
  const{data:childData,isLoading:ChildDataLoading}=useGetChildsQuery()
  
  const {data:EmployeeData,isLoading:EmployeeDataIsLoading}=useGetEmployeesQuery()
  useEffect(()=>{


    if(!isAuthenticate){
 
      navigate('/loginpage');

    }
  },[isAuthenticate])
  useEffect(()=>{

    window.scrollTo(0,0)

  },[])
  const isloading=UserDataLoading || ChildDataLoading || EmployeeDataIsLoading

if(isloading){


      return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )}
  return (
    <div className='w-full pt-25 gap-10 flex flex-col bg-[#D6E2ED]  min-h-screen'>
      <DashbordNav></DashbordNav>

     <DashbordBody></DashbordBody>

     <FooterComponent></FooterComponent>

    </div>
  )
}

export default DashbordPage

