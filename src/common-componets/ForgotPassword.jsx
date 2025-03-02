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
            // console.log(response)
            if (response.data.status === 200) {
                // Password reset email sent successfully
                // console.log('Password reset email sent successfully');
                toast.success('Password reset link sent successfully to your email');
                // navigate('/reset-password');
            } 
            else {
                // Handle error
                toast.error(response.data.message);
                console.error('Error sending password reset email');
            }
        } catch (error) {
            
                toast.error('Something went wrong. Please try again later.');
            
            
            // toast.error('Error sending password reset email');
            
            // console.error('Error sending password reset email:', error.response.data);
        } finally {
            setIsLoading(false);
        }
        setSent(true);
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="flex h-screen mt-5 justify-center text-gray-800">
                <div className="w-3/4 max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
                    <form onSubmit={handleFormSubmit}>

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
                            type="submit"
                            className="primary-button w-full"
                        >
                           {sent ?<span>Resend Password Reset Link</span> : <span>Send Password Reset Link</span>} 
                        </button>
                        { sent && (
                            <div className="mt-4 text-center">
                                <p className="text-sm">
                                    Password reset link sent successfully to your email
                                </p>
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