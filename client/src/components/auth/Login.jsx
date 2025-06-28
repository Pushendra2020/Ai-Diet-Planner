import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../app/authSlice.js'
import toast from 'react-hot-toast'

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
        <div className="container mx-auto px-4 py-8 max-w-lg pt-20 min-h-screen bg-white dark:bg-gray-900">
            <h2 className="text-3xl font-bold text-green-600 dark:text-lime-300 mb-8 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5 border border-green-100 dark:border-gray-800">
                <div>
                    <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-4 px-4 py-2 rounded text-white font-semibold transition ${
                        isLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-500 hover:bg-green-600 dark:bg-lime-700 dark:hover:bg-lime-600'
                    }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Logging In...
                        </div>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
            <p className="text-center text-gray-600 dark:text-gray-300">
                Don't have an account?
                <NavLink to="/createAcc" className="text-green-600 dark:text-lime-400 hover:underline">
                    Register
                </NavLink>
            </p>
        </div>
    )
}

export default Login