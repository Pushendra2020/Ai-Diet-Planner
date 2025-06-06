import React, { useState } from 'react'
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
    <>
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">Calculate Your Calorie Needs</h1>
        <form className="max-w-md w-full mx-auto mt-8" onSubmit={handleForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                TEDD
              </label>
              <input
                type="number"
                min={0}
                id="tedd"
                onChange={(e) => setTedd(e.target.value)}
                name="tedd"
                placeholder="Enter your TEDD in kilocalories"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activityLevel">
                Goal
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                onChange={(e) => setGoal(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="gain">Gain (Gaining Your Weight)</option>
                <option value="maintain">Maintain (Maintain Yous current Weight)</option>
                <option value="lose">Lose (Losing Your Weight)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Calculate Calorie Needs
          </button>
        </form>
        {calorieNeeds && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">Your Calorie Needs:</h2>
            <p className="text-lg">{calorieNeeds} kilocalories/day</p>
          </div>
        )}
      </div>
    </>
  )
}

export default CalculateCalorieNeeds