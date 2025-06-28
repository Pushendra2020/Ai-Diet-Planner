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
        <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-12">
            <div className="backdrop-blur-md bg-white/60 border border-blue-100 rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto">
                <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-2 flex items-center justify-center gap-2">
                    <FaHeartbeat className="text-pink-400" /> BMI Calculator
                </h1>
                <p className="text-center text-gray-500 mb-8">Body Mass Index helps you understand your health status.</p>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-blue-700 font-semibold mb-1" htmlFor="weight">
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
                            name="height"
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter your height in centimeters"
                            step="0.01"
                            className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold text-lg shadow hover:from-blue-600 hover:to-green-500 transition"
                    >
                        Calculate BMI
                    </button>
                </form>
                {bmi && (
                    <div className="mt-8 text-center animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">Your BMI is: <span className="text-3xl text-green-600">{bmi}</span></h2>
                        <p className="text-lg mt-2">
                            {bmi < 18.5
                                ? <span className="text-blue-400 font-semibold">You are underweight.</span>
                                : bmi < 24.9
                                    ? <span className="text-green-500 font-semibold">You have a normal weight.</span>
                                    : bmi < 29.9
                                        ? <span className="text-yellow-500 font-semibold">You are overweight.</span>
                                        : <span className="text-red-500 font-semibold">You are obese.</span>}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalculateBMI