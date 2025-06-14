import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../app/authSlice.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const LogoutBnt = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

const handleClick = async () => {
  try {
    await axios.post(
      'http://localhost:5000/api/v2/users/logout',
      {}, // no body needed for logout
      {
        withCredentials: true, // correct place to set this
      }
    );
    dispatch(logout());
    navigate('/');
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <>
    <button
    onClick={handleClick}
    className='w-full mt-2 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition'
    >Logout</button>
    </>
  )
}

export default LogoutBnt