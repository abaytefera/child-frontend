import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import HomePage from './out-of-The-ashe/page/HomePage'
import LoginPage from './out-of-The-ashe/page/LoginPage'
import DashbordPage from './out-of-The-ashe/page/DashbordPage'
import ChildRegisterPage from './out-of-The-ashe/page/ChildRegisterPage'
import EmployeeRegisterPage from './out-of-The-ashe/page/EmployeeRegisterPage'
import CreateTaskPage from './out-of-The-ashe/page/CreateTaskPage'
import ProfilePage from './out-of-The-ashe/page/ProfilePage'
import MessagePage from './out-of-The-ashe/page/MessagePage'
import NotificationPage from './out-of-The-ashe/page/NotificationPage'
import PasswordChangePage from './out-of-The-ashe/page/PasswordChangePage'
import ChildSinglePage from './out-of-The-ashe/page/ChildSinglePage'
import { socket } from './out-of-The-ashe/Component/AuthenticateComponent/SocketIoConfig'
import EmployeeSinglePage from './out-of-The-ashe/page/EmployeeSinglePage'
import { useSelector ,useDispatch} from 'react-redux'
import DashbordNav from './out-of-The-ashe/Component/AuthenticateComponent/DashbordNav'

import { updateOnlineUser } from './out-of-The-ashe/Redux/StateWeb'


const App = () => {
 const {id}=useSelector((state)=>state.auth)
 const Dispatch=useDispatch()
  useEffect(()=>{

if(id){

  socket.emit('join',id);
  socket.on('onlineUser',(user)=>{
     Dispatch(updateOnlineUser(user));
  })
}

return()=>{
  socket.off('disconnect')
}

  },[id])

  return (
    <div>
      <Router>
<Routes>

<Route path='/' Component={HomePage}></Route>
<Route path='/loginpage' Component={LoginPage}></Route>
<Route path='/DashboardPage' Component={DashbordPage} />
<Route path='/Createtask' Component={CreateTaskPage}></Route>
<Route path='/EmployeerRgister' Component={EmployeeRegisterPage}></Route>
<Route path='/ChildRegister' Component={ChildRegisterPage}></Route>
<Route path='/ProfilePage' Component={ProfilePage}></Route>
<Route path='/MessagePage' Component={MessagePage}></Route>
<Route path='/Notification' Component={NotificationPage}></Route>
<Route path='/PasswordChange' Component={PasswordChangePage}></Route>
<Route path='/ChildSingle/:id' Component={ChildSinglePage}></Route>
<Route path='/EmployeeSingle/:id' Component={EmployeeSinglePage}></Route>



</Routes>


      </Router>
    </div>
  )
}

export default App
