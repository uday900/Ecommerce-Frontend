import React, { useContext, useState } from 'react';
import image from '../assests/login-page-front-image.png'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, BASE_URL } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../api/api';
import Loading from './Loading';
const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { 
    isLoading, 
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    info, setInfo,
    user, setUser,
    setIsAdmin, setIsUser,

   } = useContext(AppContext); 

  async function handleLogin(e) {
    e.preventDefault();

    const credentials = {
      email,
      password
    };

    setIsLoading(true);
    try {
      const response = await api.post(`/auth/login`, credentials);

      console.log(response)
      if ( response != null && response.data.status == 200) {
          // setMessage(response.data.message);
          

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));

          setIsAuthenticated(true);
          setUser(response.data.user);
          setIsAdmin(response.data.user.role === "ADMIN")
          setIsUser(response.data.user.role === "USER")

          toast.success(response.data.message);
          navigate('/');
      } else if ( response.data.status == 401) {
          toast.error("Invalid credentials");
      }
       else {
          // setError(response.data.message);
          toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to login/Invalid credentials");
    } finally {
      setIsLoading(false);  // Stop loading after response or error
    }
  }
  return (
    <>
    {isLoading && <Loading />}
    
    <div className="flex h-screen text-white">
      {/* Left Section */}
      <div className="bg-cover bg-center" 
      >
        {/* Replace with your actual image */}
        <img src={image} alt="image" 
        height={956}
        width={650}/>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center  text-gray-800">
        <div className="w-3/4 max-w-md">

        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          {/* <button className="w-full flex items-center justify-center py-2 mb-4 border rounded-md text-gray-600">
            <span className="mr-2">🌐</span> 
            Continue With Google
          </button>

          <div className="flex items-center justify-between mb-4">
            <hr className="w-full border-gray-300" />
            <span className="px-4 text-sm text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div> */}

          {/* Input Fields */}
          <form onSubmit={(e)=> handleLogin(e)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
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
                <span className="absolute top-2 right-3 text-sm cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >{showPassword ? <i className="fa-solid fa-eye-slash"></i>: <i className="fa-solid fa-eye"></i>}</span>
              </div>
            </div>
            <div className="text-right mb-4">
              <Link to='/forgot-password'  className="text-sm text-indigo-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-1/4 bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
              Sign In
            </button>
          </form>

          <div className=" mt-4">
            <p className="text-sm">
              Don’t have an account?{' '}
              <Link to='/register' className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login
