import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faEye, faEyeSlash, faSpinner, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { LoginUser } from '../Redux/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticate, isloading, error, token } = useSelector((state) => state.auth);
useEffect(()=>{
console.log(error)
},[error])
  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationError) setValidationError(''); // Clear error when user types
  };

  const onLogin = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!formData.email) return setValidationError('Please enter your email');
    if (!formData.password) return setValidationError('Please enter your password');

    dispatch(LoginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticate && token) {
      localStorage.setItem('authToken', token);
      const timer = setTimeout(() => {
        navigate('/DashbordPage');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticate, token, navigate]);

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#3B39CE]">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Dynamic Feedback UI */}
        <div className="mb-6 h-12">
          {/* Loading State */}
          {isloading && (
            <div className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-3 rounded-xl animate-pulse">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              <span className="font-medium">Authenticating...</span>
            </div>
          )}

          {/* Error States (Validation or Server Error) */}
          {(validationError || error) && !isloading && (
            <div className="flex items-center justify-center gap-2 bg-red-50 text-red-700 py-3 rounded-xl border border-red-100">
              <FontAwesomeIcon icon={faCircleExclamation} />
              <span className="text-sm font-semibold">
                {validationError || (Array.isArray(error) ? error[0].msg : error)}
              </span>
            </div>
          )}

          {/* Success State */}
          {isAuthenticate && (
            <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 py-3 rounded-xl border border-green-100 relative overflow-hidden">
               <div className="absolute bottom-0 left-0 h-1 bg-green-500 animate-progress"></div>
               <FontAwesomeIcon icon={faCheck} />
               <span className="font-bold">Login Successful! Redirecting...</span>
            </div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={onLogin} className="space-y-5">
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-sm ml-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="relative">
            <label className="block text-slate-700 font-bold mb-1 text-sm ml-1">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isloading}
            className="w-full py-3.5 bg-[#3B39CE] text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-800 hover:-translate-y-0.5 transition-all active:scale-95 disabled:bg-slate-300 disabled:shadow-none disabled:translate-y-0"
          >
            {isloading ? "Checking..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;