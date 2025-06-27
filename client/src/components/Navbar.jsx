import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import LogoutBnt from './auth/LogoutBnt';
import { FaChevronDown, FaCalculator } from 'react-icons/fa';

const calculationLinks = [
  { to: '/calculateBMI', label: 'Calculate BMI' },
  { to: '/calculateBMR', label: 'Calculate BMR' },
  { to: '/calculateCalorieNeeds', label: 'Calculate Calorie Needs' },
  { to: '/calculateTDEE', label: 'Calculate TDEE' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="backdrop-blur-md bg-white/70 border-b border-green-100 shadow-lg fixed w-full z-20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">ProDiet</Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" className={({isActive}) => `text-gray-700 hover:text-green-600 font-semibold transition ${isActive ? 'text-green-600' : ''}`}>Home</NavLink>
            <NavLink to="/about" className="text-gray-700 hover:text-green-600 font-semibold transition">About</NavLink>
            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 transition focus:outline-none focus:ring-2 focus:ring-green-200"
                onClick={() => setDropdownOpen((v) => !v)}
                type="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <FaCalculator className="text-green-400" /> Calculation <FaChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-xl bg-white/90 border border-green-100 z-50 animate-fade-in-up">
                  {calculationLinks.map(link => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({isActive}) => `block px-5 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium rounded-xl transition ${isActive ? 'text-green-600 bg-green-50' : ''}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            {authStatus && (
              <>
                <NavLink
                  to='/profile'
                  className={({isActive}) => `text-gray-700 hover:text-green-600 font-semibold transition ${isActive ? 'text-green-600' : ''}`}
                >Profile</NavLink>
                <NavLink
                  to='/plan'
                  className={({isActive}) => `text-gray-700 hover:text-green-600 font-semibold transition ${isActive ? 'text-green-600' : ''}`}
                >Diet Plan</NavLink>
              </>
            )}
          </div>
          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {!authStatus ? (
              <>
                <Link to="/login" className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-lime-400 text-white font-semibold shadow hover:from-green-600 hover:to-lime-500 transition">Log In</Link>
                <Link className="px-5 py-2 rounded-lg border border-green-500 text-green-600 font-semibold hover:bg-green-50 transition" to='/createAcc'>Sign Up</Link>
              </>
            ) : (
              <LogoutBnt />
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-7 w-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
          {/* Sidebar */}
          <div className="fixed top-0 left-0 w-full max-w-xs min-h-screen bg-white/95 shadow-2xl flex flex-col p-7 space-y-2 animate-slide-in-left z-50 rounded-r-3xl border-r border-green-100 overflow-y-auto pt-16">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-green-600 z-10"
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
                `block px-6 py-4 rounded-lg text-gray-700 font-semibold transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''}`
              }
              onClick={() => setMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-6 py-4 rounded-lg text-gray-700 font-semibold transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            {authStatus && (
              <>
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    `block px-6 py-4 rounded-lg text-gray-700 font-semibold transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >Profile</NavLink>
                <NavLink
                  to='/plan'
                  className={({ isActive }) =>
                    `block px-6 py-4 rounded-lg text-gray-700 font-semibold transition hover:bg-green-100 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >Diet Plan</NavLink>
              </>
            )}
            <div className="border-t border-gray-200 my-2"></div>
            {/* Calculation Dropdown for Mobile */}
            <div className="mb-2">
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-1"><FaCalculator className="text-green-400" /> Calculation</div>
              <div className="flex flex-col gap-1">
                {calculationLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({isActive}) => `block px-6 py-4 rounded-lg text-gray-700 font-medium transition hover:bg-green-50 hover:text-green-600 ${isActive ? 'text-green-600 bg-green-50' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            {!authStatus ? (
              <>
                <Link to="/login" className="px-6 py-4 rounded-lg bg-gradient-to-r from-green-500 to-lime-400 text-white font-semibold shadow hover:from-green-600 hover:to-lime-500 transition block text-center">Log In</Link>
                <Link className="px-6 py-4 rounded-lg border border-green-500 text-green-600 font-semibold hover:bg-green-50 transition block text-center" to='/createAcc'>Sign Up</Link>
              </>
            ) : (
              <LogoutBnt />
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar