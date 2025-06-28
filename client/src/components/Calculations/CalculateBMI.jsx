import React from 'react'
import { useState } from 'react'
import { FaWeight, FaRulerVertical, FaHeartbeat } from 'react-icons/fa'
import { calculateBMI } from './calculate.js'

const CalculateBMI = () => {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBmi] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const bmi = calculateBMI(weight, height);
        setBmi(bmi);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-24 pb-10 px-4">
            <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto">
                <h1 className="text-4xl font-extrabold text-green-700 dark:text-lime-300 text-center mb-2 flex items-center justify-center gap-2">
                    <FaHeartbeat className="text-pink-400 dark:text-pink-300" /> BMI Calculator
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Body Mass Index helps you understand your health status.</p>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-lime-400 dark:from-lime-600 dark:to-green-600 text-white font-bold text-lg shadow hover:from-green-600 hover:to-lime-500 dark:hover:from-lime-500 dark:hover:to-green-500 transition"
                    >
                        Calculate BMI
                    </button>
                </form>
                {bmi && (
                    <div className="mt-8 text-center animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-green-700 dark:text-lime-300 mb-2">Your BMI is: <span className="text-3xl text-lime-600 dark:text-lime-400">{bmi}</span></h2>
                        <p className="text-lg mt-2">
                            {bmi < 18.5
                                ? <span className="text-blue-400 dark:text-blue-300 font-semibold">You are underweight.</span>
                                : bmi < 24.9
                                    ? <span className="text-green-500 dark:text-green-400 font-semibold">You have a normal weight.</span>
                                    : bmi < 29.9
                                        ? <span className="text-yellow-500 dark:text-yellow-400 font-semibold">You are overweight.</span>
                                        : <span className="text-red-500 dark:text-red-400 font-semibold">You are obese.</span>}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalculateBMI