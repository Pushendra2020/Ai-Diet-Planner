import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUtensils, FaLeaf, FaFireAlt } from 'react-icons/fa';

const Diet = () => {
    const [dietPlan, setDietPlan] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchDietPlan = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get('http://localhost:5000/api/v2/diet/generate',  {
                withCredentials: true,
            });
            setDietPlan(response.data.data.newPlan)
        } catch (error) {
            setError('Error fetching diet plan')
            setDietPlan(null)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchDietPlan();
        document.title = 'Diet Plan'
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-28 pb-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-green-100">
                <h1 className="text-4xl font-bold text-center text-green-600 mb-2 drop-shadow-md flex items-center justify-center gap-2">
                    <FaLeaf className="text-green-500" /> Diet Plan
                </h1>
                <p className='text-gray-500 mb-8 text-center text-lg'>Here you can get your personalized diet plan powered by AI.</p>
                {loading && <div className="text-blue-500 text-center text-lg">Loading...</div>}
                {error && <div className="text-red-500 text-center text-lg">{error}</div>}
                {dietPlan && (
                    <div className='mt-4'>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                            <h2 className='text-2xl font-semibold text-green-700 flex items-center gap-2'>
                                <FaUtensils className="text-green-400" /> Your Diet Plan
                            </h2>
                            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 flex items-center gap-2 text-green-700 font-bold text-lg shadow-sm">
                                <FaFireAlt className="text-orange-400" />
                                Total Calories: <span className="ml-1">{dietPlan.totalCalories}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-4 text-gray-700">Meals</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {dietPlan.meals && dietPlan.meals.map((meal, idx) => (
                                    <div key={idx} className="bg-green-50 border border-green-200 rounded-2xl shadow-md p-5 flex flex-col gap-2 hover:shadow-lg transition">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800 text-xs font-bold uppercase tracking-wide">
                                                {meal.mealType}
                                            </span>
                                            <span className="font-bold text-lg text-green-700">{meal.name}</span>
                                        </div>
                                        <div className="text-sm text-gray-700 mb-1">
                                            <span className="font-semibold">Ingredients:</span>
                                            {meal.ingredients && Array.isArray(meal.ingredients) && meal.ingredients.length > 0 ? (
                                                <ul className="list-disc list-inside ml-3 mt-1">
                                                    {meal.ingredients.map((ingredient, i) => (
                                                        <li key={i}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="ml-1 italic text-gray-400">No ingredients listed</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold flex items-center gap-1">
                                                <FaFireAlt className="inline-block" /> {meal.calories} kcal
                                            </span>
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                                                Protein: {meal.macros?.protein}g
                                            </span>
                                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">
                                                Carbs: {meal.macros?.carbs}g
                                            </span>
                                            <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded font-semibold">
                                                Fat: {meal.macros?.fat}g
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {!loading && !dietPlan && !error && (
                    <div className="text-gray-600 mt-4 text-center">No diet plan available.</div>
                )}
            </div>
        </div>
    )
}

export default Diet