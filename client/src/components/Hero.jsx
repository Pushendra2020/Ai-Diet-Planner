import React from 'react'
import '../index.css'
import axios from 'axios'
import { FaRobot, FaAppleAlt, FaHeartbeat, FaMoneyBillWave } from 'react-icons/fa'

const features = [
  {
    icon: <FaAppleAlt className="text-pink-400 animate-bounce-x" />,
    text: 'AI-powered meal plans tailored to you',
  },
  {
    icon: <FaMoneyBillWave className="text-green-400 animate-wiggle" />,
    text: 'Set your budget and preferences',
  },
  {
    icon: <FaHeartbeat className="text-red-400 animate-pulse" />,
    text: 'Track calories, macros, and health',
  },
  {
    icon: <FaRobot className="text-blue-400 animate-pop" />,
    text: 'Chat with AI for instant advice',
  },
]

const Hero = () => {
  axios.get("/").then((response) => {
    console.log("response.data");
  });
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-lime-100 overflow-hidden">
      {/* Animated glowing gradients */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-green-300/60 to-lime-200/20 rounded-full blur-3xl z-0 animate-glow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-lime-300/60 to-green-200/20 rounded-full blur-3xl z-0 animate-glow2" />
      {/* Animated particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hero-particles" />
      </div>
      <div className="relative z-1 w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center gap-8 animate-fade-in">
        {/* Floating AI icon */}
        <div className="relative mb-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="block w-24 h-24 rounded-full bg-gradient-to-br from-green-200 via-lime-100 to-white blur-2xl opacity-70 animate-glow-pulse" />
          </div>
          <FaRobot className="relative text-green-500 text-5xl drop-shadow-xl animate-bounce-x" />
        </div>
        {/* Glassmorphism card */}
        <div className="w-full max-w-2xl bg-white/60 backdrop-blur-2xl border border-green-100 rounded-3xl shadow-2xl px-6 py-10 flex flex-col items-center gap-6 glass-card animate-pop-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-500 via-lime-400 to-green-700 bg-clip-text text-transparent drop-shadow-lg leading-tight text-center animate-glow-text animate-gradient-x animate-fade-in-up">
            Eat Smarter.<br />Live Healthier.<br />Powered by AI.
          </h1>
          <div className="text-green-700 text-lg md:text-xl font-semibold text-center animate-fade-in animate-delay-150">
            <span className="inline-block px-4 py-1 rounded-full bg-green-100/60 border border-green-200 shadow-sm animate-pop-in">
              Your journey to better nutrition starts here.
            </span>
          </div>
          <p className="text-lg md:text-2xl text-gray-700 font-serif max-w-xl text-center animate-fade-in animate-delay-200">
            Pro Diet crafts your perfect meal plan—personalized, budget-friendly, and always delicious. Let AI guide your nutrition journey, every day.
          </p>
          <ul className="mt-2 flex flex-col gap-3 w-full max-w-lg border-2 border-green-200/60 rounded-2xl shadow-lg bg-white/60 backdrop-blur-md animate-fade-in-up animate-delay-300 hero-glow-list">
            {features.map((f, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 text-green-900 text-base md:text-lg font-medium px-4 py-2 rounded-xl shadow hover:scale-[1.05] transition-transform duration-200 animate-fade-in-up animate-delay-${(i+1)*180} hero-item-glow`}
              >
                {f.icon}
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Custom CSS for glow, particles, and animation */}
    </section>
  )
}

export default Hero