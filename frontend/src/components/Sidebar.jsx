import React, { useState } from "react";
import { Search, X } from "lucide-react";

const Sidebar = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <>
      <aside
        className={`fixed lg:relative lg:block inset-y-0 left-0 
          w-[85vw] lg:w-[300px] h-full z-50
          transform transition-all duration-500 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="h-full bg-zinc-900  rounded-r-3xl lg:rounded-3xl shadow-2xl border border-zinc-800/50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 px-6 py-3 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Categories
                </h3>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 hover:bg-zinc-800 rounded-xl transition-all"
              >
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>

            {/* Search and Categories */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full bg-zinc-800/50 backdrop-blur-xl rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all border border-zinc-700/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                {filteredCategories.map((category, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center space-x-4 p-4 rounded-2xl bg-zinc-800/40 hover:bg-zinc-800/60 transition-all border border-zinc-700/30 hover:border-zinc-700/50">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id={`category-${index}`}
                            className="appearance-none w-6 h-6 rounded-full border-2 border-blue-500 checked:bg-blue-500 transition-all cursor-pointer"
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => handleCategoryToggle(category.name)}
                          />
                          <svg
                            className={`absolute w-3 h-3 left-[6px] top-[6px] pointer-events-none transition-opacity ${
                              selectedCategories.includes(category.name)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            viewBox="0 0 17 12"
                            fill="none"
                          >
                            <path
                              d="M1 4.5L6 9.5L15.5 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor={`category-${index}`}
                        className="flex-1 flex items-center justify-between cursor-pointer"
                      >
                        <span className="text-sm font-medium text-zinc-100">
                          {category.name}
                        </span>
                        <span className="text-sm text-zinc-400 bg-zinc-900/50 px-2 py-1 rounded-lg">
                          {category.count}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;