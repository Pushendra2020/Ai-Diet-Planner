import React, { useState } from 'react'
import { FaHeartbeat, FaRunning, FaFire, FaCalculator } from 'react-icons/fa'
import { calculateTDEE } from './calculate.js'

const CalculateTDEE = () => {
  const [bmr, setBmr] = useState(0);
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [tdee, setTdee] = useState(null);
  const handleForm = (e) => {
    e.preventDefault();
    const tdeevalue = calculateTDEE(bmr, activityLevel);
    setTdee(tdeevalue);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-24 pb-10 px-4">
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-green-700 dark:text-lime-300 text-center mb-2 flex items-center justify-center gap-2">
          <FaFire className="text-orange-400 dark:text-orange-300" /> TDEE Calculator
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Total Daily Energy Expenditure estimates your total daily calorie burn.</p>
        <form className="flex flex-col gap-6" onSubmit={handleForm}>
          <div>
            <label className="block text-green-700 dark:text-lime-300 font-semibold mb-1" htmlFor="bmr">
              <span className="inline-flex items-center gap-2"><FaCalculator /> BMR (Basal Metabolic Rate)</span>
            </label>
            <input
              type="number"
              min={0}
              id="bmr"
              name="bmr"
              step="0.01"
              placeholder="Enter your BMR"
              onChange={(e) => setBmr(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-lime-400 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 dark:text-lime-300 font-semibold mb-1" htmlFor="activityLevel">
              <span className="inline-flex items-center gap-2"><FaRunning /> Activity Level</span>
            </label>
            <select
              id="activityLevel"
              name="activityLevel"
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-lime-400 text-gray-700 dark:text-gray-200"
              required
            >
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary (Little or no exercise)</option>
              <option value="light">Lightly active (Light exercise/sports 1-3 days/week)</option>
              <option value="moderate">Moderately active (Moderate exercise/sports 3-5 days/week)</option>
              <option value="active">Very active (Hard exercise/sports 6-7 days a week)</option>
              <option value="very active">Extra active (Very hard exercise/sports & physical job)</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-lime-400 dark:from-lime-600 dark:to-green-600 text-white font-bold text-lg shadow hover:from-green-600 hover:to-lime-500 dark:hover:from-lime-500 dark:hover:to-green-500 transition"
          >
            Calculate TDEE
          </button>
        </form>
        {tdee && (
          <div className="mt-8 text-center animate-fade-in-up">
            <h2 className="text-2xl font-bold text-green-700 dark:text-lime-300 mb-2">Your TDEE is: <span className="text-3xl text-lime-600 dark:text-lime-400">{tdee}</span></h2>
            <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
              This is the total number of calories you burn daily including all activities.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculateTDEE