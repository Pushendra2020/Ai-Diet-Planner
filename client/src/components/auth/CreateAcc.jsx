import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const CreateAcc = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('Male')
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [goal, setGoal] = useState('lose');
    const [dietPreferences, setDietPreferences] = useState('vegetarian');
    const [allergies, setAllergies] = useState([]);
    const [currency, setCurrency] = useState('INR');
    const [mealsPerDay, setMealsPerDay] = useState(3);
    const [mealBudgets, setMealBudgets] = useState([0, 0, 0]);

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v2/users/register`, {
            username, email, password, age, gender, height, weight, activityLevel, goal,
            dietPreferences, allergies, mealsPerDay, mealBudgets, currency
        }).then(function (response) {
            console.log(response)
            navigate('/login');
        }).catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        setMealBudgets((prev) => {
            const arr = [...prev];
            arr.length = mealsPerDay;
            return arr.map((v, i) => arr[i] || 0);
        });
    }, [mealsPerDay]);

    return (
        <>
            <div className="container mx-auto px-4 pt-20 py-8 max-w-lg">
                <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Create Your Account</h1>
                <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Username:</label>
                        <input
                            type="text"
                            value={username}
                            placeholder='Enter Username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            placeholder='Enter Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
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
                        Create Account
                    </button>
                </form>
                <p className="text-center text-gray-600">
                    Already have an account?
                    <NavLink to="/login" className="text-green-600 hover:underline">
                        Login
                    </NavLink>
                </p>
            </div>
        </>
    )
}

export default CreateAcc