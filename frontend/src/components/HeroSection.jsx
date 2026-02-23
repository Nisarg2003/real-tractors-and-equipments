import React, { useState, useEffect } from "react";
import HeroImage from "../Images/hero.jpg";
import { ChevronDown, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    {
      title: "Utility Tractors",
      description: "Versatile performance for everyday farm tasks",
      icon: "🚜",
    },
    {
      title: "Compact Tractors",
      description: "Powerful solutions for smaller landscapes",
      icon: "🚜",
    },
    {
      title: "High HP Models",
      description: "Heavy-duty machinery for maximum productivity",
      icon: "🚜",
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    setIsVisible(true);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full">
      {/* Main container with background */}
      <div className="relative min-h-screen pb-48">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/brain/636d7c36-f849-43ab-8226-d1061ac75dd4/tractor_hero_new_1771493801807.png')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm md:text-lg font-medium mb-4 bg-white/10 px-8 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/20 transition-all duration-300">
            Premium Agricultural Solutions
          </span>

          <div className="space-y-6 mb-12">
            <h2 className="text-3xl md:text-5xl font-light tracking-wide">
              Powering Your Farm with
            </h2>
            <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              BEST-IN-CLASS TRACTORS
            </h1>
            <p className="max-w-xl mx-auto text-lg text-gray-300 leading-relaxed">
              Premium dealer of <strong>New & Second Hand</strong> tractors. 
              Experience reliability and performance with our wide range of 
              agricultural machinery tailored for your success.
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => window.location.href = "/products"}
            className="group relative inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Inventory
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 animate-bounce">
            <ChevronDown
              size={32}
              className="text-white/60 hover:text-white/90 transition-colors"
            />
          </div>
        </div>

        {/* Category Cards - Desktop */}
        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 pb-12 z-20 ${
            isMobile ? "hidden" : "block"
          }`}
        >
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:scale-102 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="p-8 pb-12 flex flex-col items-center text-center">
                  <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {category.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Category Cards */}
      {isMobile && (
        <div className="px-4 pb-12 bg-black/95">
          <div className="flex flex-col space-y-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:scale-102 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="pt-4 pb-6 px-6 flex flex-col items-center text-center">
                  <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {category.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
