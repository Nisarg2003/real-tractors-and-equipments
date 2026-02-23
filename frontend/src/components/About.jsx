import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index === activeTab ? null : index);
  };

  const sections = [
    {
      id: 1,
      title: "Extensive Inventory",
      content: "We provide a wide range of tractors from top manufacturers, ensuring you find the right machine for your specific agricultural needs and terrain.",
      icon: "🚜"
    },
    {
      id: 2,
      title: "Genuine Spare Parts",
      content: "Maximize uptime with our comprehensive selection of authentic spare parts and accessories, keeping your machinery running at peak efficiency.",
      icon: "⚙️"
    },
    {
      id: 3,
      title: "Expert Service Team",
      content: "Our certified technicians offer specialized maintenance and repair services, ensuring your tractors stay reliable season after season.",
      icon: "🔧"
    },
    {
      id: 4,
      title: "Transparent Consultation",
      content: "Get expert advice on choosing the best machinery for your farm. We help you make informed decisions based on your requirements.",
      icon: "🏪"
    },
  ];

  return (
    <div className="relative w-full bg-[#1c1c1c] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title and Description */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-white text-sm md:text-lg font-medium mb-4 bg-white/10 px-8 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg inline-block">
            About Shubham Tractors
          </span>
          <h2 className="mt-6 mb-2 text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
            Empowering Farmers for Success
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Shubham Tractors is your trusted partner in agriculture, providing high-quality
            machinery and reliable support to help you scale your farming operations.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Image Section */}
          <div 
            className={`w-full lg:w-1/2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              <img
                src="/brain/636d7c36-f849-43ab-8226-d1061ac75dd4/tractor_hero_new_1771493801807.png"
                alt="Shubham Tractors Showroom"
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            </div>
          </div>

          {/* Accordion Section */}
          <div className="w-full lg:w-1/2 space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`transition-all duration-500 ${
                  isVisible 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  onClick={() => handleTabClick(section.id)}
                  className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg transition-all duration-300 hover:bg-white/20 cursor-pointer border border-white/10"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl transform group-hover:scale-110 transition-transform">
                          {section.icon}
                        </span>
                        <h3 className="text-lg font-semibold text-white">
                          {`${section.id.toString().padStart(2, '0')} ${section.title}`}
                        </h3>
                      </div>
                      {activeTab === section.id ? (
                        <Minus className="w-5 h-5 text-white/60" />
                      ) : (
                        <Plus className="w-5 h-5 text-white/60" />
                      )}
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeTab === section.id ? "max-h-48 mt-4" : "max-h-0"
                    }`}>
                      <p className="text-gray-300">{section.content}</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;