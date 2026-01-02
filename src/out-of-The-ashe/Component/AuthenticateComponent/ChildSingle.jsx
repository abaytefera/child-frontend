import {
  faCancel,
  faCircleArrowLeft,
  faCircleArrowRight,
  faDeleteLeft,
  faDownload,
  faEllipsis,
  faEllipsisV,
  faIcons,
  faSearch,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useForm,useFieldArray ,useWatch, set} from "react-hook-form";
import { useGetChildByIDQuery,useCreateChildOtherFileMutation,useUpdateChildMutation } from "../../Redux/Childes";
import { toast,ToastContainer } from "react-toastify";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useDeleteFileMutation ,useUploadProfileMutation} from "../../Redux/Childes";
import { useDispatch } from "react-redux";
import { APi } from "../../Redux/CenteralAPI";



const Spinner = () => (
  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
);

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
);

const LabelInput = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm ml-2 text-gray-700 font-semibold mb-1">{label}</label>
    <input
      {...props}
      className="h-10 rounded-md px-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50 text-gray-800"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm ml-2 text-gray-700 font-semibold mb-1">{label}</label>
    <textarea
      {...props}
      className="w-full resize-none overflow-hidden  rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50 text-gray-800"
    />
  </div>
);

const ImageSlider = ({type,uploadProfileLoading,images, ProfileControle,file,setFiles,handleUpload ,isProfileControlDisplay,setIsProfileControlDisplay,currentIndex, onPrev, onNext, showFull, handleImageIcon,isLoadingDeleteFile,toggleShow }) => {

if(!images || images.length===0) return null

  
 return (<div className={`relative md:py-2  px-3 md:px-2  flex  items-center  ${showFull ? "absolute inset-0 bg-black/60 z-50" : ""}`}>
    <FontAwesomeIcon
      icon={faCircleArrowLeft}
      className={`text-3xl max-[300px]:text-xl  ${showFull ? "":""} ${currentIndex === 0 ? "text-gray-400 cursor-not-allowed" : "cursor-pointer text-black"}`}
      onClick={onPrev}
    />
    <div className="w-full flex gap-2 cursor-pointer">
    <div className="relative">  
    <img
      src={images?.[currentIndex]?.mediaurl}
      alt="preview"
      onClick={toggleShow}
      className={`object-contain rounded-xl ${showFull ? "w-3/4 h-auto z-500 " : "w-24 h-24 md:w-40 md:h-40"}`}
    />
   {isLoadingDeleteFile && (<div className="flex  absolute z-300 top-0 left-0 bg-black/40 w-full items-center  flex-col  h-full">
      <div className="w-10 border border-6 h-10 mt-10  fixed border-t-transparent border-white rounded-full animate-spin"></div>
<p className="fixed mt-20 text-xl font-bold text-white  ">loading...</p>
    </div>)}
    
    </div>   
    <div>
      <input type="file" className="hidden" id="ProfileUpload" accept="image/"  onChange={(e)=>{

        setFiles(e.target.files[0]);
        console.log('change file');
        setIsProfileControlDisplay(false);
      

      }}/>
      
       {file &&(
               <div className=" bg-black/40 flex rounded-md left-0  items-center justify-center  w-full h-screen  flex-col gap-10  z-200 px-10 py-2 top-0 fixed ">
            <img src={URL.createObjectURL(file)} alt="" className="w-full h-100" />
            {uploadProfileLoading &&(
 <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/40">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-bold text-white">Updating...</p>
        </div>


            )}
            <div className="flex gap-20">
      <button className="px-2 py-2 rounded-md bg-black/50" onClick={(e)=>{
          e.preventDefault()
       setFiles(null)
       
        
      }}>Cancel</button>
       <button className="px-3 hover:bg-blue-800 transtion-color hover:text-white duration-300 easy-out cursor-pointer py-2 rounded-md bg-blue-400" onClick={(e)=>{
         e.preventDefault()
         console.log('chikd it is child');
       handleUpload(file,type);
        setFiles(null)
      }}>Save</button>

            </div>
            </div>
       )}
        
    </div>
    <div className="relative">
      <FontAwesomeIcon  onClick={(e)=>{
         e.preventDefault();
         setIsProfileControlDisplay((pre)=>!pre);
      }} className={`text-xl ${showFull ?"text-white":"text-black" }`} icon={faEllipsis}></FontAwesomeIcon>
     {isProfileControlDisplay && ( 
      <div className="bg-white absolute z-100 left-0 top-5 px-2 py-2 rounded-md">
      {
        ProfileControle.map((Control)=>(
      <div  key={Control.id} onClick={()=>{
      handleImageIcon(images?.[currentIndex].mediaurl,images?.[currentIndex].public_id,Control.type,type);
    }} className="flex  px-2 py-2  hover:bg-[#D6E2ED]  rounded-md items-center gap-2">
        <FontAwesomeIcon icon={Control.icon}></FontAwesomeIcon>
        <p>{Control.text}</p>
      </div>

        ))


      }

      </div>)
    }
    
    </div>
   
    </div>
 
    <FontAwesomeIcon
      icon={faCircleArrowRight}
      className={`text-3xl max-[300px]:text-xl relative  ${showFull ?"sm:-left-30  max-sm:-left-10 xl:-left-55" :"-left-10 max-[300px]:left-0"} ${currentIndex >= images.length - 1 ? "text-gray-400 cursor-not-allowed" : "cursor-pointer text-black"}`}
      onClick={onNext}
    />
    {showFull && (
      <FontAwesomeIcon
        icon={faTimes}
        className="absolute  top-4 right-4 text-white text-2xl cursor-pointer hover:text-red-500"
        onClick={toggleShow}
      />
    )}
  </div>)
};




const  MyProfileImage = ({type, uploadProfileLoading,images, ProfileControle,file,setFiles,handleUploadParentFile ,isProfileControlDisplay,setIsProfileControlDisplay,currentIndex, onPrev, onNext, showFull,  handleImageIconParent,isLoadingDeleteFile,toggleShow }) => {

if(!images || images.length===0) return null

  
 return (<div className={`relative md:py-2  px-3 md:px-2  flex  items-center  ${showFull ? "absolute inset-0 bg-black/60 z-50" : ""}`}>
    <FontAwesomeIcon
      icon={faCircleArrowLeft}
      className={`text-3xl max-[300px]:text-xl  ${showFull ? "":""} ${currentIndex === 0 ? "text-gray-400 cursor-not-allowed" : "cursor-pointer text-black"}`}
      onClick={onPrev}
    />
    <div className="w-full flex gap-2 cursor-pointer">
    <div className="relative">  
    <img
      src={images?.[currentIndex]?.mediaurl}
      alt="preview"
      onClick={toggleShow}
      className={`object-contain rounded-xl ${showFull ? "w-3/4 h-auto z-500 " : "w-24 h-24 md:w-40 md:h-40"}`}
    />
   {isLoadingDeleteFile && (<div className="flex  absolute z-300 top-0 left-0 bg-black/40 w-full items-center  flex-col  h-full">
      <div className="w-10 border border-6 h-10 mt-10  fixed border-t-transparent border-white rounded-full animate-spin"></div>
<p className="fixed mt-20 text-xl font-bold text-white  ">loading...</p>
    </div>)}
    
    </div>   
    <div>
      <input type="file" className="hidden" id="ProfileUploadParent" accept="image/"  onChange={(e)=>{

        setFiles(e.target.files[0]);
        console.log('change file');
        setIsProfileControlDisplay(false);
      

      }}/>
      
       {file &&(
               <div className=" bg-black/40 flex rounded-md left-0  items-center justify-center  w-full h-screen  flex-col gap-10  z-200 px-10 py-2 top-0 fixed ">
            <img src={URL.createObjectURL(file)} alt="" className="w-full h-100" />
                        {uploadProfileLoading &&(
 <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/40">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-bold text-white">Updating...</p>
        </div>


            )}
            <div className="flex gap-20">
      <button className="px-2 py-2 rounded-md bg-black/50" onClick={(e)=>{
          e.preventDefault()
      
       
        
      }}>Cancel</button>
       <button className="px-3 hover:bg-blue-800 transtion-color hover:text-white duration-300 easy-out cursor-pointer py-2 rounded-md bg-blue-400" onClick={(e)=>{
         e.preventDefault()

      handleUploadParentFile(file,'parent');
       setFiles(null)
      }}>Save</button>

            </div>
            </div>
       )}
        
    </div>
    <div className="relative">
      <FontAwesomeIcon  onClick={(e)=>{
         e.preventDefault();
         setIsProfileControlDisplay((pre)=>!pre);
      }} className={`text-xl ${showFull ?"text-white":"text-black" }`} icon={faEllipsis}></FontAwesomeIcon>
     {isProfileControlDisplay && ( 
      <div className="bg-white absolute z-100 left-0 top-5 px-2 py-2 rounded-md">
      {
        ProfileControle.map((Control)=>(
      <div  key={Control.id} onClick={()=>{
      handleImageIconParent(images?.[currentIndex].mediaurl,images?.[currentIndex].public_id,Control.type,type);
    }} className="flex  px-2 py-2  hover:bg-[#D6E2ED]  rounded-md items-center gap-2">
        <FontAwesomeIcon icon={Control.icon}></FontAwesomeIcon>
        <p>{Control.text}</p>
      </div>

        ))


      }

      </div>)
    }
    
    </div>
   
    </div>
 
    <FontAwesomeIcon
      icon={faCircleArrowRight}
      className={`text-3xl max-[300px]:text-xl relative  ${showFull ?"sm:-left-170  max-sm:-left-200 xl:-left-55" :"-left-10 max-[300px]:left-0"} ${currentIndex >= images.length - 1 ? "text-gray-400 cursor-not-allowed" : "cursor-pointer text-black"}`}
      onClick={onNext}
    />
    {showFull && (
      <FontAwesomeIcon
        icon={faTimes}
        className="absolute  top-4 right-4 text-white text-2xl cursor-pointer hover:text-red-500"
        onClick={toggleShow}
      />
    )}
  </div>)
};

const ChildSingle= () => {
  
  const [childInfo, setChildInfo] = useState({});
  const [trueChildInfo, setTrueChildInfo] = useState({});
  const [editMode, setEditMode] = useState({ child: true, parent: true });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState({ child: false, parent: false });
  const [imageIndex, setImageIndex] = useState({ child: 0, parent: 0 });
  const [showImage, setShowImage] = useState({ child: false, parent: false });
  const [showFirstForm,setShowFirstForm]=useState(false);
  const [storePreviewImage,setPreviewImage]=useState({});
  const [FileUpload,setFileUpload]=useState({normalFile:[],tempFile:[]});
  const [isProfileControlDisplay,setIsProfileControlDisplay]=useState(false);
  const [isParentProfileControlDispaly,setParentControlDisplay]=useState(false)
  const [otherData,setotherData]=useState([])
  const Submitform=useRef(null);
  const Selectvalue=useRef(null)
  const [years, setYears]=useState([])
  const [fileChild,setFilesChild]=useState(null)
const [fileParent,setFilesParent]=useState(null)
  const {register,reset,setValue,handleSubmit,formState:{errors}}=useForm({
  
    })
  const ChildTextRef=useRef(null);
  const ParentTextRef=useRef(null);
  const {id}=useParams();
  const {data:childSingle,isLoading:firstDataLoading}=useGetChildByIDQuery(id);
  const [updateChild,{isLoading:Childupdating}]=useUpdateChildMutation()
  const [createChildOtherFile,{isLoading:isLoadingChildOtherFile
                             ,isSuccess:isSuccessChildOtherFile,
                               isError:isErrorChildOtherFile,error:errorChildOtherFile}]=useCreateChildOtherFileMutation()
   
const [deleteFile,{data:deleteResponse,isLoading:isLoadingDeleteFile,isSuccess:SuccfulyFileDelete}]=useDeleteFileMutation()
const [UploadProfile,{data:DataUploadProfile,isLoading:uploadProfileLoading,isSuccess:UploadProfileSuccfuly,isError:IsErrorUploadProfile,error:UploadError}]=useUploadProfileMutation()
const Dispatch=useDispatch()
useEffect(()=>{

setChildInfo(childSingle);

},[childSingle])
useEffect(()=>{
if(!childInfo?.otherChildData) return
setotherData(childInfo?.otherChildData)
setYears(Array.from(
new Set(childInfo?.otherChildData?.map((data)=>{
  return new Date(data.timeStamp).getFullYear()
})
)))



},[childInfo])



useEffect(()=>{
if(isSuccessChildOtherFile){
  console.log("succfuly store child other data");
 toast.success("succfuly add Data")

setShowFirstForm(false);
reset();
setFileUpload((pre)=>({...pre,normalFile:[],tempFile:[]}));
 return

}
if(isErrorChildOtherFile){
  toast.error(errorChildOtherFile)
return 

}
if(SuccfulyFileDelete){
  console.log('succfully');
  toast.success('Delete profile succfully');
Dispatch(APi.util.invalidateTags([{type:'ChildSearchById',id:'searchResult'}]));

 

 return


}



},[isSuccessChildOtherFile,isErrorChildOtherFile,SuccfulyFileDelete])


useEffect(()=>{

if(SuccfulyFileDelete){
  console.log('succfully');
  toast.success('Delete profile succfully');
Dispatch(APi.util.invalidateTags([{type:'ChildSearchById',id:'searchResult'}]));

 

 return


}


},[SuccfulyFileDelete])

useEffect(()=>{
if(UploadProfileSuccfuly){
toast.success('upload profile succfully');

 Dispatch(APi.util.invalidateTags([{type:'ChildSearchById',id:'searchResult'}]));
 return

}


},[UploadProfileSuccfuly])

 const ProfileControle=[
         {
          icon:faUpload,
          type:'upload',
          text:'upload',
          id:0
            },
        
          {
          icon:faDownload,
          type:'download',
          text:'Download',
          id:1
           },
            {
          icon:faDeleteLeft,
          type:'delet',
          text:'Delete',
          id:2

          },


 ]

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  
  console.log(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
 
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};


  const childInputRef = useRef(null);
const [profileUploadFile,setProfileUploadFile]=useState([]);

  const handleImageIcon=async(imageUrl,public_id,type,selectionType)=>{
    try{
       const inputFile=document.getElementById('ProfileUpload');
      if(type==="download"){
console.log(imageUrl);
     const response=await fetch(imageUrl);
const blob=await response.blob();
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download="downloadFiel";
a.click();
URL.revokeObjectURL(url);
return
      }
if(type==="delet"){
console.log('go in delete')
await deleteFile({public_id,id,selectionType}).unwrap();
return
}
if(type="upload"){

inputFile.click()

}
 


    }catch(error){
      console.log(error.message);
    }

 


  }

  const handleImageIconParent=async(imageUrl,public_id,type,selectionType)=>{
    try{
       const inputFile=document.getElementById('ProfileUploadParent');
     
      if(type==="download"){
console.log(imageUrl);
     const response=await fetch(imageUrl);
const blob=await response.blob();
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download="downloadFiel";
a.click();
URL.revokeObjectURL(url);
return
      }
if(type==="delet"){
console.log('go in delete')
await deleteFile({public_id,id,selectionType}).unwrap();
return
}
if(type="upload"){

inputFile.click()

}
 


    }catch(error){
      console.log(error.message);
    }

 


  }






useEffect(() => {
  if (ChildTextRef?.current) {
    ChildTextRef.current.style.height = "auto";
    ChildTextRef.current.style.height =
      `${ChildTextRef.current.scrollHeight}px`;
  }

  if (ParentTextRef?.current) {
    ParentTextRef.current.style.height = "auto";
    ParentTextRef.current.style.height =
      `${ParentTextRef.current.scrollHeight}px`;
  }
}, [childInfo?.ChildDescription, childInfo?.ParentDescription]);



  const handleChange = (e) => {
    console.log("tailwindcss");
    const { name, value } = e.target;
    setChildInfo((prev) => ({ ...prev, [name]: value }));
  };



  const handleEditToggle = (type, enable) => {
    setEditMode((prev) => ({ ...prev, [type]: !enable }));
    if (!enable && type === "child") {
      setTimeout(() => childInputRef.current?.focus(), 0);
    }
  };



  const handleCancel = (type) => {
    setChildInfo(childSingle);
    setEditMode((prev) => ({ ...prev, [type]: true }));
  };



  const handleSave = async (type) => {
    setSaving((prev) => ({ ...prev, [type]: true }));

    try {

      const updates =
        type === "child"
          ? {
              
              childFirstName: childInfo.childFirstName,
              childLastName: childInfo.childLastName,
              childPhone: childInfo.childPhone,
              childAge: childInfo.childAge,
              childGrandFather: childInfo.childGrandFather,            
              childBirthDay:childInfo.childBirthDay,
              fullName: `${childInfo.childFirstName} ${childInfo.childLastName}`,
              Grade: childInfo.Grade,
              childRegisterDate:childInfo.childRegisterDate,
              ChildDescription: childInfo.ChildDescription,
            }
          : {
              parentFirstName: childInfo.parentFirstName,
              parentLastName: childInfo.parentLastName,
              parentPhone: childInfo.parentPhone,
              parentGrandFather: childInfo.parentGrandFather,
              ParentDescription: childInfo.ParentDescription,
            };

            const updateInfo={data:updates,id:id};
             await updateChild(updateInfo).unwrap();
     
      toast.success(`${type} info updated successfully.`);
      setEditMode((prev) => ({ ...prev, [type]: true }));
    } catch (err) {
      toast.error("Update failed. Try again.");
    } finally {
      setSaving((prev) => ({ ...prev, [type]: false }));
    }
  };

  


const  handleFile=(e)=>{

   console.log("upload message");
  const file=e.target.files[0];
  const currentFile=FileUpload?.tempFile;
 console.log(currentFile);
  
setFileUpload((pre)=>({...pre,tempFile:[...currentFile,file]}));



  }


  const handleStoreFile=(e)=>{
   e.preventDefault();

setFileUpload((pre)=>({...pre,normalFile:[...pre.tempFile,...pre.normalFile],tempFile:[]}));
    
  }



const handleform=async(data)=>{

try{


const Data=new FormData();
data.id=id
Data.append('data',JSON.stringify(data))

FileUpload.normalFile.forEach((file)=>{

  Data.append('otherFile',file);
})


console.log('combine data');

await createChildOtherFile(Data).unwrap()
 


}catch(err){

   console.log(err.message);



}









  

}
const autoResize = (e) => {
  const el = e.target;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};


  const abu=[{title:"abay",description:"selam"}]



const  SearchDataBySearch=(e)=>{
e.preventDefault();

console.log(e.target.value);
console.log(trueChildInfo)

if(e.target.value===""){

  setotherData(childInfo.otherChildData)
  
  return
}else{
setotherData(childInfo.otherChildData.filter((data) => 
  data.title.includes(e.target.value)
))}






}


const handleSearchbyselect=()=>{
  console.log(Number(Selectvalue.current.value.trim())+1)

if(Selectvalue.current.value.trim()==="All data"){
 setotherData(childInfo.otherChildData);

  return
}else{
 setotherData(childInfo.otherChildData.filter((data)=>(


  new Date(data.timeStamp).getFullYear()===Number(Selectvalue.current.value.trim())

  )))

}



}
const handleUpload=async(file,type)=>{
console.log('file');
console.log(file);
console.log('type');
console.log(type);
  if(!file) return
try{
  const Data=new FormData();
   Data.append('data',JSON.stringify({id,type}))
 
Data.append('uploadProfile',file)
await UploadProfile(Data).unwrap
}catch(err){

console.log(err.message);

}


}
const handleUploadParentFile=async(file,type)=>{
 
try{
  const Data=new FormData();
  Data.append('data',JSON.stringify({id,type}))
 
Data.append('uploadProfile',file)
await UploadProfile(Data).unwrap


}catch(err){

  console.log(err.message);
}
}


  if (firstDataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }


  return (

    <div className="p-4 md:p-8  pb-30 md:pb-50 bg-balck   overflow-hidden min-h-screen">
      
    {  (Childupdating || uploadProfileLoading  ||  isLoadingChildOtherFile) &&(   <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/40">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-bold text-white">Updating...</p>
        </div>
    
    )}

    
      <ToastContainer />

      <div className="max-w-6xl mx-auto  rounded-xl shadow-md p-6 space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">


          <ImageSlider
           type={'child'}
            uploadProfileLoading={ uploadProfileLoading}
            images={(childInfo?.Childfile || []).slice().reverse()}
            ProfileControle={ProfileControle}
            file={fileChild}
            setFiles={setFilesChild}
           handleUpload={handleUpload}

            currentIndex={imageIndex.child}
              isProfileControlDisplay={isProfileControlDisplay}
              setIsProfileControlDisplay={setIsProfileControlDisplay}
             
            onPrev={() =>
              setImageIndex((prev) => ({ ...prev, child: Math.max(0, prev.child - 1) }))
            }
            onNext={() =>
              setImageIndex((prev) => ({
                ...prev,
                child: Math.min((childInfo?.Childfile?.length|| 1) - 1, prev.child + 1),
              }))
            }
            showFull={showImage.child}
           handleImageIcon={handleImageIcon}
           isLoadingDeleteFile={isLoadingDeleteFile}
            toggleShow={() => setShowImage((prev) => ({ ...prev, child: !prev.child }))}
          />

       

          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-gray-800 capitalize">
              {childInfo?.childFirstName} {childInfo?.childLastName}
            </h1>
           <p className="text-gray-800  text-sm"><span className="font-bold">Age:</span> {calculateAge(childInfo?.childBirthDay)} years old</p>
            <p className="text-gray-800  text-sm"><span className="font-bold">Grade:</span> {childInfo?.Grade}</p>
          </div>
        </div>

        <div className="space-y-4">
          <SectionTitle title="Child Information" />
          <div className="flex justify-end gap-2">
            {!editMode.child ? (
              <>
                <button
                  className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                  onClick={() => handleCancel("child")}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleSave("child")}
                  disabled={saving.child}
                >
                  {saving.child ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
                onClick={() => handleEditToggle("child", editMode.child)}
              >
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInput
              label="First Name"
              name="childFirstName"
              value={childInfo?.childFirstName || ""}
              disabled={editMode.child}
              onChange={handleChange}
              ref={childInputRef}
            />
            <LabelInput
              label="Last Name"
              name="childLastName"
              value={childInfo?.childLastName || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
            <LabelInput
              label="Phone"
              name="childPhone"
              value={childInfo?.childPhone || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
             <LabelInput
              label="Register Date"
              name="RegisterDate"
              value={childInfo?.childRegisterDatee || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
             <LabelInput
              label="BirthDay"
              name="BirthDay"
              value={childInfo?.childBirthDay || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
            <LabelInput
              label="Grade"
              name="Grade"
              value={childInfo?.Grade || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
            <LabelInput
              label="Grandfather"
              name="childGrandFather"
              value={childInfo?.childGrandFather || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
            <LabelInput
              label="gender"
              name="gender"
              value={childInfo?.gender || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
          </div>

          <Textarea
            label="Description"
            name="ChildDescription"
            value={childInfo?.ChildDescription || ""}
            disabled={editMode.child}
            onChange={handleChange}
            ref={ChildTextRef}

          />
        </div>
  { childInfo?.parentFirstName && (
        <div className="space-y-4">
          <SectionTitle title="Parent Information" />
        {  childInfo?.Parentfile?.length>0 
 &&
 (
 
  

 <MyProfileImage
            type={'parent'}
          uploadProfileLoading={ uploadProfileLoading}
             images={childInfo?.Parentfile || []}
             currentIndex={imageIndex.parent}
               ProfileControle={ProfileControle}
                file={fileParent}
             setFiles={setFilesParent}
          handleUploadParentFile={handleUploadParentFile}
           
            isProfileControlDisplay={ isParentProfileControlDispaly}
              setIsProfileControlDisplay={setParentControlDisplay}
            onPrev={() =>
              setImageIndex((prev) => ({ ...prev, parent: Math.max(0, prev.parent - 1) }))
            }
            onNext={() =>
              setImageIndex((prev) => ({
                ...prev,
                parent: Math.min((childInfo?.Parentfile?.length|| 1) - 1, prev.parent + 1),
              }))
            }
            showFull={showImage.parent}
               handleImageIconParent={handleImageIconParent}
           isLoadingDeleteFile={isLoadingDeleteFile}
            toggleShow={() => setShowImage((prev) => ({ ...prev, parent: !prev.parent }))}
          />
         
          
          
        )
        }
         
          <div className="flex justify-end gap-2">



  
  {!editMode.parent ? (
              <>
                <button
                  className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                  onClick={() => handleCancel("parent")}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleSave("parent")}
                  disabled={saving.parent}
                >
                  {saving.parent ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
                onClick={() => handleEditToggle("parent", editMode.parent)}
              >
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInput
              label="First Name"
              name="parentFirstName"
              value={childInfo?.parentFirstName || ""}
              disabled={editMode.parent}
              onChange={handleChange}
            />
            <LabelInput
              label="Last Name"
              name="parentLastName"
              value={childInfo?.parentLastName || ""}
              disabled={editMode.parent}
              onChange={handleChange}
            />
            <LabelInput
              label="Phone"
              name="parentPhone"
              value={childInfo?.parentPhone || ""}
              disabled={editMode.parent}
              onChange={handleChange}
            />
            <LabelInput
              label="Grandfather"
              name="parentGrandFather"
              value={childInfo?.parentGrandFather || ""}
              disabled={editMode.parent}
              onChange={handleChange}
            />
          </div>

          <Textarea
            label="Description"
            name="ParentDescription"
            value={childInfo?.ParentDescription || ""}
            disabled={editMode.parent}
            onChange={handleChange}
            ref={ParentTextRef}
          />
        </div>
          
           )}


 {childInfo?.otherChildData?.length>0 && (

<div className="justify-self-center w-full  space-y-5">
<div className=" w-full space-x-3">
<FontAwesomeIcon icon={faSearch} className="text-2xl font-semibold text-blue-400"></FontAwesomeIcon>
<input type="search"  placeholder="search.."  onChange={SearchDataBySearch}
className="w-100 h-10 max-w-[50%] border-gray-300 border rounded-md outline-none ring ring-blue-300 px-2 py-1"/>
</div>
<div className="w-full space-x-4 pl-9">
<select ref={Selectvalue} className="w-100 h-10 max-w-[80%] ring ring-blue-300  rounded-md">
  <option value="All data">All data</option>
   { years?.map((year)=>(


 
  <option value={year}>{year}</option>
    ))}

</select>
<button className="px-3 py-2 bg-sky-400 rounded-md  cursor-pointer" onClick={handleSearchbyselect}>search</button>
</div>
</div>



 ) }

<div className="space-y-15">

{
childInfo?.otherChildData?.length>0  && (( otherData ?? []).slice() 
  .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((data,indeo)=>(

<div key={indeo} className="flex flex-col gap-2">
<div className="flex flex-col md:flex-row ">
 <LabelInput
              label="Title"
        
              value={data.title|| ""}
         
            />


<div className="flex gap-2 max-md:order-1">
  <span className="text-gray-500 text-md font-bold">Store at </span> 
{new Date(data.timeStamp).toLocaleDateString()}

</div>
</div>




<div className="flex flex-col gap-20">

{data.files?.length>0 && (


data.files.map((fil)=>{


if(fil?.resource_type=='image'){


return(
<div >

<img src={fil?.mediaurl || "bit.png"}  className="md:w-150 md:h-150 object-contain" />

</div>
)

}else if(fil?.resource_type=="video"){

return
(<video> 

<source src={fil?.mediaurl} />

</video>
)

}
else if(fil?.resource_type === "raw" && fil?.format === "pdf"){
return(
<iframe src={fil?.fileURL} frameborder="0"></iframe>
)

}
else if (fil?.resource_type === "raw" && fil?.format === "mp3") {
  return (
    <audio controls>
      <source src={fil?.mediaurl} />
    </audio>
  )}
else {
  return(
<a href={fil?.mediaurl} >view File</a>

  )
}





})

) 
}


  
</div>

<textarea
    key={indeo}
    value={data.description || ""}
    onInput={(e) => {
      const el = e.target;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }}
    className="resize-none overflow-hidden w-full"
  />
</div>


  ))
)
}



</div>


        <div>
 {!showFirstForm && (
        <button
          className="text-md px-3 md:px-5 font-semibold hover:bg-sky-600 hover:text-white 
focus:text-white m-auto md:py-2 py-1 rounded-md bg-sky-400 
        focus:ring focus:ring-blue-600 cursor-pointer focus:bg-sky-600"
          onClick={() => setShowFirstForm(true)}
        >
          Add other Info
        </button>
      )}

{showFirstForm && (



        <form className={` flex-col gap-5 justify-self-center  `} onSubmit={handleSubmit(handleform)}>
          <div className="flex flex-col space-y-5 self-center w-full max-w-full">
            {/* Title Input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="title"
                className="text-gray-700 text-sm font-bold"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="h-10 border rounded-md focus:outline-none focus:ring focus:ring-sky-200"
                placeholder="Title"
                {...register("title")}
              />
            </div>

            {/* File Upload */}
            <div className="cursor-pointer rounded-md flex-col gap-4 flex justify-center items-center relative">
              <label
                htmlFor="file"
                className="text-md cursor-pointer border font-bold border-sky-200"
              >
                <FontAwesomeIcon icon={faUpload} />
                <span> File Upload</span>
              </label>

              <input
                type="file"
                id="file"
                multiple
                className="hidden"
               onChange={handleFile}
                
              />

 {FileUpload?.normalFile.length > 0 &&
  FileUpload?.normalFile.map((currentFile,inde) => {
    const currentFileType = currentFile.type;

    if (currentFileType.startsWith("image/")) {
      return (
        <div className="flex">
        <img
          key={currentFile.name}
          src={URL.createObjectURL(currentFile)}
          className="w-64 h-32 object-contain"
        />
        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold"></FontAwesomeIcon>
        </div>
      );
    } else if (currentFileType === "application/pdf") {
      return (
        <div className="flex">
        <iframe
          key={currentFile.name}
          src={URL.createObjectURL(currentFile)}
          className="w-64 h-32"
        ></iframe>

        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold"></FontAwesomeIcon>
        </div>
      );
    } else if (currentFileType.startsWith("video/")) {
      return (
        <div className="flex">
        <video
          key={currentFile.name}
          controls
          className="w-64 h-32 object-contain"
        >
          <source
            src={URL.createObjectURL(currentFile)}
            type={currentFileType}
          />
        </video> 
        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold"></FontAwesomeIcon>
        </div>
      );
    } else if (currentFileType.startsWith("audio/")) {
      return (
        <div className="flex">
        <audio key={currentFile.name} controls>
          <source
            src={URL.createObjectURL(currentFile)}
            type={currentFileType}
          />
        </audio>
        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold"></FontAwesomeIcon>
        </div>
      );
    } else {
      return (
        <div className="flex">
        <a
          key={currentFile.name}
          href={URL.createObjectURL(currentFile)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View File ({currentFile.name})
        </a>
        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold" ></FontAwesomeIcon>
        </div>
      );
    }
  })}

              {/* File preview modal */}
              {FileUpload?.tempFile.length > 0 && (
                <div className="absolute text-white h-[max-content] flex-col z-50 bg-gray-800 w-80 max-w-ful rounded space-y-3 px-10 py-3 flex justify-center items-center inset-0">
                  <div>
                    {FileUpload?.tempFile.map((file, indx) => (
                      <div key={indx}><div className="flex items-center gap-1 justify-center">{file?.name} 
                      <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,tempFile:pre.tempFile.filter((item,index)=>index!==indx)}))

        }} className="text-lg text-red-700 font-bold" ></FontAwesomeIcon>
                      </div>
                      </div>
                    ))}
                  </div>

                  <span className="border border-white w-full"></span>

                  <div className="flex gap-3  justify-between">
                    <button
                      type="button"
                      className="bg-sky-500 cursor-pointer px-2 py-1 rounded-md"
                      onClick={() => document.getElementById("file").click()}
                    >
                      Add other
                    </button>
                    <button
                      type="button"
                      className="bg-gray-200 text-black cursor-pointer px-2 py-1 rounded-md"
                      onClick={() =>
                        setFileUpload((prev) => ({ ...prev, tempFile: [] }))
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-blue-700 text-white  cursor-pointer px-2 py-1 rounded-md"
                    onClick={handleStoreFile}>
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description Textarea */}
            <div className="self-center flex max-md:w-full flex-col space-y-4">
              <label
                htmlFor="description"
                className="text-gray-700 text-sm font-bold"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                onChange={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="border  max-md:w-full h-30 px-3 py-2 w-125  max-full resize-none overflow-hidden rounded-md "
              ></textarea>
            </div>

            {/* Cancel & Submit Buttons */}
            <button
              type="button"
              className="cursor-pointer bg-gray-200 self-center py-2 px-3 rounded-md"
              onClick={() => {
               setShowFirstForm(false);
reset();
setFileUpload((pre)=>({...pre,normalFile:[],tempFile:[]}));
              }}
            >
           
              Cancel
            </button>

            <button
              type="submit"
            
              className="text-md font-semibold hover:text-white cursor-pointer bg-gray-600 hover:bg-gray-800 focus:ring focus:ring-black self-center rounded-md px-3 py-2 md:px-5 md:py-3"
            >
              Submit
            </button>
      
          </div>
        </form>
     )}
      </div>

      </div>
  
    </div>
  );
};

export default ChildSingle;