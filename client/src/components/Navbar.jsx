import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import LogoutBnt from './auth/LogoutBnt';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const handleSelect = (e) => {
    const value = e.target.value;
    if (value) navigate(value);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-600">Diet Plan</Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="" className="text-gray-700 hover:text-green-600 font-medium transition">Home</NavLink>
            <NavLink to="#" className="text-gray-700 hover:text-green-600 font-medium transition">About</NavLink>

            <select
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleSelect}
              defaultValue=""
            >
              <option value="" disabled>Calculation</option>
              <option value="/calculateBMI">Calculate BMI</option>
              <option value="/calculateBMR">Calculate BMR</option>
              <option value="/calculateCalorieNeeds">Calculate Calorie Needs</option>
              <option value="/calculateTDEE">Calculate TDEE</option>
            </select>

          </div>
          {/* Auth Buttons */}

          <div className="hidden md:flex space-x-4">
            {!authStatus ? (
              <>
                <Link to="/login" className="px-4 py-2 rounded bg-green-500 text-white
             hover:bg-green-600 transition"
                >Log In</Link>

                <Link className="px-4 py-2 rounded border border-green-500 text-green-600
             hover:bg-green-50 transition"
                  to='/createAcc'
                >Sign In</Link>
              </>
            ) : (
              <LogoutBnt />
            )

            }


          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setMenuOpen(false)}
          ></div>
          {/* Sidebar */}
          <div className="relative w-64 bg-white shadow-lg h-full flex flex-col p-6 space-y-2 animate-slide-in-left z-40">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-green-600"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-gray-700 font-medium transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''
                }`
              }
              onClick={() => setMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="#"
              className="block px-3 py-2 rounded text-gray-700 font-medium transition hover:bg-green-100 hover:text-green-600"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <div className="border-t border-gray-200 my-2"></div>
            <NavLink
              to="/calculateBMI"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-gray-700 font-medium transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Calculate BMI
            </NavLink>
            <NavLink
              to="/calculateBMR"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-gray-700 font-medium transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Calculate BMR
            </NavLink>
            <NavLink
              to="/calculateCalorieNeeds"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-gray-700 font-medium transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Calculate Calorie Needs
            </NavLink>
            <NavLink
              to="/calculateTDEE"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-gray-700 font-medium transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Calculate TDEE
            </NavLink>
            <div className="border-t border-gray-200 my-2"></div>
             {!authStatus ? (
              <>
                <Link to="/login" className="px-4 py-2 rounded bg-green-500 text-white
             hover:bg-green-600 transition"
                >Log In</Link>

                <Link className="px-4 py-2 rounded border border-green-500 text-green-600
             hover:bg-green-50 transition"
                  to='/createAcc'
                >Sign In</Link>
              </>
            ) : (
              <LogoutBnt />
            )

            }
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar