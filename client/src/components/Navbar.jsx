// import React from 'react'

// export const Navbar = () => {
//   return (
//     <>
//       <div>
//         <div>
//             <h1>Diet Plan</h1>
//         </div>
//         <div>
//             <li><a href="#">Home</a></li>
//             <li><a href="#">About</a></li>
//             <li><a href="#">Calculation</a></li>
//         </div>
//         <div>
//             <button>Log In</button>
//             <button>Sign In</button>
//         </div>
//       </div>
//     </>
//   )
// }



import React, { useState } from 'react'

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-green-600">Diet Plan</h1>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition">Home</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition">About</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition">Calculation</a>
          </div>
          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">Log In</button>
            <button className="px-4 py-2 rounded border border-green-500 text-green-600 hover:bg-green-50 transition">Sign In</button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <a href="#" className="block px-3 py-2 rounded text-gray-700 hover:bg-green-100 hover:text-green-600 font-medium transition">Home</a>
            <a href="#" className="block px-3 py-2 rounded text-gray-700 hover:bg-green-100 hover:text-green-600 font-medium transition">About</a>
            <a href="#" className="block px-3 py-2 rounded text-gray-700 hover:bg-green-100 hover:text-green-600 font-medium transition">Calculation</a>
            <button className="w-full mt-2 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">Log In</button>
            <button className="w-full mt-2 px-4 py-2 rounded border border-green-500 text-green-600 hover:bg-green-50 transition">Sign In</button>
          </div>
        </div>
      )}
    </nav>
  )
}