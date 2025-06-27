import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { FaUtensils, FaLeaf, FaFireAlt, FaMoneyBillWave, FaBalanceScale, FaCircle, FaRobot, FaTimes } from 'react-icons/fa';
import ChatWithAI from './ChatWithAI';

const Diet = () => {
    const [dietPlan, setDietPlan] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [healthInfo, setHealthInfo] = useState(null)
    const [chatOpen, setChatOpen] = useState(false)
    const userData = useSelector((state) => state.auth.userData)

    const fetchDietPlan = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(`https://ai-diet-planner-dcal.onrender.com/api/v2/diet/generate`,  {
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

    const fetchHealthInfo = async () => {
        try {
            const response = await axios.get(`https://ai-diet-planner-dcal.onrender.com/api/v2/users/userHealth`, { withCredentials: true })
            if (response.data.success) {
                setHealthInfo(response.data.data.healthUser[0])
            }
        } catch (error) {
            setHealthInfo(null)
        }
    }

    useEffect(() => {
        fetchDietPlan();
        fetchHealthInfo();
        document.title = 'Diet Plan'
    }, [])

    // Determine currency symbol
    const currency = dietPlan?.currency || 'INR';
    const currencySymbol = currency === 'USD' ? '$' : '₹';

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 pt-32 pb-10 px-2 md:px-4 relative overflow-x-hidden">
            {/* Glassy header (not fixed) */}
            <div className="z-20 bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-4 flex flex-col items-center gap-2 border border-green-200 animate-fade-in-down mb-8">
                <h1 className="text-4xl font-extrabold text-green-700 flex items-center gap-3 drop-shadow-lg tracking-tight animate-bounce-slow">
                    <FaLeaf className="text-green-500 animate-spin-slow" /> Diet Plan
                </h1>
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-base animate-fade-in">
                    <FaMoneyBillWave className="text-green-500 animate-wiggle" />
                    Currency: {currencySymbol} ({currency})
                </span>
            </div>
            <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-green-100 animate-fade-in-up">
                <p className='text-gray-600 mb-8 text-center text-lg font-medium'>Your personalized, budget-friendly meal plan powered by AI.</p>
                {loading && <div className="text-blue-500 text-center text-lg animate-pulse">Loading...</div>}
                {error && <div className="text-red-500 text-center text-lg animate-shake">{error}</div>}
                {dietPlan && (
                    <div className='mt-4'>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                            <h2 className='text-2xl font-bold text-green-700 flex items-center gap-2 animate-fade-in-left'>
                                <FaUtensils className="text-green-400 animate-pop" /> Your Diet Plan
                            </h2>
                            <div className="bg-green-50/80 border border-green-200 rounded-xl px-4 py-2 flex items-center gap-2 text-green-700 font-bold text-lg shadow-sm animate-fade-in-right">
                                <FaFireAlt className="text-orange-400 animate-flicker" />
                                Total Calories: <span className="ml-1">{dietPlan.totalCalories}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-4 text-gray-700 animate-fade-in">Meals</h3>
                            <div className="relative pl-8">
                                {dietPlan.meals && dietPlan.meals.map((meal, idx) => (
                                    <div key={idx} className="relative flex items-start mb-12 last:mb-0 group">
                                        {idx !== dietPlan.meals.length - 1 && (
                                            <span className="absolute left-4 top-8 w-1 h-[calc(100%-2.5rem)] bg-gradient-to-b from-green-300 to-green-100 rounded-full z-0"></span>
                                        )}
                                        <span className="absolute left-0 top-6 z-10 flex items-center justify-center w-8 h-8 bg-white border-4 border-green-400 rounded-full shadow animate-pop-in">
                                            <FaCircle className="text-green-400 animate-pulse text-lg" />
                                        </span>
                                        <div className="ml-12 w-full bg-white/80 backdrop-blur-lg border border-green-200 rounded-2xl shadow-xl p-6 flex flex-col gap-4 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-out group cursor-pointer animate-pop-in">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-200 to-green-100 text-green-800 text-xs font-bold uppercase tracking-wide shadow group-hover:scale-105 group-hover:bg-green-300 transition-transform">
                                                    {meal.mealType}
                                                </span>
                                                <span className="font-bold text-lg text-green-700 group-hover:text-green-900 transition-colors duration-200">{meal.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                                                <FaBalanceScale className="text-green-500 animate-bounce-x" />
                                                <span className="font-semibold">Quantity:</span> {meal.quantity || <span className="italic text-gray-400">N/A</span>}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-sm">
                                                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold flex items-center gap-1 animate-flicker">
                                                    <FaFireAlt className="inline-block" /> {meal.calories} kcal
                                                </span>
                                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold animate-pop-in">
                                                    Protein: {meal.macros?.protein}g
                                                </span>
                                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold animate-pop-in">
                                                    Carbs: {meal.macros?.carbs}g
                                                </span>
                                                <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded font-semibold animate-pop-in">
                                                    Fat: {meal.macros?.fat}g
                                                </span>
                                                {typeof meal.estimatedCost === 'number' && (
                                                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded font-semibold flex items-center gap-1 animate-wiggle">
                                                        <FaMoneyBillWave className="inline-block" />
                                                        {currencySymbol}{meal.estimatedCost}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {!loading && !dietPlan && !error && (
                    <div className="text-gray-600 mt-4 text-center animate-fade-in">No diet plan available.</div>
                )}
            </div>
            {/* Floating Chat Button */}
            <button
                className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl transition-all duration-200"
                onClick={() => setChatOpen(true)}
                aria-label="Open AI Chat"
            >
                <FaRobot />
            </button>
            {/* Chat Modal */}
            {chatOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="relative w-full max-w-lg mx-auto bg-white/90 rounded-2xl shadow-2xl p-0 md:p-4 animate-fade-in-up">
                        <button
                            className="absolute top-2 right-2 text-green-600 hover:text-green-800 text-2xl p-2 rounded-full focus:outline-none"
                            onClick={() => setChatOpen(false)}
                            aria-label="Close Chat"
                        >
                            <FaTimes />
                        </button>
                        <ChatWithAI userData={userData} dietPlane={dietPlan} healthInfo={healthInfo} />
                    </div>
                </div>
            )}
            {/* Custom Animations (Tailwind plugin or custom CSS required) */}
            <style>{`
                @keyframes fade-in-down { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: none; } }
                .animate-fade-in-down { animation: fade-in-down 0.7s cubic-bezier(.4,0,.2,1) both; }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
                .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both; }
                @keyframes fade-in-left { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: none; } }
                .animate-fade-in-left { animation: fade-in-left 0.7s cubic-bezier(.4,0,.2,1) both; }
                @keyframes fade-in-right { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: none; } }
                .animate-fade-in-right { animation: fade-in-right 0.7s cubic-bezier(.4,0,.2,1) both; }
                @keyframes pop-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
                .animate-pop-in { animation: pop-in 0.5s cubic-bezier(.4,0,.2,1) both; }
                @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.12); } 100% { transform: scale(1); } }
                .animate-pop { animation: pop 1.2s infinite cubic-bezier(.4,0,.2,1); }
                @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                .animate-bounce-slow { animation: bounce-slow 2.2s infinite; }
                @keyframes bounce-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
                .animate-bounce-x { animation: bounce-x 1.8s infinite; }
                @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
                .animate-flicker { animation: flicker 1.2s infinite; }
                @keyframes wiggle { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
                .animate-wiggle { animation: wiggle 1.5s infinite; }
                @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-8px); } 40%, 80% { transform: translateX(8px); } }
                .animate-shake { animation: shake 0.5s; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 1s both; }
            `}</style>
        </div>
    )
}

export default Diet