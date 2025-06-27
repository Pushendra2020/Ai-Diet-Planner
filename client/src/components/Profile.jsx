import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { FaMoneyBillWave, FaUser, FaHeartbeat, FaUtensils } from 'react-icons/fa'

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
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v2/users/userHealth`, {
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-10 px-2 md:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 flex items-center gap-3 mb-2">
            <FaUser className="text-green-400" /> Profile
          </h1>
          <div className="flex gap-2">
            <NavLink
              to="/editprofile"
              className="inline-block px-6 py-2 text-white font-semibold bg-gradient-to-r from-green-500 to-lime-500 rounded-full shadow hover:from-green-600 hover:to-lime-600 transition"
            >
              ✏️ Edit Profile
            </NavLink>
            <button
              onClick={() => setShowChangePassword(true)}
              className="inline-block px-6 py-2 text-white font-semibold bg-gradient-to-r from-pink-500 to-red-400 rounded-full shadow hover:from-pink-600 hover:to-red-500 transition"
            >
              🔒 Change Password
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {/* Personal Info Card */}
          <section className="bg-white/80 rounded-2xl p-6 shadow border border-green-100 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-green-700 mb-2 flex items-center gap-2">
              <FaUtensils className="text-green-400" /> Personal Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base">
              <div><span className="font-semibold text-green-600">Name:</span> {userData.username}</div>
              <div><span className="font-semibold text-green-600">Email:</span> {userData.email}</div>
              <div><span className="font-semibold text-green-600">Age:</span> {userData.age}</div>
              <div><span className="font-semibold text-green-600">Gender:</span> {userData.gender}</div>
              <div><span className="font-semibold text-green-600">Height:</span> {userData.height} cm</div>
              <div><span className="font-semibold text-green-600">Weight:</span> {userData.weight} kg</div>
              <div><span className="font-semibold text-green-600">Activity Level:</span> {userData.activityLevel}</div>
              <div><span className="font-semibold text-green-600">Goal:</span> {userData.goal}</div>
              <div><span className="font-semibold text-green-600">Dietary Pref.:</span> {userData.dietPreferences}</div>
              <div><span className="font-semibold text-green-600">Allergies:</span> {userData.allergies && userData.allergies.length > 0 ? userData.allergies.join(', ') : <span className="italic text-gray-400">None</span>}</div>
              <div><span className="font-semibold text-green-600">Meals/Day:</span> {userData.mealsPerDay || 3}</div>
              <div><span className="font-semibold text-green-600">Currency:</span> {currencySymbol} ({currency})</div>
              <div className="md:col-span-2">
                <span className="font-semibold text-green-600">Meal Budgets:</span>{' '}
                {userData.mealBudgets && userData.mealBudgets.length > 0 ? (
                  <span className="ml-2 flex flex-wrap gap-2 mt-1">
                    {userData.mealBudgets.map((budget, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 bg-green-50 border border-green-200 rounded px-2 py-1 text-green-700 text-xs font-semibold">
                        <FaMoneyBillWave className="text-green-400" />
                        {currencySymbol}{budget} <span className="text-gray-400">(Meal {idx + 1})</span>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="italic text-gray-400 ml-1">Not specified</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
              <div>Created: {userData.createdAt && new Date(userData.createdAt).toLocaleString()}</div>
              <div>Updated: {userData.updatedAt && new Date(userData.updatedAt).toLocaleString()}</div>
            </div>
          </section>

          {/* Health Metrics Card */}
          <section className="bg-white/80 rounded-2xl p-6 shadow border border-green-100 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-green-700 mb-2 flex items-center gap-2">
              <FaHeartbeat className="text-pink-400" /> Health Metrics
            </h2>
            {userHealth ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base">
                <div><span className="font-semibold text-green-600">BMI:</span> {userHealth.healthUser[0].bmi}</div>
                <div><span className="font-semibold text-green-600">BMR:</span> {userHealth.healthUser[0].bmr}</div>
                <div><span className="font-semibold text-green-600">TDEE:</span> {userHealth.healthUser[0].tdee}</div>
                <div><span className="font-semibold text-green-600">Calorie Need:</span> {userHealth.healthUser[0].calorieNeed}</div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 mt-4">
                <svg className="animate-spin h-5 w-5 text-green-400" viewBox="0 0 24 24">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => {
                setShowChangePassword(false);
                setPasswordMessage(null);
                setOldPassword('');
                setNewPassword('');
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-700">Change Password</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPasswordLoading(true);
                setPasswordMessage(null);
                try {
                  const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v2/users/changepassword`,
                    { oldPassword, newPassword },
                    { withCredentials: true }
                  );
                  if (res.data.success) {
                    setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
                    setOldPassword('');
                    setNewPassword('');
                  } else {
                    setPasswordMessage({ type: 'error', text: res.data.message || 'Failed to change password.' });
                  }
                } catch (err) {
                  setPasswordMessage({ type: 'error', text: err.response?.data?.message || 'Failed to change password.' });
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
