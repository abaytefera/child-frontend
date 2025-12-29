import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useGetEmployeeByIdQuery } from "../../Redux/Employee";
import { useDispatch } from "react-redux";
import { UpdateChatId } from "../../Redux/StateWeb";

function EmployeeProfile() {
   const { id } = useParams();  // employee id from url
   const [employeestore, setEmployee] = useState(null);
   const [activeChatId, setActiveChatId] = useState(null);
   const Dispatch=useDispatch();

  const {data:EmployeeData,isLoading}= useGetEmployeeByIdQuery(id);
  console.log('loading');
  console.log(isLoading)




  const navigate=useNavigate()
 



  const startChat = async () => {
     Dispatch(UpdateChatId(id));
     navigate('/MessagePage');



};
;
if(isLoading){

  return   <div className="flex  z-300 top-0 left-0 bg-black/40 w-full  items-center flex-col  h-screen">
      <div className="w-10 border border-6 h-10 mt-50 fixed border-t-transparent border-white rounded-full animate-spin"></div>
<p className="mt-60 fixed text-xl font-bold text-white  ">loading...</p>
    </div>
    
}

  return (
    <div className="  flex min-h-screen   flex-col gap-20 px-10   justify-start">
     <div className="flex  flex-col gap-10 self-center  items-center">
         <img src={EmployeeData?.profile.mediaurl || EmployeeData?.profile
} alt={EmployeeData?.firstname} className="w-37  h-37 rounded-full rounded-[50%] object-cover"  />
      <div className="space-y-4" >
        <h1 className="text-lg text-gray-700 font-bold capitalize">{EmployeeData?.firstName} {EmployeeData?.lastName}</h1>
      <p><strong>Role:</strong> {EmployeeData?.role}</p>
      </div>

      </div>
     <div className="flex  max-md:self-center md:pl-35  max-md:flex-col gap-4 justify-around"> 
      <p><strong>Education:</strong> {EmployeeData?.educationBackground}</p>
      <p className=""><strong>Phone:</strong> {EmployeeData?.phone}</p>
      <p><strong>Email:</strong> {EmployeeData?.email}</p>
</div>
      <button onClick={startChat} className="bg-blue-500 hover:bg-blue-800 transtion-color duration-300 easy-out cursor-pointer text-white text-lg rounded-md px-3 py-3 self-center" >Message</button>

     
    </div>
  );
}

export default EmployeeProfile;
