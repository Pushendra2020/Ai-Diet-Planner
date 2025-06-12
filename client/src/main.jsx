import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Hero from './components/Hero.jsx'
import CalculateBMI from './components/Calculations/CalculateBMI.jsx'
import CalculateBMR from './components/Calculations/CalculateBMR.jsx'
import CalculateCalorieNeeds from './components/Calculations/CalculateCalorieNeeds.jsx'
import CalculateTDEE from './components/Calculations/CalculateTDEE.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Hero /> },
      { path: 'calculateBMI', element: <CalculateBMI /> },
      { path: 'calculateBMR', element: <CalculateBMR /> },
      { path: 'calculateCalorieNeeds', element: <CalculateCalorieNeeds /> },
      { path: 'calculateTDEE', element: <CalculateTDEE /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
