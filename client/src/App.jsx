import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import Hero from './components/Hero'
import CalculateBMI from './components/Calculations/CalculateBMI.jsx'
import CalculateBMR from './components/Calculations/CalculateBMR.jsx'
import CalculateTDEE from './components/Calculations/CalculateTDEE.jsx'
import CalculateCalorieNeeds from './components/Calculations/CalculateCalorieNeeds.jsx'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      {/* <CalculateBMI/>
      <CalculateBMR/>
      <CalculateTDEE/> */}
      <CalculateCalorieNeeds/>
    </>
  )
}

export default App
