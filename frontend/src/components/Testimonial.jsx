import React from "react";
import { Star, Globe, Users, Briefcase } from "lucide-react";

const TrustedBy = () => {
  const trustedCompanies = [
    {
      name: "GlobalCorp",
      description: "Trusted worldwide for excellence",
      icon: <Globe className="w-12 h-12 text-blue-500" />,
    },
    {
      name: "StarTech",
      description: "Leaders in technology innovation",
      icon: <Star className="w-12 h-12 text-yellow-400" />,
    },
    {
      name: "Humanify AI",
      description: "Empowering businesses with AI",
      icon: <Users className="w-12 h-12 text-green-400" />,
    },
    {
      name: "ProConsult",
      description: "Providing trusted consulting services",
      icon: <Briefcase className="w-12 h-12 text-purple-500" />,
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl text-white font-bold mb-6">
          Trusted by Farmers Across the Region
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Join the thousands of agricultural professionals who trust Shubham Tractors 
          to deliver high-performance machinery and exceptional support every day.
        </p>

        {/* Trusted Companies Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {trustedCompanies.map((company, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-6 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 hover:shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {/* Company Icon */}
              <div className="mb-4">{company.icon}</div>
              {/* Company Name */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-200">
                {company.name}
              </h3>
              {/* Description */}
              <p className="text-gray-400 text-sm group-hover:text-gray-300 text-center">
                {company.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
