import {
  faArrowLeft,
  faClock,
  faFile,
  faMicrophone,
  faPhone,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { useSelector,useDispatch} from "react-redux";
import { useGetMessageByIdQuery ,useGetConversionByIdQuery} from "../../Redux/message";
import { useGetEmployeeByIdQuery } from "../../Redux/Employee";
import { UpdateChatId } from "../../Redux/StateWeb";
import { socket } from "./SocketIoConfig";
import { APi } from "../../Redux/CenteralAPI";


const Message = () => {
  const [chat, setChat] = useState(false);
  const isWide = useMediaQuery({ query: "(min-width: 900px)" });

  const [ChatList,setChatList]=useState([]);
  

  const [messageText,setMessageText,]=useState('')
  const [isloading,setIsLoading]=useState(false)
  const [isLoadingMessage,setIsLoadingMessage]=useState(false);
 const [flage,seFlage]=useState(false)
 const {ActiveChatId}=useSelector((state)=>state.webState);
 const {id}=useSelector((state)=>state.auth);
 const [messageCollection,setMessageCollection]=useState([]);
 const [coversionCollection,setConversionCollection]=useState([])
 const container=useRef(null);

const Dispatch=useDispatch()
   const{data:EmployeeData,isLoading:EmployeeDataIsLoading,}=useGetEmployeeByIdQuery(ActiveChatId,{
  skip:!ActiveChatId
 })
 const {data:MessageData,isLoading:MessageDataIsLoading}=useGetMessageByIdQuery({id:ActiveChatId,myId:id},{
  skip:!ActiveChatId || !id
 });
   const {data:ConversionData,isLoading:conversionIsLoading}=useGetConversionByIdQuery(id);


useEffect(()=>{
setMessageCollection(MessageData);



},[MessageData])
useEffect(()=>{
if(!ConversionData) return
setConversionCollection(ConversionData);


},[ConversionData])


const lastMessageRef=useRef(null)

const formatChatTime=(timeStamp)=>{
 
if(!timeStamp) return
const date=new Date(timeStamp)
const now=new Date();
const isToday= date.toDateString()===now.toDateString();
const yesterday= new Date();
yesterday.setDate(now.getDate() - 1);
const isYesterday = date.toDateString() === yesterday.toDateString();
const dayDiff=Math.floor((now - date) / (1000 * 60 * 60 * 24));

if(isToday){

return date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})


}
else if(isYesterday){

  return 'yesterday'


}
else if(dayDiff<7){
return date.toLocaleDateString([],{weekday:'short'})

}else{

  return date.toLocaleDateString([],{month:'numeric',day:'numeric',year:'numeric'})
}

}


  
useEffect(()=>{

   const handleMarkAsRead=(data)=>{
    console.log('it to be read');
  Dispatch(APi.util.invalidateTags([{type:"unreadMessage",id:"unread"},{type:"conversion",id:"coversionId"},{type:"Message",id:"messageId"}]))



   }
socket.on('succfuly_mark_as_read',handleMarkAsRead)

return()=>{
  socket.off('succfuly_mark_as_read',handleMarkAsRead)
}
},[Dispatch,ActiveChatId,socket,APi])


useEffect(()=>{

   const bothhandleMarkAsRead=(data)=>{
    console.log('it to be read');
  Dispatch(APi.util.invalidateTags([{type:"unreadMessage",id:"unread"},{type:"conversion",id:"coversionId"},{type:"Message",id:"messageId"}]))



   }
socket.on('both_succfuly_mark_as_read',bothhandleMarkAsRead)

return()=>{
  socket.off('both_succfuly_mark_as_read',bothhandleMarkAsRead)
}
},[Dispatch,socket,APi])



const sendHandler=async(e)=>{
 e.preventDefault();
try{
console.log(messageText)
const msg={
senderId:id,
receiverId:ActiveChatId,
text:messageText,

}



setMessageCollection((pre)=>[...pre,msg]);

socket.emit("send_message",msg);


setMessageText('');




}catch(err){
console.log('error occure');
console.log(err.message);




}



}

useEffect(()=>{

  const handleSuccfully=(msg)=>{
   console.log('update succful ent');
Dispatch( APi.util.invalidateTags([{type:"conversion",id:"coversionId"},{type:"Message",id:"messageId"}]))


}
socket.on("sussfully_send_message",handleSuccfully)
return()=>{
  socket.off("sussfully_send_message",handleSuccfully)
}

},[])



const handleOpenMessage=(otherId)=>{

     console.log("Handle open Message");
       socket.emit('mark_as_read',({id:id,otherId:otherId}));

       Dispatch(UpdateChatId(otherId));
  
  ;
}
useEffect(()=>{
 lastMessageRef?.current?.scrollIntoView({
      
  block: "nearest",
        })

},[ActiveChatId,messageCollection])


