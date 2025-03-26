import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import api from '../api/api';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const username = searchParams.get('username');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const { isLoading, setIsLoading } = useContext(AppContext);

  const validationRules = [
    { text: "At least 8 characters", isValid: password.length >= 8 },
    { text: "At least one uppercase letter (A-Z)", isValid: /[A-Z]/.test(password) },
    { text: "At least one lowercase letter (a-z)", isValid: /[a-z]/.test(password) },
    { text: "At least one number (0-9)", isValid: /[0-9]/.test(password) },
    { text: "At least one special character (!@#$%^&*)", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const isFormInvalid =
    password === "" ||
    confirmedPassword === "" ||
    password !== confirmedPassword ||
    validationRules.some(rule => !rule.isValid);


  useEffect(() => {
    if (!token || !username) {
      navigate('/forgot-password');
    }
  }, [token, username, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(`/auth/reset-password?email=${username}&token=${token}&newPassword=${password}`);

      console.log(response)
      if (response && response.data.status === 200) {
        toast.success('Password reset successful');
        setPassword('');
        setConfirmedPassword('');
        navigate('/login');
      } else if(response.data.status === 404){
        toast.error(response.data.message);
        navigate('/forgot-password'); 

      }
      else {
        toast.error('Password reset failed or token is expired');
        navigate('/forgot-password'); 
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-auto min-h-screen mt-5 justify-center text-gray-800">
      <div className="w-3/4 max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span
                className="absolute top-2 right-3 text-sm cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
              </span>
            </div>
          </div>
          <div className='mb-2 ml-4'>

<ul className="list-disc pl-5 space-y-1">
  {validationRules.map((rule, index) => (
    <li key={index} className={`${rule.isValid ? "marker:text-green-500" : "marker:text-red-500"}`}>
      {rule.text}
    </li>
  ))}
</ul>


</div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="confirmedPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmedPassword ? 'text' : 'password'}
                id="confirmedPassword"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span
                className="absolute top-2 right-3 text-sm cursor-pointer text-gray-500"
                onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
              >
                {showConfirmedPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
              </span>
            </div>
          </div>


          <button
            type="submit"
            className={` w-full ${isFormInvalid ? 'disabled-button' : 'primary-button'
              }`}
            disabled={isFormInvalid}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>


        
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
  