import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { getAllProducts } from "../services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      if (result.success) {
        const postData = result.data?.posts || (Array.isArray(result.data) ? result.data : []);
        setProducts(postData.slice(0, 4));
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="py-24 bg-[#1c1c1c] flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (products.length === 0) return null;

  return (
    <section className="relative  bg-[#1c1c1c] overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm mb-3 block">
              Premium Inventory
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Available Models
            </h2>
            <p className="text-gray-400">
              Discover high-performance machinery selected for their outstanding 
              reliability and value. Both new and certified second-hand models available.
            </p>
          </div>
          {products.length > 1 && (
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 transition-all duration-300 group whitespace-nowrap"
            >
              View More Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.thumbnail?.url || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={`${product.make} ${product.model} ${product.year}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-orange-400 transition-colors">
                  {product.make} {product.model} {product.year}
                </h3>
                <div className="flex items-center justify-between mt-4 mb-6">
                  <span className="text-2xl font-black text-white">
                    Rs. {product.price}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/product/${product._id}`}
                    className="flex items-center justify-center gap-2 px-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all border border-white/10 group"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-orange-500" />
                  </Link>
                  <Link
                    to={`/product/${product._id}`}
                    className="flex items-center justify-center px-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-tighter transition-all shadow-lg shadow-orange-500/20"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
