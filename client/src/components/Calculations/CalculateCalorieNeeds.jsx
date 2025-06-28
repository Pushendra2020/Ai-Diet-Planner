import React, { useState } from 'react'
import { FaFire, FaBullseye } from 'react-icons/fa'
import { calculateCalorieNeeds } from './calculate';
const CalculateCalorieNeeds = () => {
  const [tedd, setTedd] = useState(0);
  const [goal, setGoal] = useState('gain');
  const [calorieNeeds, setCalorieNeeds] = useState(null);
  const handleForm = (e) => {
    e.preventDefault()
    const calorieNeeds_Value = calculateCalorieNeeds(tedd, goal);
    setCalorieNeeds(calorieNeeds_Value);
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-12">
      <div className="backdrop-blur-md bg-white/60 border border-blue-100 rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-2 flex items-center justify-center gap-2">
          <FaFire className="text-orange-400" /> Calorie Needs Calculator
        </h1>
        <p className="text-center text-gray-500 mb-8">Estimate your daily calorie needs based on your goal.</p>
        <form className="flex flex-col gap-6" onSubmit={handleForm}>
          <div>
            <label className="block text-blue-700 font-semibold mb-1" htmlFor="tedd">
              <span className="inline-flex items-center gap-2"><FaFire /> TEDD</span>
            </label>
            <input
              type="number"
              min={0}
              id="tedd"
              onChange={(e) => setTedd(e.target.value)}
              name="tedd"
              placeholder="Enter your TEDD in kilocalories"
              className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1" htmlFor="goal">
              <span className="inline-flex items-center gap-2"><FaBullseye /> Goal</span>
            </label>
            <select
              id="goal"
              name="goal"
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
              required
            >
              <option value="gain">Gain (Gaining Your Weight)</option>
              <option value="maintain">Maintain (Maintain Your Current Weight)</option>
              <option value="lose">Lose (Losing Your Weight)</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold text-lg shadow hover:from-blue-600 hover:to-green-500 transition"
          >
            Calculate Calorie Needs
          </button>
        </form>
        {calorieNeeds && (
          <div className="mt-8 text-center animate-fade-in-up">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Your Calorie Needs:</h2>
            <p className="text-3xl text-green-600">{calorieNeeds} kilocalories/day</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculateCalorieNeeds