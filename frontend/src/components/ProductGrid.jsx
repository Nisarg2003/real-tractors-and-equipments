import React from "react";
import { Heart, Share2, ArrowRight } from "lucide-react";

const ProductGrid = ({ products }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-8 p-4 md:p-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-white dark:bg-[#131313] rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={product.thumbnail?.url || "https://placehold.co/800x500"}
                alt={`${product.make} ${product.model} ${product.year}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Tag */}
              <div className="absolute top-2 md:top-4 left-2 md:left-4">
                <span className="px-2 md:px-3 py-0.5 md:py-1 bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 text-xs font-medium rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4 space-x-1.5 md:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-1.5 md:p-2 bg-white/90 dark:bg-zinc-900/90 rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                  <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-800 dark:text-zinc-200" />
                </button>
                <button className="p-1.5 md:p-2 bg-white/90 dark:bg-zinc-900/90 rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                  <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-800 dark:text-zinc-200" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex flex-col flex-grow">
              <h3 className="text-base md:text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-1.5 md:mb-2 line-clamp-2 leading-tight">
                {product.make} {product.model} {product.year}
              </h3>

              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mb-4 md:mb-6 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Rs. {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs md:text-sm text-zinc-500 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <span className="px-2 py-0.5 md:py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded">
                  Available
                </span>
              </div>

              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => window.location.href = `/product/${product._id}`}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl text-sm font-bold transition-all duration-300 group shadow-sm"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-orange-500" />
                  </button>
                  <button
                    onClick={() => window.location.href = `/product/${product._id}`}
                    className="relative overflow-hidden flex items-center justify-center px-4 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-black uppercase tracking-tighter transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95"
                  >
                    <span className="relative z-10">Inquire</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;