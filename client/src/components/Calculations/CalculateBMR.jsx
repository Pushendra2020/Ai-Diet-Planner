import React from 'react'
import { useState } from 'react'
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
    <>
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">Calculate Your BMR</h1>
        <form className="max-w-md mx-auto mt-8" onSubmit={handleForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                type="number"
                min={0}
                onChange={(e) => setWeight(e.target.value)}
                id="weight"
                name="weight"

                placeholder="Enter your weight in kilograms"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                Height (cm)
              </label>
              <input
                type="number"
                min={0}
                id="height"
                onChange={(e) => setHeight(e.target.value)}
                name="height"
                placeholder="Enter your height in centimeters"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                Age (years)
              </label>
              <input
                type="number"
                min={0}
                id="age"
                onChange={(e) => setAge(e.target.value)}
                name="age"
                placeholder="Enter your Age in years"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >

                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Calculate BMR
          </button>
        </form>
        {bmr && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">Your BMR is: {bmr} kcal/day</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default CalculateBMR