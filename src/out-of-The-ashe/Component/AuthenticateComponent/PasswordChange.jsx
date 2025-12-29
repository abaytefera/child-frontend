

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useContext, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useUpdatePasswordMutation } from "../../Redux/User";
import { useSelector } from "react-redux";



const PasswordChange = () => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {id}=useSelector((state)=>state.auth);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);

  
  const [updatePassword,{isLoading,isSuccess,isError,error}]= useUpdatePasswordMutation();



  // Refs for validation UI
  const useMax = useRef(null);
  const useUpper = useRef(null);
  const useLower = useRef(null);
  const useSpecial = useRef(null);
  const useNumber = useRef(null);

  const inputRef = useRef(null);
  const errorRef = useRef(null);
  const buttonConfirmRef = useRef(null);




  // Track validation status
  const [isPasswordValid, setPasswordValid] = useState(false);

  const handleInput = useCallback(() => {
    let check = true;
    if (!buttonConfirmRef.current) return;

    // Disable button initially
    buttonConfirmRef.current.disabled = true;
    buttonConfirmRef.current.classList.add("cursor-not-allowed", "bg-blue-300");
    buttonConfirmRef.current.classList.remove("cursor-pointer", "bg-button");

    // Remove red from all
    [useMax, useUpper, useLower, useSpecial, useNumber].forEach((ref) => {
      ref.current?.classList.remove("text-red-400");
    });

    const newPassword = inputRef.current.value;

    if (newPassword.length < 6) {
      useMax.current?.classList.add("text-red-400");
      check = false;
    }
    if (!/[A-Z]/.test(newPassword)) {
      useUpper.current?.classList.add("text-red-400");
      check = false;
    }
    if (!/[a-z]/.test(newPassword)) {
      useLower.current?.classList.add("text-red-400");
      check = false;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{}|\\:;"'<>,.?\/]/.test(newPassword)) {
      useSpecial.current?.classList.add("text-red-400");
      check = false;
    }
    if (!/[0-9]/.test(newPassword)) {
      useNumber.current?.classList.add("text-red-400");
      check = false;
    }

    if (check) {
      buttonConfirmRef.current.disabled = false;
      buttonConfirmRef.current.classList.remove("cursor-not-allowed", "bg-blue-300");
      buttonConfirmRef.current.classList.add("cursor-pointer", "bg-blue-600");
    }

    setPasswordValid(check);
  }, []);

  
  useEffect(()=>{
if(isError){

toast.error(error);

}

  },[isError])
  useEffect(()=>{
if(isSuccess){

  toast.success('sccfully Change password');
}

  },[isSuccess])

  const handleChangePassword = async (e) => {
    e.preventDefault();
    errorRef.current.textContent = "";

    const formData = new FormData(e.target);
    const newpassword = formData.get("newpassword");
    const confirmPassword = formData.get("confirmPassword");
    const oldPassword = formData.get("oldPassword");

    if (!isPasswordValid) {
      errorRef.current.textContent = "New password does not meet criteria.";
      return;
    }

    if (newpassword !== confirmPassword) {
      errorRef.current.textContent = "Passwords do not match. Please check.";
      return;
    }

    

   
    try {
     await updatePassword({oldPassword,newpassword,confirmPassword,id:id}).unwrap();


      e.target.reset();
      setPasswordValid(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred, please try again.", { position: "top-right" });
    } finally {
    
    }
  };

  return (
    <div
      className={`
      }  overflow-auto  flex gap-4 pt-10  flex-col items-center min-h-screen overflow-hidden pb-40 `}
    >
      <ToastContainer></ToastContainer>
      { isLoading  &&(  <div className="flex absolute z-300 top-0 left-0 bg-black/40 w-full  items-center flex-col  h-full">
      <div className="w-10 border border-6 h-10 mt-50 fixed border-t-transparent border-white rounded-full animate-spin"></div>
<p className="mt-60 fixed text-xl font-bold text-white  ">loading...</p>
    </div>
    )}
      <p className={`  text-2xl font-extrabold`}>
        Change Password
      </p>

      <form
        className={`flex flex-col gap-10  p-5 rounded-xl w-full max-w-md`}
        onSubmit={handleChangePassword}
        noValidate
      >
       
        {/* Old Password */}
        <div className="flex flex-col relative gap-3">
          <label htmlFor="oldPassword" className="self-start font-medium text-md">
            Old Password
          </label>
          <input
            type={oldPasswordVisible ? "text" : "password"}
            name="oldPassword"
            id="oldPassword"
            placeholder="Old password"
            className="h-10 w-full border-none rounded-lg outline-button px-3"
            aria-label="Old Password"
            autoComplete="current-password"
          />
          <FontAwesomeIcon
            icon={oldPasswordVisible ? faEyeSlash : faEye}
            className="absolute right-3 top-12 cursor-pointer"
            onClick={() => setOldPasswordVisible((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={oldPasswordVisible ? "Hide old password" : "Show old password"}
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col relative gap-3">
          <label htmlFor="newpassword" className="self-start font-medium text-md">
            New Password
          </label>
          <input
            type={newPasswordVisible ? "text" : "password"}
            id="newpassword"
            name="newpassword"
            placeholder="New password"
            className="h-10 w-full rounded-lg outline-button px-3"
            ref={inputRef}
            onChange={handleInput}
            aria-describedby="passwordHelp"
            autoComplete="new-password"
          />
          <FontAwesomeIcon
            icon={newPasswordVisible ? faEyeSlash : faEye}
            className="absolute right-3 top-12 cursor-pointer"
            onClick={() => setNewPasswordVisible((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={newPasswordVisible ? "Hide new password" : "Show new password"}
          />
          <ul
            className="list-disc self-start text-sm ml-5 mt-1"
            id="passwordHelp"
            aria-live="polite"
          >
            <li ref={useMax}>Minimum 6 characters</li>
            <li ref={useUpper}>One uppercase character</li>
            <li ref={useLower}>One lowercase character</li>
            <li ref={useSpecial}>One special character</li>
            <li ref={useNumber}>One number</li>
          </ul>
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col relative gap-3">
          <label htmlFor="confirmPassword" className="self-start font-medium text-md">
            Confirm New Password
          </label>
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm new password"
            className="h-10 w-full border-none rounded-lg outline-button px-3"
            aria-label="Confirm new password"
            autoComplete="new-password"
          />
          <FontAwesomeIcon
            icon={confirmPasswordVisible ? faEyeSlash : faEye}
            className="absolute right-3 top-12 cursor-pointer"
            onClick={() => setConfirmPasswordVisible((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={confirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
          />
        </div>

        <p ref={errorRef} className="text-red-600 min-h-[1.25rem]"></p>

        <button
          className="w-full h-12 bg-blue-300 rounded-2xl cursor-not-allowed text-black disabled:opacity-60"
          ref={buttonConfirmRef}
          type="submit"
          disabled
          aria-disabled="true"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
