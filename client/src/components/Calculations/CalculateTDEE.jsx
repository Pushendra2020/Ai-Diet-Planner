import React, { useState } from 'react'
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
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center ">Calculate Your TDEE</h1>
        <form className="max-w-md mx-auto mt-8" onSubmit={handleForm}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
              BMR
            </label>
            <input
              type="number"
              min={0}
              id="bmr"
              onChange={(e) => setBmr(e.target.value)}
              name="bmr"
              placeholder="Enter your BMR in kilocalories"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
              Activity Level
            </label>
            <select
              id="activityLevel"
              name="activityLevel"
              onChange={(e) => setActivityLevel(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Calculate TDEE
          </button>
        </form>
        {tdee && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold">Your TDEE is: {tdee} kcal/day</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default CalculateTDEE