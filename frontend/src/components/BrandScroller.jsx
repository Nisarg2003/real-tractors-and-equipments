import React from "react";

const brands = [
  { name: "Mahindra", color: "text-red-500" },
  { name: "Sonalika", color: "text-blue-500" },
  { name: "John Deere", color: "text-green-600" },
  { name: "Massey Ferguson", color: "text-red-600" },
  { name: "New Holland", color: "text-blue-600" },
  { name: "Swaraj", color: "text-orange-500" },
  { name: "Kubota", color: "text-orange-600" },
  { name: "Eicher", color: "text-red-500" },
  { name: "Escorts", color: "text-blue-500" },
  { name: "Preet", color: "text-yellow-500" },
];

const BrandScroller = () => {
  return (
    <div className="bg-[#1c1c1c] py-20 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col items-center gap-2">
          <span className="text-orange-500 font-semibold tracking-widest uppercase text-xs">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            Authorized Brands
          </h2>
          <div className="w-20 h-1 bg-orange-500 rounded-full mt-2 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
        </div>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        {/* Shadow Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1c1c1c] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1c1c1c] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-8">
          {Array(4).fill([...brands]).flat().map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-4 group/item cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-orange-500/50 transition-all duration-300">
                <span className="text-xl">🚜</span>
              </div>
              <span className={`text-2xl md:text-3xl font-black italic tracking-tighter transition-all duration-300 group-hover/item:scale-110 ${brand.color} opacity-60 group-hover/item:opacity-100 uppercase`}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BrandScroller;
