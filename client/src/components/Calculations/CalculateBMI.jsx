import React from 'react'
import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
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
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mt-10">
                    Calculate Your BMI
                </h1>
                <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            min={0}
                            id="weight"
                            name="weight"
                            step="0.01"
                            placeholder="Enter your weight in kilograms"
                            onChange={(e) => setWeight(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                            Height (Cm)
                        </label>
                        <input
                            type="number"
                            min={0}
                            id="height"
                            name="height"
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter your height in centimeters"
                            step="0.01"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Calculate BMI
                    </button>
                </form>
                {bmi && (
                    <div className="mt-6 text-center">
                        <h2 className="text-2xl font-bold">Your BMI is: {bmi}</h2>
                        <p className="text-lg mt-2">
                            {bmi < 18.5
                                ? "You are underweight."
                                : bmi < 24.9
                                    ? "You have a normal weight."
                                    : bmi < 29.9
                                        ? "You are overweight."
                                        : "You are obese."}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default CalculateBMI