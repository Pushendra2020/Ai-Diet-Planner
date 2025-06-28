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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-24 pb-10 px-4">
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-green-700 dark:text-lime-300 text-center mb-2 flex items-center justify-center gap-2">
          <FaFire className="text-orange-400 dark:text-orange-300" /> Calorie Needs Calculator
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Calculate your daily calorie needs based on your activity level and goals.</p>
        <form className="flex flex-col gap-6" onSubmit={handleForm}>
          <div>
            <label className="block text-green-700 dark:text-lime-300 font-semibold mb-1" htmlFor="tedd">
              <span className="inline-flex items-center gap-2"><FaFire /> TEDD</span>
            </label>
            <input
              type="number"
              min={0}
              id="tedd"
              onChange={(e) => setTedd(e.target.value)}
              name="tedd"
              placeholder="Enter your TEDD in kilocalories"
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-lime-400 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 dark:text-lime-300 font-semibold mb-1" htmlFor="goal">
              <span className="inline-flex items-center gap-2"><FaBullseye /> Goal</span>
            </label>
            <select
              id="goal"
              name="goal"
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-lime-400 text-gray-700 dark:text-gray-200"
              required
            >
              <option value="gain">Gain (Gaining Your Weight)</option>
              <option value="maintain">Maintain (Maintain Your Current Weight)</option>
              <option value="lose">Lose (Losing Your Weight)</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-lime-400 dark:from-lime-600 dark:to-green-600 text-white font-bold text-lg shadow hover:from-green-600 hover:to-lime-500 dark:hover:from-lime-500 dark:hover:to-green-500 transition"
          >
            Calculate Calorie Needs
          </button>
        </form>
        {calorieNeeds && (
          <div className="mt-8 text-center animate-fade-in-up">
            <h2 className="text-2xl font-bold text-green-700 dark:text-lime-300 mb-2">Your Daily Calorie Needs: <span className="text-3xl text-lime-600 dark:text-lime-400">{calorieNeeds}</span></h2>
            <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
              This is the number of calories you should consume daily to {goal} weight.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculateCalorieNeeds