import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useGetUserQuery, useUpdateUserMutation,useUpdateProfileMutation } from "../../Redux/User";
import { toast, ToastContainer } from "react-toastify";
import { APi } from "../../Redux/CenteralAPI";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useSelector((state) => state.auth);

  const [UpdateProfile, { isLoading, isSuccess, isError, error }] = useUpdateProfileMutation();
    const [updateUser,{isLoading:textIsloading,isSuccess:textIsSucess,isError:textIserror,error:textError}]=useUpdateUserMutation()

  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    educationBackground: "",
    profile: ""
  });

 
  const { data: User,isLoading:firstFetchUserData  } = useGetUserQuery(id);
  const Dispatch =useDispatch()

  const firstInputRef = useRef(null);
  const fileInputRef = useRef(null);

 
  useEffect(() => {
    if (User) {
      setFormInfo(User);
    }
  }, [User]);


   useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully updated!")
      Dispatch(APi.util.invalidateTags([{type:'User',_id:'List'}]))
      setIsEditing(false);
    }
  }, [isSuccess]);
  useEffect(()=>{
 if(textIsSucess){
toast.success("Successfully updated!")
Dispatch(APi.util.invalidateTags([{type:'User',_id:'List'}]))
return
 }

  },[textIsSucess])

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Update failed");
      return
    }
  }, [isError, error]);

    useEffect(() => {
    if (textIserror) {
      toast.error(textError?.data?.message || "Update failed");
      return
    }
  }, [textIserror, textError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => firstInputRef.current?.focus(), 0);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormInfo(User);
    setIsEditing(false);
  };


  const handleSave = async () => {
    try {
     
      await updateUser({ id, ...formInfo }).unwrap();
    } catch (err) {
      toast.error(err.message);
    }
  };


  const handleImageClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const formData = new FormData();
    formData.append("id", id);
    formData.append("profile", file); 

    try {
      await UpdateProfile(formData).unwrap();
      toast.success("Profile picture updated!");
    } catch (err) {
      toast.error("Image upload failed");
    }
  };
if(firstFetchUserData) return( <div className="flex flex-col  h-screen items-center  mt-40 ">
  <div className="h-10 w-10 border-4  border-sky-500 rounded-full border-t-transparent animate-spin"></div>
  </div>)
  return (
    <div className="flex flex-col gap-10 min-h-screen px-10 pb-40 overflow-hidden">
      <ToastContainer />


      {isLoading && (
        <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/40">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-bold text-white">Updating...</p>
        </div>
      )}

      <div className="font-bold text-start py-2 pl-2 text-lg shadow-md rounded-xl">
        My Profile
      </div>

   
      <div className="flex items-center gap-5 px-5 py-4 shadow-md rounded-xl">
        <div className="relative">
          <img
            src={formInfo?.profile.mediaurl ||  formInfo?.profile}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover max-[360px]:w-16 max-[360px]:h-16 border-2 border-gray-200"
          />
          
   
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange} 
          />

          <div 
            onClick={handleImageClick}
            className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-all"
          >
            <FontAwesomeIcon
              icon={faCamera}
              className="text-lg max-[360px]:text-sm text-gray-900"
            />
          </div>
        </div>
        <div>
          <span className="text-xl font-bold capitalize max-[360px]:text-sm">
            {formInfo?.firstName} {formInfo?.lastName}
          </span>
        </div>
      </div>

    
      <div className="shadow-md rounded-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <p className="text-xl font-bold max-[360px]:text-sm">
            Personal Information
          </p>
          {!isEditing ? (
            <button
              className="px-6 py-1 bg-orange-500 rounded-xl text-white text-sm font-semibold hover:bg-orange-600 transition"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                className="py-1 px-4 bg-gray-300 rounded-md font-semibold text-sm"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="py-1 px-4 bg-sky-500 text-white rounded-md font-semibold text-sm"
                type="button"
                onClick={handleSave}
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 max-[360px]:grid-cols-1 p-6">
          {[
            { label: "First Name", name: "firstName", ref: firstInputRef },
            { label: "Last Name", name: "lastName" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone" },
            { label: "Education Background", name: "educationBackground" },
          ].map((item) => (
            <div className="flex flex-col gap-2" key={item.name}>
              <label htmlFor={item.name} className="self-start text-sm font-semibold text-gray-700">
                {item.label}
              </label>
              <input
                id={item.name}
                name={item.name}
                ref={item?.ref}
                type={item.type || "text"}
                value={formInfo[item.name] || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`p-3 rounded-lg border transition-all ${
                  !isEditing
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white border-sky-400 text-gray-900 focus:ring-2 focus:ring-sky-200"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;