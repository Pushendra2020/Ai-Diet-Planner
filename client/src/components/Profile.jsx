import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
  const [userHealth, setUserHealth] = useState(null)
  const userData = useSelector((state) => state.auth.userData)

  const fetchUserHealthData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v2/users/userHealth', {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-green-100">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-10 drop-shadow-md">👤 User Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* User Info */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">User Information</h2>
            <ul className="space-y-2 text-sm md:text-base">
              <li><span className="font-semibold text-green-600">Name:</span> {userData.username}</li>
              <li><span className="font-semibold text-green-600">Email:</span> {userData.email}</li>
              <li><span className="font-semibold text-green-600">Age:</span> {userData.age}</li>
              <li><span className="font-semibold text-green-600">Gender:</span> {userData.gender}</li>
              <li><span className="font-semibold text-green-600">Height:</span> {userData.height} cm</li>
              <li><span className="font-semibold text-green-600">Weight:</span> {userData.weight} kg</li>
              <li><span className="font-semibold text-green-600">Activity Level:</span> {userData.activityLevel}</li>
              <li><span className="font-semibold text-green-600">Goal:</span> {userData.goal}</li>
              <li><span className="font-semibold text-green-600">Dietary Preferences:</span> {userData.dietPreferences}</li>
              <li>
                <span className="font-semibold text-green-600">Allergies:</span>{" "}
                {userData.allergies && userData.allergies.length > 0
                  ? userData.allergies.join(', ')
                  : <span className="italic text-gray-400">None</span>}
              </li>
              <li><span className="font-semibold text-green-600">Created At:</span> {userData.createdAt && new Date(userData.createdAt).toLocaleString()}</li>
              <li><span className="font-semibold text-green-600">Updated At:</span> {userData.updatedAt && new Date(userData.updatedAt).toLocaleString()}</li>
            </ul>
          </div>

          {/* Health Info */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Health Metrics</h2>
            {userHealth ? (
              <ul className="space-y-2 text-sm md:text-base">
                <li><span className="font-semibold text-green-600">BMI:</span> {userHealth.healthUser[0].bmi}</li>
                <li><span className="font-semibold text-green-600">BMR:</span> {userHealth.healthUser[0].bmr}</li>
                <li><span className="font-semibold text-green-600">TDEE:</span> {userHealth.healthUser[0].tdee}</li>
                <li><span className="font-semibold text-green-600">Calorie Need:</span> {userHealth.healthUser[0].calorieNeed}</li>
              </ul>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 mt-4">
                <svg className="animate-spin h-5 w-5 text-green-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="italic">Loading health data...</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center mt-12">
          <NavLink
            to="/editprofile"
            className="inline-block px-8 py-3 text-white font-semibold bg-gradient-to-r from-green-500 to-lime-500 rounded-full shadow-lg hover:from-green-600 hover:to-lime-600 transition duration-200"
          >
            ✏️ Edit Profile
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Profile
