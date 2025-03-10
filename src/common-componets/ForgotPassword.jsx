import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from './Loading';
import toast from 'react-hot-toast';
import api from '../api/api';

function ForgotPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [otp, setOtp] = useState(null);

    const {
        isLoading,
        setIsLoading,
    } = useContext(AppContext)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };



    const handleFormSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const response = await api.post(`/auth/forgot-password?email=${email}`);
            console.log(response)

            if (response.data.status === 200) {
                setSent(true);
                toast.success('OTP has sent successfully to your email');
            } 
            else {
                // Handle error
                toast.error(response.data.message);
                console.error('Error sending password reset email');
            }
        } catch (error) {
            
                toast.error('Something went wrong. Please try again later.');
            
        } finally {
            setIsLoading(false);
        }
        
    };

    async function handleVerifyOtp(){
        setIsLoading(true);
        
        try {
            const response = await api.post(`/auth/verify-otp?otp=${otp}&email=${email}`);
            if (response != null && response.data.status == 200) {
                toast.success(response.data.message);
                // localStorage.setItem("resetToken", response.data.token);
                navigate(`/reset-password?username=${email}&token=${response.data.token}`);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error verifying otp");
            console.log( error);
        } finally {
            setIsLoading(false);
        }
    }

    // if (isLoading) {
    //     return <Loading />
    // }
    return (
        <div>
            { isLoading && <Loading />}
            <div className="flex h-screen mt-5 justify-center text-gray-800">
                <div className="w-3/4 max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
                    <form >

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            className={`primary-button w-full ${email === '' && 'disabled-button'}`}
                            onClick={(e) => handleFormSubmit(e)}
                            disabled={email === '' }
                        >
                           {sent ? <span>Resend OTP</span> : <span>Generate OTP</span>} 
                        </button>


                        { sent && (
                            <div className='mt-2'>

                                <input type='text'
                                onChange={(e) => setOtp(e.target.value)}
                                className='w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'

                                />

                                <button type = 'button' className='mt-2 primary-button bg-green-400'
                                onClick={()=> handleVerifyOtp()}>Verify OTP</button>
                            </div>
                        )}
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
        </div>
    )
}

export default ForgotPassword