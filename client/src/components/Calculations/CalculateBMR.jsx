import React from 'react'
import { useState } from 'react'
import { FaWeight, FaRulerVertical, FaUser, FaVenusMars, FaHeartbeat } from 'react-icons/fa'
import { calculateBMR } from './calculate.js'
// import { useNavigate } from 'react-router-dom'
const CalculateBMR = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('Male');
  const [bmr, setBmr] = useState(null);
  const handleForm = (e) => {
    e.preventDefault();
    const bmrValue = calculateBMR(weight, height, age, gender);
    setBmr(bmrValue);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 py-10">
      <div className="backdrop-blur-md bg-white/60 border border-blue-100 rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-2 flex items-center justify-center gap-2">
          <FaHeartbeat className="text-pink-400" /> BMR Calculator
        </h1>
        <p className="text-center text-gray-500 mb-8">Basal Metabolic Rate estimates your daily calorie needs at rest.</p>
        <form className="flex flex-col gap-6" onSubmit={handleForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-700 font-semibold mb-1" htmlFor="weight">
                <span className="inline-flex items-center gap-2"><FaWeight /> Weight (kg)</span>
              </label>
              <input
                type="number"
                min={0}
                onChange={(e) => setWeight(e.target.value)}
                id="weight"
                name="weight"
                placeholder="Enter your weight in kilograms"
                className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1" htmlFor="height">
                <span className="inline-flex items-center gap-2"><FaRulerVertical /> Height (cm)</span>
              </label>
              <input
                type="number"
                min={0}
                id="height"
                onChange={(e) => setHeight(e.target.value)}
                name="height"
                placeholder="Enter your height in centimeters"
                className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-700 font-semibold mb-1" htmlFor="age">
                <span className="inline-flex items-center gap-2"><FaUser /> Age (years)</span>
              </label>
              <input
                type="number"
                min={0}
                id="age"
                onChange={(e) => setAge(e.target.value)}
                name="age"
                placeholder="Enter your Age in years"
                className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1" htmlFor="gender">
                <span className="inline-flex items-center gap-2"><FaVenusMars /> Gender</span>
              </label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold text-lg shadow hover:from-blue-600 hover:to-green-500 transition"
          >
            Calculate BMR
          </button>
        </form>
        {bmr && (
          <div className="mt-8 text-center animate-fade-in-up">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Your BMR is: <span className="text-3xl text-green-600">{bmr} kcal/day</span></h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculateBMR