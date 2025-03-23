import React, { useContext, useState } from 'react';
import image from '../assests/login-page-front-image.png';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
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
    setIsAuthenticated,
    setUser,
    setIsAdmin, 
    setIsUser,
    setFailedToFetch
  } = useContext(AppContext); 

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setFailedToFetch(false);

    try {
      const response = await api.post(`/auth/login`, { email, password });
      if (response && response.data.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setIsAuthenticated(true);
        setUser(response.data.user);
        setIsAdmin(response.data.user.role === "ADMIN");
        setIsUser(response.data.user.role === "USER");

        toast.success(response.data.message);
        navigate('/');
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Failed to login/Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col md:flex-row h-screen items-center justify-center md:justify-start text-white p-4">
        {/* Left Section */}
        <div className="hidden md:block md:w-1/2">
          <img src={image} alt="Login" className="w-full h-auto" />
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-gray-800">
          <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
            <form onSubmit={handleLogin}>
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
                  <span 
                    className="absolute top-2 right-3 text-sm cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                  </span>
                </div>
              </div>
              <div className="text-right mb-4">
                <Link to='/forgot-password' className="text-sm text-indigo-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={!email || !password}
                className={`${email && password ? 'primary-button' : 'disabled-button'}`}
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-center">
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

export default Login;
