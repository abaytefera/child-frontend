import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTimesCircle, faUpload, faChild, faUserFriends, 
  faArrowRight, faArrowLeft, faCheckCircle, faCamera, faVenusMars 
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useCreateChildMutation } from "../../Redux/Childes";

const RegisterChild = () => {
  const [step, setStep] = useState(1); // 1: Child, 2: Parent
  const [files, setFiles] = useState([]);
  const [tempFiles, setTempFiles] = useState([]);
  const [childHaveParent, setChildHaveParent] = useState(false);
  const [parentFiles, setParentFiles] = useState([]);
  const [parentTempFiles, setParentTempFiles] = useState([]);

  const [createChild, { isLoading }] = useCreateChildMutation();

  const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm();

  // File Handlers
  const handleTempFile = (e) => setTempFiles(Array.from(e.target.files));
  const addFile = (e) => { e.preventDefault(); setFiles([...files, ...tempFiles]); setTempFiles([]); };
  
  const handleParentTempFile = (e) => setParentTempFiles(Array.from(e.target.files));
  const addParentFile = (e) => { e.preventDefault(); setParentFiles([...parentFiles, ...parentTempFiles]); setParentTempFiles([]); };

  const childFields = [
    { label: "First Name", id: "childFirstName", type: "text", icon: faChild },
    { label: "Last Name", id: "childLastName", type: "text", icon: faChild },
    { label: "Grand Father", id: "childGrandFather", type: "text", icon: faChild },
    { label: "Phone Number", id: "childPhone", type: "number", icon: faChild },
    { label: "Registration Date", id: "childRegisterDate", type: "date", icon: faChild },
    { label: "Birth Day", id: "childBirthDay", type: "date", icon: faChild },
    { label: "Grade", id: "Grade", type: "text", icon: faChild },
  ];

  const validateStepOne = async () => {
    const fields = [...childFields.map(f => f.id), 'gender', 'ChildDescription'];
    const isValid = await trigger(fields);
    if (isValid && files.length > 0) setStep(2);
    else if (files.length === 0) toast.warning("Please upload a child profile photo");
  };

  const onFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append('Data', JSON.stringify(data));
    files.forEach(file => formData.append("childPhotos", file));
    parentFiles.forEach(file => formData.append("parentPhotos", file));

    try {
      const result = await createChild(formData).unwrap();
      toast.success(result.msg || "Registered Successfully!");
      reset(); setFiles([]); setParentFiles([]); setStep(1);
    } catch (err) {
      toast.error(err?.data?.msg || "Submission failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
      <ToastContainer position="top-right" theme="colored" />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-[2.5rem] p-6 md:p-12 border border-white/50">
        
        {/* Professional Stepper UI */}
        <div className="flex items-center justify-center mb-12 gap-4">
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 ${step === 1 ? 'bg-sky-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
            <FontAwesomeIcon icon={faChild} />
            <span className="font-bold whitespace-nowrap">Child Info</span>
          </div>
          <div className={`h-[2px] w-12 ${step === 2 ? 'bg-sky-500' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 ${step === 2 ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
            <FontAwesomeIcon icon={faUserFriends} />
            <span className="font-bold whitespace-nowrap">Parent Info</span>
          </div>
        </div>

        {/* Step 1: Child Information */}
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childFields.map(({ label, id, type }) => (
                <div key={id} className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-slate-600 ml-1">{label}</label>
                  <input
                    type={type}
                    {...register(id, { required: `${label} is required` })}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                  {errors[id] && <span className="text-rose-500 text-xs font-medium">{errors[id].message}</span>}
                </div>
              ))}
              
              {/* Gender Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-600 ml-1">Gender</label>
                <div className="flex gap-4 h-12">
                  {['male', 'female'].map((g) => (
                    <label key={g} className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 peer-checked:bg-sky-50">
                      <input type="radio" {...register('gender', { required: true })} value={g} className="w-4 h-4 accent-sky-500" />
                      <span className="capitalize font-bold text-slate-700">{g}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <span className="text-rose-500 text-xs">Selection required</span>}
              </div>
            </div>

            {/* Child Profile Upload */}
            <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-sky-400 transition-colors">
              <label htmlFor="childFile" className="flex flex-col items-center cursor-pointer gap-3">
                <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-sky-500">
                  <FontAwesomeIcon icon={faCamera} size="lg" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-700">Upload Child Profile Photo</p>
                  <p className="text-xs text-slate-500">Click to browse or drag and drop</p>
                </div>
              </label>
              <input type="file" id="childFile" className="hidden" multiple onChange={handleTempFile} accept="image/*" />
              
              {tempFiles.length > 0 && (
                <div className="flex gap-3 mt-6 justify-center">
                  <button type="button" onClick={addFile} className="bg-sky-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-sky-600 transition-all">Add Selected</button>
                  <button type="button" onClick={() => setTempFiles([])} className="bg-slate-200 text-slate-600 px-6 py-2 rounded-xl font-bold">Clear</button>
                </div>
              )}

              {/* Image Preview Grid */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                {files.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img src={URL.createObjectURL(file)} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg" alt="preview" />
                    <button type="button" onClick={() => setFiles(files.filter((_, i) => i !== idx))} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                      <FontAwesomeIcon icon={faTimesCircle} size="xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-600 ml-1">Special Notes / Description</label>
              <textarea
                {...register("ChildDescription", { required: "Notes are required" })}
                className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-sky-500 outline-none resize-none transition-all"
                placeholder="Health issues, hobbies, or behavior notes..."
              ></textarea>
            </div>
          </div>
        )}

        {/* Step 2: Parent Information */}
        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
             <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-amber-500" 
                  onChange={() => setChildHaveParent(!childHaveParent)} 
                  checked={childHaveParent} 
                />
                <label className="font-bold text-amber-800 text-sm">Child does not have a registered parent</label>
             </div>

             {!childHaveParent && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Similar input styling as Step 1... mapping through parentFields */}
                 {/* [Parent Field Mapping Here] */}
               </div>
             )}

             <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
               <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-700 transition-colors">
                 <FontAwesomeIcon icon={faArrowLeft} /> Back to Child Info
               </button>
               <button type="submit" className="bg-emerald-500 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-emerald-200 hover:bg-emerald-600 hover:scale-105 transition-all flex items-center gap-3">
                 Finalize Registration <FontAwesomeIcon icon={faCheckCircle} />
               </button>
             </div>
          </div>
        )}

        {/* Next Step Button (Only in Step 1) */}
        {step === 1 && (
          <div className="flex justify-end mt-12 pt-8 border-t border-slate-100">
            <button
              type="button"
              onClick={validateStepOne}
              className="bg-sky-500 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-sky-200 hover:bg-sky-600 hover:scale-105 transition-all flex items-center gap-3"
            >
              Next Step <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterChild;