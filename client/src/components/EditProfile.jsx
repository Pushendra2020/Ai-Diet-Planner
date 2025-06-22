import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../app/authSlice.js';
const EditProfile = () => {
    const userData = useSelector((state) => state.auth.userData);
    const [age, setAge] = useState(userData.age || 0);
    const [gender, setGender] = useState(userData.gender)
    const [height, setHeight] = useState(userData.height || 0);
    const [weight, setWeight] = useState(userData.weight || 0);
    const [activityLevel, setActivityLevel] = useState(userData.activityLevel || 'sedentary');
    const [goal, setGoal] = useState(userData.goal || 'lose');
    const [dietPreferences, setDietPreferences] = useState(userData.dietaryPreferences || 'Vegetarian');
    const [allergies, setAllergies] = useState(userData.allergies || []);
    const [currency, setCurrency] = useState(userData.currency || 'INR');
    const [mealsPerDay, setMealsPerDay] = useState(userData.mealsPerDay || 3);
    const [mealBudgets, setMealBudgets] = useState(userData.mealBudgets || [0, 0, 0]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setMealBudgets((prev) => {
            const arr = [...prev];
            arr.length = mealsPerDay;
            return arr.map((v, i) => arr[i] || 0);
        });
    }, [mealsPerDay]);

    const handleForm = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/api/v2/users/updateUser', {
                age, gender, height, weight, activityLevel, goal, dietPreferences,
                allergies, mealsPerDay, mealBudgets, currency
            }, { withCredentials: true });
            if (response.data.success) {
                console.log(response.data);
                dispatch(login({ userData: response.data.data.user }));
                navigate('/profile');
            } else {
                console.error('Failed to update profile:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }
    return (
        <>
            <div className="container mx-auto px-4 pt-20 py-8 max-w-lg">
                <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Change Your Details</h1>
                <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Age:</label>
                        <input
                            type="number"
                            value={age}
                            placeholder='Enter Age'
                            min={0}

                            onChange={(e) => setAge(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Gender:</label>
                        <select
                            value={gender}
                            required
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Height (cm):</label>
                        <input
                            type="number"
                            value={height}
                            placeholder='Enter Height in CM'
                            min={0}
                            onChange={(e) => setHeight(e.target.value)}

                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Weight (kg):</label>
                        <input
                            type="number"
                            value={weight}
                            placeholder='Enter Weight in KG'
                            min={0}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Activity Level:</label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="sedentary">Sedentary Activity (No exercise)</option>
                            <option value="light">Light Activity</option>
                            <option value="moderate">Moderate Activity</option>
                            <option value="active">Very Active Activity</option>
                            <option value="very active">Super Active Activity</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Goal:</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="gain">Gain (Gaining Your Weight)</option>
                            <option value="maintain">Maintain (Maintain Your Current Weight)</option>
                            <option value="lose">Lose (Losing Your Weight)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Meals Per Day:</label>
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={mealsPerDay}
                            onChange={e => setMealsPerDay(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Currency:</label>
                        <select
                            value={currency}
                            onChange={e => setCurrency(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                        </select>
                    </div>

// Meal budget inputs:
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Meal Budgets (per meal, in {currency === 'INR' ? '₹' : '$'}):
                        </label>
                        {Array.from({ length: mealsPerDay }).map((_, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2">
                                <span>{currency === 'INR' ? '₹' : '$'}</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={mealBudgets[idx] || ''}
                                    onChange={e => {
                                        const newBudgets = [...mealBudgets];
                                        newBudgets[idx] = Number(e.target.value);
                                        setMealBudgets(newBudgets);
                                    }}
                                    placeholder={`Meal ${idx + 1} Budget`}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Diet Preferences:</label>
                        <select
                            value={dietPreferences}
                            onChange={(e) => setDietPreferences(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegon">Vegan</option>
                            <option value="Non-vegetarian">Non-vegetarian</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Allergies:</label>
                        <input
                            type="text"
                            value={allergies.join(', ')}
                            onChange={(e) => setAllergies(e.target.value.split(',').map(item => item.trim()))}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="e.g. Egg, Beef"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                    >
                        Save Changes
                    </button>
                </form>

            </div>
        </>
    )
}

export default EditProfile