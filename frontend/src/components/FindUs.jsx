import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
const branches = [
  {
    id: 1,
    name: "Branch 1",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    mapsLink: "https://www.google.com/maps?q=43.0481,-76.1474",
  },
  {
    id: 2,
    name: "Branch 2",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    mapsLink: "https://www.google.com/maps?q=33.7455,-117.8677",
  },
  {
    id: 3,
    name: "Branch 3",
    address: "3891 Ranchview Dr. Richardson, California 62639",
    mapsLink: "https://www.google.com/maps?q=32.9483,-96.7298",
  },
  {
    id: 4,
    name: "Branch 4",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
    mapsLink: "https://www.google.com/maps?q=37.1489,-84.0444",
  },
];

const FindUs = () => {
  return (
    <div className="container mx-auto py-10 px-4 text-gray-800">
      <h2 className="text-4xl font-bold text-center mb-8 text-white">
        Find Us Everywhere
      </h2>

      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center mb-8 lg:mb-0 lg:w-1/3 lg:justify-start mr-3 ml-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509603!2d144.9537353153157!3d-37.81627997975191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11a1f7%3A0x5045675218ceed34!2sYour%20Branch%20Name!5e0!3m2!1sen!2sau!4v1600397881962!5m2!1sen!2sau"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:w-2/3 lg:grid-cols-2">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              className={`group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:scale-102 cursor-pointer ${
                true // replace with your visibility condition if needed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="p-5 flex flex-col items-center text-center">
                <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt className="text-cyan-400" />{" "}
                  {/* Icon color remains orange */}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  {" "}
                  {/* Branch name color set to white */}
                  {branch.name}
                </h3>
                <p className="text-white group-hover:text-gray-300 transition-colors mb-4">
                  {" "}
                  {/* Address color set to white */}
                  {branch.address}
                </p>
                <a
                  href={branch.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-colors"
                >
                  View on Google Maps
                </a>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindUs;
