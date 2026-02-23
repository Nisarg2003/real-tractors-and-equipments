import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Edit2, Plus, Search, Image as ImageIcon, RefreshCw } from "lucide-react";
import ProductFormModal from "../components/ProductFormModal";
import ImageViewerModal from "../components/ImageViewerModal";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Fetch all products from API ───────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await getAllProducts();
    if (result.success) {
      setProducts(result.data);
    } else {
      setError(result.message || "Failed to fetch products");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);



  // ─── Derived filtered list ──────────────────────────────────────────────────
  const filteredProducts = products.filter(
    (product) =>
      (product.make || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.model || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    setActionLoading(true);
    setError(null);

    let result;
    if (selectedProduct?._id) {
      result = await updateProduct(selectedProduct._id, productData);
    } else {
      result = await createProduct(productData);
    }

    if (result.success) {
      setIsModalOpen(false);
      setSelectedProduct(null);
      await fetchProducts(); // re-fetch to get the latest data from server
    } else {
      setError(result.message || "Operation failed");
    }
    setActionLoading(false);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    )
      return;

    setActionLoading(true);
    setError(null);
    const result = await deleteProduct(id);
    if (result.success) {
      await fetchProducts();
    } else {
      setError(result.message || "Failed to delete product");
    }
    setActionLoading(false);
  };

  const handleViewImages = (product) => {
    const allImages = [];
    if (product.thumbnail) {
      allImages.push(
        typeof product.thumbnail === "string"
          ? product.thumbnail
          : product.thumbnail.url || product.thumbnail
      );
    }
    if (product.files && product.files.length > 0) {
      product.files.forEach((f) =>
        allImages.push(typeof f === "string" ? f : f.url || f)
      );
    }

    if (allImages.length === 0) {
      alert("No images available for this product");
      return;
    }

    setSelectedImages(allImages);
    setSelectedProduct(product);
    setIsImageViewerOpen(true);
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
            Product Management
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Manage and view all products in inventory
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="flex-1 sm:flex-none justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span className="sm:hidden font-medium">Refresh</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            disabled={actionLoading}
            className="flex-[2] sm:flex-none justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 text-sm md:text-base whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center justify-between text-sm">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-200 ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-3 md:p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 md:top-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-700/50">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Make
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Model
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Year
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Registration No
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Images
                </th>
                <th className="text-center px-6 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-3 text-gray-400">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <tr
                      key={product._id || product.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium whitespace-nowrap">
                        {product.make}
                      </td>
                      <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                        {product.model}
                      </td>
                      <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                        {product.year}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 whitespace-nowrap">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                        {product.registrationNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-white font-semibold whitespace-nowrap">
                        {product.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            product.isAvailable
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {product.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleViewImages(product)}
                          className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-blue-400 transition-colors inline-flex"
                          title="View Images"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            disabled={actionLoading}
                            className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id || product.id)}
                            disabled={actionLoading}
                            className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    {searchTerm
                      ? "No products found matching your search."
                      : "No products yet. Click \"Add Product\" to create one."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <p className="text-gray-400 text-sm mb-1">Total Products</p>
          <p className="text-2xl font-bold text-white">{products.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <p className="text-gray-400 text-sm mb-1">Available</p>
          <p className="text-2xl font-bold text-green-400">
            {products.filter((p) => p.isAvailable).length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <p className="text-gray-400 text-sm mb-1">Unavailable</p>
          <p className="text-2xl font-bold text-red-400">
            {products.filter((p) => !p.isAvailable).length}
          </p>
        </div>
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
        loading={actionLoading}
      />

      <ImageViewerModal
        isOpen={isImageViewerOpen}
        images={selectedImages}
        productTitle={`${selectedProduct?.make} ${selectedProduct?.model} ${selectedProduct?.year}`}
        onClose={() => {
          setIsImageViewerOpen(false);
          setSelectedImages([]);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default ProductManagement;
