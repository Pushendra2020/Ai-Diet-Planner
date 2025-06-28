import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaUser, FaUtensils, FaMoneyBillWave, FaCalculator } from 'react-icons/fa'

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
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        // Stricter email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            toast.error('Please enter a valid email address.', {
                duration: 4000,
            });
            return;
        }
        setIsLoading(true);
        
        // Show loading toast
        const loadingToast = toast.loading('Creating your account...', {
            style: {
                background: '#1f2937',
                color: '#fff',
            },
        });

        try {
            const response = await axios.post(`https://ai-diet-planner-dcal.onrender.com/api/v2/users/register`, {
                username, email, password, age, gender, height, weight, activityLevel, goal,
                dietPreferences, allergies, mealsPerDay, mealBudgets, currency
            });
            
            // Dismiss loading toast and show success
            toast.dismiss(loadingToast);
            toast.success('Account created successfully! Please login.', {
                duration: 4000,
            });
            
            console.log(response);
            navigate('/login');
        } catch (error) {
            // Dismiss loading toast and show error
            toast.dismiss(loadingToast);
            
            const errorMessage = error.response?.data?.message || 'Failed to create account. Please try again.';
            toast.error(errorMessage, {
                duration: 5000,
            });
            
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setMealBudgets((prev) => {
            const arr = [...prev];
            arr.length = mealsPerDay;
            return arr.map((v, i) => arr[i] || 0);
        });
    }, [mealsPerDay]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-24 pb-10 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-500 to-lime-400 dark:from-lime-400 dark:to-green-500 bg-clip-text text-transparent mb-4">
                        Create Your Account
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Join ProDiet and start your personalized nutrition journey today!
                    </p>
                </div>
                
                <form onSubmit={handleForm} className="backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-green-700 dark:text-lime-300 flex items-center gap-2">
                            <FaUser /> Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    placeholder='Enter your username'
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    placeholder='Enter your email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                placeholder='Enter your password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Health Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-green-700 dark:text-lime-300 flex items-center gap-2">
                            <FaCalculator /> Health Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Age</label>
                                <input
                                    type="number"
                                    value={age}
                                    placeholder='Age'
                                    min={0}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Gender</label>
                                <select
                                    value={gender}
                                    required
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Height (cm)</label>
                                <input
                                    type="number"
                                    value={height}
                                    placeholder='Height in cm'
                                    min={0}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Weight (kg)</label>
                                <input
                                    type="number"
                                    value={weight}
                                    placeholder='Weight in kg'
                                    min={0}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Activity Level</label>
                                <select
                                    value={activityLevel}
                                    onChange={(e) => setActivityLevel(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                                >
                                    <option value="sedentary">Sedentary (Little or no exercise)</option>
                                    <option value="light">Lightly active (Light exercise/sports 1-3 days/week)</option>
                                    <option value="moderate">Moderately active (Moderate exercise/sports 3-5 days/week)</option>
                                    <option value="active">Very active (Hard exercise/sports 6-7 days a week)</option>
                                    <option value="very active">Extra active (Very hard exercise/sports & physical job)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Goal</label>
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                            >
                                <option value="gain">Gain Weight</option>
                                <option value="maintain">Maintain Current Weight</option>
                                <option value="lose">Lose Weight</option>
                            </select>
                        </div>
                    </div>

                    {/* Diet Preferences Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-green-700 dark:text-lime-300 flex items-center gap-2">
                            <FaUtensils /> Diet Preferences
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Diet Type</label>
                                <select
                                    value={dietPreferences}
                                    onChange={(e) => setDietPreferences(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                                >
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegon">Vegan</option>
                                    <option value="Non-vegetarian">Non-vegetarian</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Allergies</label>
                                <input
                                    type="text"
                                    value={allergies.join(', ')}
                                    onChange={(e) => setAllergies(e.target.value.split(',').map(item => item.trim()))}
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder="e.g. Eggs, Nuts, Shellfish"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Meal Planning Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-green-700 dark:text-lime-300 flex items-center gap-2">
                            <FaMoneyBillWave /> Meal Planning
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Meals Per Day</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={mealsPerDay}
                                    onChange={e => setMealsPerDay(Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Currency</label>
                                <select
                                    value={currency}
                                    onChange={e => setCurrency(e.target.value)}
                                    className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                                    required
                                >
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                                Meal Budgets (per meal, in {currency === 'INR' ? '₹' : '$'})
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {Array.from({ length: mealsPerDay }).map((_, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <span className="text-green-600 dark:text-lime-400 font-semibold">{currency === 'INR' ? '₹' : '$'}</span>
                                        <input
                                            type="number"
                                            min={0}
                                            value={mealBudgets[idx] || ''}
                                            onChange={e => {
                                                const newBudgets = [...mealBudgets];
                                                newBudgets[idx] = Number(e.target.value);
                                                setMealBudgets(newBudgets);
                                            }}
                                            placeholder={`Meal ${idx + 1}`}
                                            className="w-full px-4 py-3 border border-green-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full mt-6 px-6 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-green-500 to-lime-400 dark:from-lime-600 dark:to-green-600 hover:from-green-600 hover:to-lime-500 dark:hover:from-lime-500 dark:hover:to-green-500 hover:shadow-xl hover:scale-[1.02]'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Your Account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>
                
                <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-green-600 dark:text-lime-400 hover:text-green-700 dark:hover:text-lime-300 font-semibold transition-colors">
                        Login here
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default CreateAcc