if(isloading) return <div className="flex flex-col  h-screen items-center justify-center "><div className="h-10 w-10 border-4  border-sky-500 rounded-full border-t-transparent animate-spin"></div></div>
  return (
    <div
      className={` flex w-full pt-5  h-screen overflow-auto  md:px-10 ${!isWide ?"pb-40":"pb-30"}`}
    >
      {/* Sidebar - Chat List */}
      <div
        className={`${
          isWide || !ActiveChatId ? "flex" : "hidden"
        } flex-col w-full  ${!isWide ? "":"max-w-[300px]"}  relative -top-10  shadow-sm  min-h-0 overflow-hidden`}
      >
        <h2 className="text-2xl font-bold px-4 pt-4 pb-2">Messages</h2>

        {/* Search Bar */}
        <div className="mx-4 mb-3 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-3 py-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="search"
            className={`bg-transparent flex-1 outline-none `}
            placeholder="Search..."
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto  space-y-4 px-4 pb-4 min-h-0">
          {(coversionCollection??[]).slice().sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt)).map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-2 rounded   cursor-pointer`}
              onClick={(e)=>{
             handleOpenMessage(item.otherUserData._id)
                
         
              
              }
              }
            >
              <div className="flex items-center gap-3">
                <img
                  src={item?.otherUserData.profile.mediaurl || item?.otherUserData.profile}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="profile"
                />
                <div>
                  <h3 className="font-semibold text-sm">{item?.otherUserData?.firstName} {item?.otherUserData?.lastName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item?.lastMessage?.substring(0,15)} {item?.lastMessage?.length>20 && ("...") }
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
 <span className={`px-2 ${item.unreadCount[id]>0 && item.otherUserData._id!==ActiveChatId ? "flex":"hidden"} py-0.5  font-bold  items-center justify-center text-xs rounded-full bg-sky-400 text-white`}>
  {item?.unreadCount[id]}
</span>
<span className="text-xs text-gray-400">
  {   formatChatTime(item?.updatedAt)}

</span>

</div>

            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      {
         EmployeeDataIsLoading &&(

 <div className="flex flex-col w-full   h-screen items-center justify-center "><div className="h-10 w-10 border-4  border-sky-500 rounded-full border-t-transparent animate-spin"></div></div>

        )}
      

 


{ ActiveChatId && !EmployeeDataIsLoading && EmployeeData  ?(
  
  <div
        className={`flex flex-col flex-1 min-h-0 overflow-hidden ${
          ActiveChatId || isWide ? "flex" : "hidden"
        } `}
      >
        {/* Mobile back arrow */}
        {!isWide && (
          <span
            className="p-4 block md:hidde cursor-pointer"
            onClick={() => Dispatch(UpdateChatId(null))}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        )}

        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 shadow-md dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={EmployeeData?.profile.mediaurl || EmployeeData?.profile
}
              className="w-10 h-10 rounded-full object-cover"
              alt="profile"
            />
            <div>
              <h1 className="font-bold">{EmployeeData?.firstName} {EmployeeData?.lastName}</h1>
              <p className="text-green-400 text-sm">Online</p>
            </div>
          </div>
          <div className="flex gap-4 text-xl">
            <FontAwesomeIcon
              icon={faVideo}
              className="text-pink-600 cursor-pointer"
              title="Video Call"
            />
            <FontAwesomeIcon
              icon={faPhone}
              className="text-green-600 cursor-pointer"
              title="Voice Call"
            />
          </div>
        </div>

        {/* Messages */}
        <div  ref={container}   className="flex-1 flex   flex-col overflow-y-auto   px-4 py-4 space-y-4 " >
          {(messageCollection ?? []).map((msg, index) => (
            <div 
       
              key={index}
              className={`flex px-2 space-x-10 space-y-0 m-w-10 py-2 rounded-xl ${ msg.senderId ===id ? "bg-gray-400 text-white":"bg-sky-500 text-white"} flex-col max-w-[60%] ${
                msg.senderId ===id ?"self-end items-end" : "self-start"
              }`}
            >
              {msg?.profile && (
                <img
                  src={msg?.profile || "https://zkjgdrtmexmdmqvstwuz.supabase.co/storage/v1/object/public/my-file/proman.webp" }
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
            
              <div className={` `}>
                {msg.text}
              </div>
              <span className={`self-end justify-self-center text-[10px]`}>  {msg.createdAt ?formatChatTime(msg.createdAt):<FontAwesomeIcon className="text-lg" icon={faClock}></FontAwesomeIcon>}</span>
             
            </div>
          ))}
          <div ref={lastMessageRef}></div>
        </div>

        {/* Message Input */}
        <div
          className={`w-full flex items-end gap-4 px-4 py-3 `}
        >
          <div className="text-xl text-gray-700 dark:text-white flex gap-3">
            <FontAwesomeIcon icon={faFile} className="cursor-pointer" />
            <FontAwesomeIcon icon={faMicrophone} className="cursor-pointer" />
          </div>
          <textarea
            rows={1}
            placeholder="Type a message..."
            className={`flex-1 resize-none rounded px-4 py-2 max-h-[150px] outline-none "bg-gray-800 text-white" : "bg-white"
            }`}
            onInput={(e) => {
            setMessageText(e.target.value)
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            value={messageText}
          />
          <button  onClick={sendHandler} className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded">
            Send
          </button>
        </div>

      </div>
): (
  <div className="h-100 max-sm:hidden flex  w-full justify-center items-center">
<p>Select a chat to start messaging</p>

  </div>)
}

 
       

    
        
     
    </div>
  );
};

export default Message;
