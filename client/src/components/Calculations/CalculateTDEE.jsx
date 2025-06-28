import React, { useState } from 'react'
import { FaHeartbeat, FaRunning, FaFire } from 'react-icons/fa'
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
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-12">
      <div className="backdrop-blur-md bg-white/60 border border-blue-100 rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-2 flex items-center justify-center gap-2">
          <FaFire className="text-orange-400" /> TDEE Calculator
        </h1>
        <p className="text-center text-gray-500 mb-8">Total Daily Energy Expenditure estimates your daily calorie burn.</p>
        <form className="flex flex-col gap-6" onSubmit={handleForm}>
          <div>
            <label className="block text-blue-700 font-semibold mb-1" htmlFor="bmr">
              <span className="inline-flex items-center gap-2"><FaHeartbeat /> BMR</span>
            </label>
            <input
              type="number"
              min={0}
              id="bmr"
              onChange={(e) => setBmr(e.target.value)}
              name="bmr"
              placeholder="Enter your BMR in kilocalories"
              className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1" htmlFor="activityLevel">
              <span className="inline-flex items-center gap-2"><FaRunning /> Activity Level</span>
            </label>
            <select
              id="activityLevel"
              name="activityLevel"
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
              required
            >
              <option value="sedentary">Sedentary Activity (No exercise)</option>
              <option value="light">Light Activity</option>
              <option value="moderate">Moderate Activity</option>
              <option value="active">Very Active Activity</option>
              <option value="very active">Super Active Activity</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold text-lg shadow hover:from-blue-600 hover:to-green-500 transition"
          >
            Calculate TDEE
          </button>
        </form>
        {tdee && (
          <div className="mt-8 text-center animate-fade-in-up">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Your TDEE is: <span className="text-3xl text-green-600">{tdee} kcal/day</span></h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculateTDEE