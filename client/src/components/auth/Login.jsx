import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../app/authSlice.js'
import toast from 'react-hot-toast'
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Show loading toast
        const loadingToast = toast.loading('Logging you in...', {
            style: {
                background: '#1f2937',
                color: '#fff',
            },
        });

        try {
            const response = await axios.post(`https://ai-diet-planner-dcal.onrender.com/api/v2/users/login`, { email, password }, {
                withCredentials: true,
            })
            console.log(response.data)
            if (response.data.success) {
                const user = response.data.data.loggedInUser
                console.log(response.data.data.loggedInUser)

                dispatch(login({ userData: user }));

                // Dismiss loading toast and show success
                toast.dismiss(loadingToast);
                toast.success(`Welcome back, ${user.username}!`, {
                    duration: 3000,
                });

                navigate('/')
            }
        } catch (error) {
            // Dismiss loading toast and show error
            toast.dismiss(loadingToast);
            
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(errorMessage, {
                duration: 4000,
            });
            
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-24 pb-10 px-4">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-500 to-lime-400 dark:from-lime-400 dark:to-green-500 bg-clip-text text-transparent mb-4">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Sign in to continue your nutrition journey
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 flex items-center gap-2">
                            <FaEnvelope className="text-green-600 dark:text-lime-400" /> Email Address
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 flex items-center gap-2">
                            <FaLock className="text-green-600 dark:text-lime-400" /> Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full mt-6 px-6 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-green-500 to-lime-400 dark:from-lime-600 dark:to-green-600 hover:from-green-600 hover:to-lime-500 dark:hover:from-lime-500 dark:hover:to-green-500 hover:shadow-xl hover:scale-[1.02]'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Signing In...
                            </>
                        ) : (
                            <>
                                <FaSignInAlt />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
                
                <div className="mt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Don't have an account yet?
                    </p>
                    <NavLink 
                        to="/createAcc" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-500 to-green-500 dark:from-green-600 dark:to-lime-600 hover:from-lime-600 hover:to-green-600 dark:hover:from-green-500 dark:hover:to-lime-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <FaUserPlus />
                        Create Account
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Login