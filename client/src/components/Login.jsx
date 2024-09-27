import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; 
import { signInWithPopup } from "firebase/auth"; 
import yourImage from '../assets/image.png'; 

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log(response.data); 
            const { userType, id } = response.data.user; 

            
            if (userType === 'Doctor') {
                navigate('/doctor');
            } else if (userType === 'Patient') {
                navigate(`/patient/${id}`); 
            } else {
                setError('Invalid role');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Server error, please try again later');
            console.error('Login error:', error);
        } finally {
            setLoading(false); 
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const idToken = await user.getIdToken();
            const response = await axios.post('http://localhost:5000/api/auth/google', { idToken });
            console.log(response.data);
            const { userType, id } = response.data.user; 

           
            if (userType === 'Doctor') {
                navigate('/doctor');
            } else if (userType === 'Patient') {
                navigate(`/patient/${id}`); 
            } else {
                setError('Invalid role');
            }
        } catch (error) {
            setError('Google login failed, please try again.');
            console.error('Google login error:', error);
        }
    };

    return (
        <div className="flex h-screen bg-black">
            
            <div className="flex-1 flex items-center justify-center">
                <img
                    src={yourImage} 
                    alt="Background"
                    className="object-cover h-3/4" 
                />
            </div>

            
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <h1 className="text-center text-6xl mb-6" style={{ fontFamily: 'Italianno, cursive' }}>
                    <span className="text-white">Chi</span>
                    <span className="text-[#378f68]">ngu</span>
                </h1>

                <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {loading && <p className="text-center text-gray-700">Logging in...</p>} 
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#378f68] focus:border-[#378f68]"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#378f68] focus:border-[#378f68]"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 text-white bg-[#378f68] hover:bg-opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-[#378f68]"
                                disabled={loading}
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center mt-6">
                        <div className="w-full border-t border-gray-300"></div>
                        <span className="px-3 text-gray-500">or</span>
                        <div className="w-full border-t border-gray-300"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-2 px-4 flex items-center justify-center border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#378f68]"
                        disabled={loading}
                    >
                        <img
                            src="https://img.icons8.com/color/24/000000/google-logo.png"
                            alt="Google logo"
                            className="mr-2"
                        />
                        Login with Google
                    </button>

                    <p className="text-center text-sm mt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-[#378f68] font-semibold">
                        Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
