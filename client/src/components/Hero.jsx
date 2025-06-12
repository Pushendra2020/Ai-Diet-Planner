import React from 'react'
import '../index.css'

const Hero = () => {
    return (
        <div className="relative flex items-center justify-center w-full h-[80vh] md:h-screen bg-gray-100 overflow-hidden">
            {/* Background Image */}
            <img
                src="https://nayeshamills.com/cdn/shop/articles/Balanced_Diet_What_is_it_and_Why_is_it_Important.jpg?v=1660738424"
                alt="Diet-image"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/10 to-green-100/70"></div>
            {/* Centered Content */}
            <div className="relative z-9 flex flex-col items-center justify-center w-full px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold forh1 text-center drop-shadow-lg">
                    Create Your AI Driven Diet Plan
                </h1>
                <p className="mt-6 sm:text-lg text-3xl md:text-2xl text-gray-700 text-center font-serif max-w-2xl">
                    Personalized nutrition plans powered by AI. Start your healthy journey today!
                </p>
                
            </div>
        </div>
    )
}

export default Hero