import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getCategoriesList, getProductsByCategory, getAllProducts } from "../services/productService";

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // ─── Fetch Categories ──────────────────────────────────────────────────────
  const fetchCategories = useCallback(async () => {
    const result = await getCategoriesList();
    if (result.success) {
      const mappedCategories = result.data.map(cat => ({
        name: cat.category,
        count: cat.postCount
      }));
      setCategories(mappedCategories);
    }
  }, []);

  // ─── Fetch Products ────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let result;
    if (selectedCategories.length > 0) {
      result = await getProductsByCategory(selectedCategories);
    } else {
      result = await getAllProducts();
    }

    if (result.success) {
      const data = result.data?.posts || (Array.isArray(result.data) ? result.data : []);
      setProducts(data);
    }
    setLoading(false);
    setCurrentPage(1);
  }, [selectedCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ─── Category Toggle ───────────────────────────────────────────────────────
  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // ─── Filter products by search term ─────────────────────────────────────────
  const filteredProducts = products.filter(product => {
    const searchStr = `${product.make} ${product.model} ${product.year}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  // ─── Pagination Logic ───────────────────────────────────────────────────────
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12">
      <div className="w-full px-4 md:px-8">
        {/* Unified Search & Category Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-12 bg-zinc-900/30 p-2 rounded-[28px] border border-zinc-800/50 shadow-2xl">
          {/* Keyword Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors w-4 h-4" />
            <input
              type="text"
              placeholder="Search make, model, or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-12 pr-6 py-3.5 text-sm font-medium focus:outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <div className="hidden lg:block w-px h-10 bg-zinc-800 mx-2" />

          {/* Inline Categories */}
          <div className="flex flex-wrap gap-2 p-2">
            <button
              onClick={() => setSelectedCategories([])}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                selectedCategories.length === 0
                  ? "bg-orange-500 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:text-white"
              }`}
            >
              All
            </button>
            
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryToggle(cat.name)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${
                  selectedCategories.includes(cat.name)
                    ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:text-white"
                }`}
              >
                {cat.name}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${
                   selectedCategories.includes(cat.name) ? "bg-black text-white" : "bg-zinc-900 text-zinc-600"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between text-zinc-500 text-sm font-medium uppercase tracking-widest">
           <div>Showing {currentProducts.length} of {filteredProducts.length} tractors</div>
           {selectedCategories.length > 0 && (
             <button 
               onClick={() => setSelectedCategories([])}
               className="text-orange-500 hover:underline flex items-center gap-1"
             >
               Clear Filters (×)
             </button>
           )}
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)]"></div>
            <p className="text-zinc-500 animate-pulse font-bold tracking-widest uppercase text-xs">Loading Heavy Machinery...</p>
          </div>
        ) : (
          <>
            <ProductGrid products={currentProducts} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-20 gap-3">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-12 h-12 rounded-2xl font-black transition-all border ${
                        currentPage === i + 1
                          ? "bg-orange-500 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                          : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-40 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
            <div className="text-zinc-800 mb-6 text-9xl font-black select-none">🚜</div>
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">No Machines Matching Your Criteria</h3>
            <p className="text-zinc-500 mt-4 text-lg max-w-md mx-auto">We couldn't find any tractors matching your search. Try widening your filters or checking back later.</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategories([]);}}
              className="mt-8 px-10 py-4 bg-white text-black font-black uppercase tracking-tighter hover:bg-orange-500 hover:text-white transition-all rounded-xl"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Products;
