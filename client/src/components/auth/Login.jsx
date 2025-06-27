import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../app/authSlice.js'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v2/users/login`, { email, password }, {
                withCredentials: true,
            })
            console.log(response.data)
            if (response.data.success) {
                const user = response.data.data.loggedInUser
                console.log(response.data.data.loggedInUser)

                dispatch(login({ userData: user }));

                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg pt-20">
            <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                >
                    Login
                </button>
            </form>
            <p className="text-center text-gray-600">
                Don't have an account?
                <NavLink to="/createAcc" className="text-green-600 hover:underline">
                    Register
                </NavLink>
            </p>
        </div>
    )
}

export default Login