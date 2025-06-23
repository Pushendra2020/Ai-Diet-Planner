import React from 'react'
import '../index.css'
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
                className={`flex items-center gap-3 text-green-900 text-base md:text-lg font-medium px-4 py-2 rounded-xl shadow hover:scale-[1.05] transition-transform duration-200 animate-fade-in-up animate-delay-${(i+1)*180}`}
                style={{ filter: 'drop-shadow(0 0 12px #bbf7d0)' }}
              >
                {f.icon}
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Custom CSS for glow, particles, and animation */}
      <style>{`
        @keyframes glow {
          0%, 100% { filter: blur(32px) brightness(1.1) drop-shadow(0 0 40px #bbf7d0); }
          50% { filter: blur(40px) brightness(1.3) drop-shadow(0 0 80px #a3e635); }
        }
        .animate-glow { animation: glow 3s ease-in-out infinite alternate; }
        @keyframes glow2 {
          0%, 100% { filter: blur(32px) brightness(1.1) drop-shadow(0 0 40px #a3e635); }
          50% { filter: blur(40px) brightness(1.3) drop-shadow(0 0 80px #bbf7d0); }
        }
        .animate-glow2 { animation: glow2 3s ease-in-out infinite alternate; }
        @keyframes glowText {
          0%, 100% { text-shadow: 0 0 24px #bbf7d0, 0 0 48px #a3e635; }
          50% { text-shadow: 0 0 48px #a3e635, 0 0 96px #bbf7d0; }
        }
        .animate-glow-text { animation: glowText 2.5s ease-in-out infinite alternate; }
        .hero-glow-list { box-shadow: 0 0 32px 0 #bbf7d0cc, 0 2px 8px 0 #0001; }
        /* Staggered fade-in for feature list */
        .animate-delay-180 { animation-delay: 180ms; }
        .animate-delay-360 { animation-delay: 360ms; }
        .animate-delay-540 { animation-delay: 540ms; }
        .animate-delay-720 { animation-delay: 720ms; }
        /* Particle background */
        .hero-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(circle at 20% 30%, #bbf7d0 0.5px, transparent 1.5px),
                      radial-gradient(circle at 80% 60%, #a3e635 0.5px, transparent 1.5px),
                      radial-gradient(circle at 50% 80%, #bef264 0.5px, transparent 1.5px),
                      radial-gradient(circle at 70% 20%, #bbf7d0 0.5px, transparent 1.5px);
          background-size: 1200px 800px;
          animation: particlesMove 12s linear infinite alternate;
        }
        @keyframes particlesMove {
          0% { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 60px 40px, -40px 60px, 30px -30px, -60px -40px; }
        }
        .animate-glow-pulse {
          animation: glowPulse 2.5s infinite alternate;
        }
        @keyframes glowPulse {
          0% { opacity: 0.7; filter: blur(24px) brightness(1.1); }
          100% { opacity: 1; filter: blur(32px) brightness(1.3); }
        }
        /* Animated gradient for h1 */
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 4s ease-in-out infinite alternate;
        }
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}

export default Hero