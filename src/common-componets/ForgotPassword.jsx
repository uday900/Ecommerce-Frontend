import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from './Loading';
import toast from 'react-hot-toast';
import api from '../api/api';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [otp, setOtp] = useState('');

    const { isLoading, setIsLoading } = useContext(AppContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await api.post(`/auth/forgot-password?email=${email}`);
            if (response.data.status === 200) {
                setSent(true);
                toast.success('OTP has been sent successfully to your email');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        try {
            const response = await api.post(`/auth/verify-otp?otp=${otp}&email=${email}`);
            if (response && response.data.status === 200) {
                toast.success(response.data.message);
                navigate(`/reset-password?username=${email}&token=${response.data.token}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error verifying OTP");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center h-auto p-4 ">
            {isLoading && <Loading />}
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
                <form>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="button"
                        className={`w-full ${email === '' ? 'disabled-button' : 'primary-button'
                        }`}
                        onClick={handleFormSubmit}
                        disabled={email === ''}
                    >
                        {sent ? 'Resend OTP' : 'Generate OTP'}
                    </button>

                    {sent && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="otp">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <button
                                type="button"
                                className={`mt-3 w-full py-2 px-4 text-white rounded-md ${
                                    otp.length < 6 ? 'disabled-button' : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                                }`}
                                onClick={handleVerifyOtp}
                                disabled={otp.length < 6}
                            >
                                Verify OTP
                            </button>
                        </div>
                    )}
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
