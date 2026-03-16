import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye, faEyeSlash, faUser, faEnvelope, faPhone, 
  faLock, faBriefcase, faGraduationCap, faArrowRight, faCheckCircle 
} from "@fortawesome/free-solid-svg-icons";
import { useCreateEmployeeMutation } from "../../Redux/Employee";
import { toast, ToastContainer } from "react-toastify";

const EmployeeRegister = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirmPassword: "", role: "", educationBackground: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const validateStep1 = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = form;
    if (!firstName || !lastName || !email || !phone || !password) {
      return toast.error("Please complete all profile details");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!form.role || !form.educationBackground) return toast.error("Please select professional details");
    try {
      await createEmployee(form).unwrap();
      toast.success('Employee account successfully created');
      setForm({
        firstName: "", lastName: "", email: "", phone: "",
        password: "", confirmPassword: "", role: "", educationBackground: ""
      });
      setStep(1);
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to create account");
    }
  };

  return (
    <div className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-500">
      <ToastContainer position="top-center" theme="colored" />
      
      <div className="bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white p-8 md:p-12">
        
        {/* Header & Stepper */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-slate-800 mb-6">Staff Onboarding</h1>
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${step === 1 ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' : 'bg-slate-100 text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span> Profile
            </div>
            <div className="h-[2px] w-8 bg-slate-200" />
            <div className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${step === 2 ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' : 'bg-slate-100 text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span> Expertise
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {step === 1 ? (
            <>
              <InputGroup id="firstName" label="First Name" icon={faUser} value={form.firstName} onChange={handleChange} placeholder="John" />
              <InputGroup id="lastName" label="Last Name" icon={faUser} value={form.lastName} onChange={handleChange} placeholder="Doe" />
              <InputGroup id="email" label="Email Address" type="email" icon={faEnvelope} value={form.email} onChange={handleChange} placeholder="john@company.com" />
              <InputGroup id="phone" label="Phone Number" type="tel" icon={faPhone} value={form.phone} onChange={handleChange} placeholder="+251..." />
              
              <div className="relative">
                <InputGroup id="password" label="Password" type={showPassword ? "text" : "password"} icon={faLock} value={form.password} onChange={handleChange} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-11 text-slate-400 hover:text-sky-500 transition-colors">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <div className="relative">
                <InputGroup id="confirmPassword" label="Confirm Password" type={showConfirmPassword ? "text" : "password"} icon={faLock} value={form.confirmPassword} onChange={handleChange} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-11 text-slate-400 hover:text-sky-500 transition-colors">
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </>
          ) : (
            <>
              <SelectGroup id="role" label="Assigned Role" icon={faBriefcase} value={form.role} onChange={handleChange} 
                options={["Social Worker", "Admin", "Accountant", "Other"]} />
              <SelectGroup id="educationBackground" label="Educational Level" icon={faGraduationCap} value={form.educationBackground} onChange={handleChange} 
                options={["Degree", "Masters", "PhD", "Other"]} />
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="text-slate-500 font-bold flex items-center gap-2 hover:text-slate-800 transition-all">
               Back to Profile
            </button>
          ) : <div />}

          <button
            disabled={isLoading}
            onClick={step === 1 ? validateStep1 : handleSubmit}
            className={`px-10 py-4 rounded-2xl font-black text-white shadow-xl flex items-center gap-3 transition-all active:scale-95 ${
              isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600 shadow-sky-200'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {step === 1 ? "Professional Details" : "Create Account"}
                <FontAwesomeIcon icon={step === 1 ? faArrowRight : faCheckCircle} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputGroup = ({ id, label, type = "text", icon, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors">
        <FontAwesomeIcon icon={icon} />
      </div>
      <input
        id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-50 outline-none transition-all font-medium text-slate-700"
      />
    </div>
  </div>
);

// Reusable Select Component
const SelectGroup = ({ id, label, icon, value, onChange, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors">
        <FontAwesomeIcon icon={icon} />
      </div>
      <select
        id={id} value={value} onChange={onChange}
        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-sky-400 outline-none transition-all font-bold text-slate-700 appearance-none"
      >
        <option value="">Choose {label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);

export default EmployeeRegister;