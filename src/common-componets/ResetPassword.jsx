// import React, { useContext, useEffect, useState } from 'react'
// import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import api from '../api/api';
// import toast from 'react-hot-toast';
// import { set } from 'react-hook-form';

// function ResetPassword() {
//   // const { username, token } = useParams();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams(); // Hook to get query params

//   const username = searchParams.get('username');
//   const token = searchParams.get('token');

//   // const resetToken = localStorage.getItem('resetToken');


//   const [password, setPassword] = useState('');
//   const [confirmedPassword, setConfirmedPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const[showConfirmedPassword, setShowConfirmedPassword] = useState(false);

//   const {
//     isLoading,
//     setIsLoading,
//   } = useContext(AppContext)
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmedPassword) {
//       // Passwords do not match
//       // console.log('Passwords do not match');
//       toast.error('Passwords do not match');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       console.log(username, token)
//       const response = await api.post(`/auth/reset-password?email=${username}&token=${token}&newPassword=${password}`);
//       if (response.data.status === 200) {
//         // Password reset successful
//         // console.log('Password reset successful');
//         toast.success('Password reset successful');
//         setPassword('');
//         setConfirmedPassword('');
//         // navigate('/login');
//       } else {
//         // Password reset failed
//         // console.log('Password reset failed');
//         toast.error('Password reset failed');
//       }
//     } catch (error) {
//       // Handle error
//       // console.error('Error resetting password:', error.response.data);
//       toast.error('Something went wrong. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   useEffect(() => {
    
//     if (!token && !username) {
//       navigate('/forgot-password');
//     }

//   }, []);
//   return (
//     <div><div>
//     <div className="flex h-screen mt-5 justify-center text-gray-800">
//         <div className="w-3/4 max-w-md">
//             <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
//             <form onSubmit={handleFormSubmit}>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1" htmlFor="password">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <span className="absolute top-2 right-3 text-sm cursor-pointer text-gray-500"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >{showPassword ? <i className="fa-solid fa-eye-slash"></i>: <i className="fa-solid fa-eye"></i>}</span>
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1" htmlFor="password">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showConfirmedPassword ? 'text' : 'password'}
//                   id="ConfirmedPassword"
//                   value={confirmedPassword}
//                   onChange={(e) => setConfirmedPassword(e.target.value)}
//                   className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <span className="absolute top-2 right-3 text-sm cursor-pointer text-gray-500"
//                   onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
//                 >{showPassword ? <i className="fa-solid fa-eye-slash"></i>: <i className="fa-solid fa-eye"></i>}</span>
//               </div>
//             </div>

//                 <button
//                     type="submit"
//                     className="primary-button w-full"
//                 >
//                     Reset Password
//                 </button>
                
//             </form>
//             <div className="mt-4 text-center">
//                 <p className="text-sm">
//                     Already have an account?{' '}
//                     <Link to='/login' className="text-indigo-600 hover:underline">
//                         Sign in
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     </div>
// </div></div>
//   )
// }

// export default ResetPassword


import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import api from '../api/api';
import toast from 'react-hot-toast';

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

      if (response.data.status === 200) {
        toast.success('Password reset successful');
        setPassword('');
        setConfirmedPassword('');
        navigate('/login');
      } else {
        toast.error('Password reset failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen mt-5 justify-center text-gray-800">
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
            className={`w-full ${isLoading || !password || !confirmedPassword ? 'disabled-button' : 'primary-button'}`}
            disabled={isLoading || !password || !confirmedPassword}
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
  