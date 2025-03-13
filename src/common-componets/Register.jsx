import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, BASE_URL } from '../context/AppContext';
import toast from 'react-hot-toast';
import Loading from './Loading';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { isLoading, setIsLoading } = useContext(AppContext);

 
  const validationRules = [
    { text: "At least 8 characters", isValid: formData.password.length >= 8 },
    { text: "At least one uppercase letter (A-Z)", isValid: /[A-Z]/.test(formData.password) },
    { text: "At least one lowercase letter (a-z)", isValid: /[a-z]/.test(formData.password) },
    { text: "At least one number (0-9)", isValid: /[0-9]/.test(formData.password) },
    { text: "At least one special character (!@#$%^&*)", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ];

  const isFormInvalid =
    formData.name === "" ||
    formData.email === "" ||
    formData.password === "" ||
    validationRules.some(rule => !rule.isValid)
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
 
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(isLoading)
    setIsLoading(true);
    try {

      const response = await axios.post(`${BASE_URL}/auth/register`, formData);
      if (response != null && response.data.status == 200) {
        // setMessage(response.data.message);
        toast.success(response.data.message);
        navigate('/login');
      } else {
        // setError(response.data.message);
        toast.error(response.data.message)
      }
    } catch (error) {
      // console.log('Error submitting form:', error);
      toast.error('Error submitting form');
    } finally {
      setIsLoading(false);  // Stop loading after response or error
    }
    // Add API call here to send data to backend
  };

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="flex h-screen mt-5 justify-center text-gray-800">
      <div className="w-3/4 max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className='mb-2 ml-4'>
            {/* <ul className="list-disc">
            { passwordInstructions.map((inst) =>{
              return <li  className={`list-disc ${inst.valid && 'marker:text-green-500'}`}>{inst.message}</li>
            })} */}
            {/* </ul> */}
            {/* Password Criteria List */}
      <ul className="list-disc pl-5 space-y-1">
        {validationRules.map((rule, index) => (
          <li key={index} className={`${rule.isValid ? "marker:text-green-500" : "marker:text-red-500"}`}>
            {rule.text}
          </li>
        ))}
      </ul>
           
            
          </div>
        
          <button
  type="submit"
  className={` w-full ${
    isFormInvalid ? 'disabled-button' : 'primary-button'
  }`}
  disabled={isFormInvalid}
>
  Register
</button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to='/login' className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
