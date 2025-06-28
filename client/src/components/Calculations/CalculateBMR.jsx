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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-24 pb-10 px-4">
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-green-700 dark:text-lime-300 text-center mb-2 flex items-center justify-center gap-2">
          <FaHeartbeat className="text-pink-400" /> BMR Calculator
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Basal Metabolic Rate tells you how many calories your body burns at rest.</p>
        <form className="flex flex-col gap-6" onSubmit={handleForm}>
          <div>
            <label className="block text-green-700 dark:text-lime-300 font-semibold mb-1" htmlFor="weight">
              <span className="inline-flex items-center gap-2"><FaWeight /> Weight (kg)</span>
            </label>
            <input
              type="number"
              min={0}
              id="weight"
              name="weight"
              step="0.01"
              placeholder="Enter your weight in kilograms"
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-lime-400 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 dark:text-lime-300 font-semibold mb-1" htmlFor="height">
              <span className="inline-flex items-center gap-2"><FaRulerVertical /> Height (cm)</span>
            </label>
            <input
              type="number"
              min={0}
              id="height"
              name="height"
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height in centimeters"
              step="0.01"
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-lime-400 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 dark:text-lime-300 font-semibold mb-1" htmlFor="age">
              <span className="inline-flex items-center gap-2"><FaUser /> Age</span>
            </label>
            <input
              type="number"
              min={0}
              id="age"
              name="age"
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-lime-400 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 dark:text-lime-300 font-semibold mb-1" htmlFor="gender">
              <span className="inline-flex items-center gap-2"><FaVenusMars /> Gender</span>
            </label>
            <select
              id="gender"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-lime-400 text-gray-700 dark:text-gray-200"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-lime-400 dark:from-lime-600 dark:to-green-600 text-white font-bold text-lg shadow hover:from-green-600 hover:to-lime-500 dark:hover:from-lime-500 dark:hover:to-green-500 transition"
          >
            Calculate BMR
          </button>
        </form>
        {bmr && (
          <div className="mt-8 text-center animate-fade-in-up">
            <h2 className="text-2xl font-bold text-green-700 dark:text-lime-300 mb-2">Your BMR is: <span className="text-3xl text-lime-600 dark:text-lime-400">{bmr}</span></h2>
            <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
              This is the number of calories your body burns at rest to maintain basic life functions.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculateBMR