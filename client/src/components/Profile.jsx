import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { FaMoneyBillWave, FaUser, FaHeartbeat, FaUtensils } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Profile = () => {
  const [userHealth, setUserHealth] = useState(null)
  const userData = useSelector((state) => state.auth.userData)
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const fetchUserHealthData = async () => {
    try {
      const response = await axios.get(`https://ai-diet-planner-dcal.onrender.com/api/v2/users/userHealth`, {
        withCredentials: true
      })
      if (response.data.success) {
        setUserHealth(response.data.data)
      } else {
        console.error('Failed to fetch user health data:', response.data.message)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    fetchUserHealthData()
  }, [])

  // Determine currency symbol
  const currency = userData.currency || 'INR';
  const currencySymbol = currency === 'USD' ? '$' : '₹';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950 pt-24 pb-10 px-2 md:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-lime-300 flex items-center gap-3 mb-2">
            <FaUser className="text-green-400 dark:text-lime-400" /> Profile
          </h1>
          <div className="flex gap-2">
            <NavLink
              to="/editprofile"
              className="inline-block px-6 py-2 text-white font-semibold bg-gradient-to-r from-green-500 to-lime-500 dark:from-lime-700 dark:to-green-700 rounded-full shadow hover:from-green-600 hover:to-lime-600 dark:hover:from-lime-600 dark:hover:to-green-600 transition"
            >
              ✏️ Edit Profile
            </NavLink>
            <button
              onClick={() => setShowChangePassword(true)}
              className="inline-block px-6 py-2 text-white font-semibold bg-gradient-to-r from-pink-500 to-red-400 dark:from-pink-700 dark:to-red-700 rounded-full shadow hover:from-pink-600 hover:to-red-500 dark:hover:from-pink-600 dark:hover:to-red-500 transition"
            >
              🔒 Change Password
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {/* Personal Info Card */}
          <section className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow border border-green-100 dark:border-gray-800 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-green-700 dark:text-lime-300 mb-2 flex items-center gap-2">
              <FaUtensils className="text-green-400 dark:text-lime-400" /> Personal Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base">
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Name:</span> <span className="text-gray-800 dark:text-gray-200">{userData.username}</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Email:</span> <span className="text-gray-800 dark:text-gray-200">{userData.email}</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Age:</span> <span className="text-gray-800 dark:text-gray-200">{userData.age}</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Gender:</span> <span className="text-gray-800 dark:text-gray-200">{userData.gender}</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Height:</span> <span className="text-gray-800 dark:text-gray-200">{userData.height} cm</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Weight:</span> <span className="text-gray-800 dark:text-gray-200">{userData.weight} kg</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Activity Level:</span> <span className="text-gray-800 dark:text-gray-200">{userData.activityLevel}</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Goal:</span> <span className="text-gray-800 dark:text-gray-200">{userData.goal}</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Dietary Pref.:</span> <span className="text-gray-800 dark:text-gray-200">{userData.dietPreferences}</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Allergies:</span> {userData.allergies && userData.allergies.length > 0 ? <span className="text-gray-800 dark:text-gray-200">{userData.allergies.join(', ')}</span> : <span className="italic text-gray-400">None</span>}</div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Meals/Day:</span> <span className="text-gray-800 dark:text-gray-200">{userData.mealsPerDay || 3}</span></div>
              <div><span className="font-semibold text-green-600 dark:text-lime-400">Currency:</span> <span className="text-gray-800 dark:text-gray-200">{currencySymbol} ({currency})</span></div>
              <div className="md:col-span-2">
                <span className="font-semibold text-green-600 dark:text-lime-400">Meal Budgets:</span>{' '}
                {userData.mealBudgets && userData.mealBudgets.length > 0 ? (
                  <span className="ml-2 flex flex-wrap gap-2 mt-1">
                    {userData.mealBudgets.map((budget, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded px-2 py-1 text-green-700 dark:text-lime-300 text-xs font-semibold">
                        <FaMoneyBillWave className="text-green-400 dark:text-lime-400" />
                        {currencySymbol}{budget} <span className="text-gray-400">(Meal {idx + 1})</span>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="italic text-gray-400 ml-1">Not specified</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
              <div>Created: {userData.createdAt && new Date(userData.createdAt).toLocaleString()}</div>
              <div>Updated: {userData.updatedAt && new Date(userData.updatedAt).toLocaleString()}</div>
            </div>
          </section>

          {/* Health Metrics Card */}
          <section className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow border border-green-100 dark:border-gray-800 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-green-700 dark:text-lime-300 mb-2 flex items-center gap-2">
              <FaHeartbeat className="text-pink-400 dark:text-pink-300" /> Health Metrics
            </h2>
            {userHealth ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base">
                <div><span className="font-semibold text-green-600 dark:text-lime-400">BMI:</span> <span className="text-gray-800 dark:text-gray-200">{userHealth.healthUser[0].bmi}</span></div>
                <div><span className="font-semibold text-green-600 dark:text-lime-400">BMR:</span> <span className="text-gray-800 dark:text-gray-200">{userHealth.healthUser[0].bmr}</span></div>
                <div><span className="font-semibold text-green-600 dark:text-lime-400">TDEE:</span> <span className="text-gray-800 dark:text-gray-200">{userHealth.healthUser[0].tdee}</span></div>
                <div><span className="font-semibold text-green-600 dark:text-lime-400">Calorie Need:</span> <span className="text-gray-800 dark:text-gray-200">{userHealth.healthUser[0].calorieNeed}</span></div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-4">
                <svg className="animate-spin h-5 w-5 text-green-400 dark:text-lime-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="italic">Loading health data...</span>
              </div>
            )}
          </section>
        </div>
      </div>
      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              onClick={() => {
                setShowChangePassword(false);
                setPasswordMessage(null);
                setOldPassword('');
                setNewPassword('');
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-lime-300">Change Password</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPasswordLoading(true);
                setPasswordMessage(null);
                
                // Show loading toast
                const loadingToast = toast.loading('Changing password...', {
                  style: {
                    background: '#1f2937',
                    color: '#fff',
                  },
                });
                
                try {
                  const res = await axios.post(
                    `https://ai-diet-planner-dcal.onrender.com/api/v2/users/changepassword`,
                    { oldPassword, newPassword },
                    { withCredentials: true }
                  );
                  if (res.data.success) {
                    // Dismiss loading toast and show success
                    toast.dismiss(loadingToast);
                    toast.success('Password changed successfully!', {
                      duration: 3000,
                    });
                    
                    setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
                    setOldPassword('');
                    setNewPassword('');
                  } else {
                    // Dismiss loading toast and show error
                    toast.dismiss(loadingToast);
                    toast.error(res.data.message || 'Failed to change password.', {
                      duration: 4000,
                    });
                    
                    setPasswordMessage({ type: 'error', text: res.data.message || 'Failed to change password.' });
                  }
                } catch (err) {
                  // Dismiss loading toast and show error
                  toast.dismiss(loadingToast);
                  const errorMessage = err.response?.data?.message || 'Failed to change password.';
                  toast.error(errorMessage, {
                    duration: 4000,
                  });
                  
                  setPasswordMessage({ type: 'error', text: errorMessage });
                }
                setPasswordLoading(false);
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="password"
                placeholder="Old Password"
                className="border rounded px-3 py-2"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className="border rounded px-3 py-2"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-4 py-2 transition"
                disabled={passwordLoading}
              >
                {passwordLoading ? 'Changing...' : 'Change Password'}
              </button>
              {passwordMessage && (
                <div className={`mt-2 text-sm ${passwordMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                  {passwordMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
