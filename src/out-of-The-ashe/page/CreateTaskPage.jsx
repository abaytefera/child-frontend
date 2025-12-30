import React from 'react'
import DashbordNav from '../Component/AuthenticateComponent/DashbordNav'
import FooterComponent from '../Component/FooterComponent'
import CreateTask from '../Component/AuthenticateComponent/CreateTask'
const CreateTaskPage = () => {
  
  return (
    <div className='w-full overflow-x-hidden relative min-h-screen flex flex-col  bg-[#D6E2ED] gap-[10px]   pt-30'>
        <DashbordNav></DashbordNav>

      <CreateTask></CreateTask>

        <FooterComponent></FooterComponent>
      
    </div>
  )
}

export default CreateTaskPage
