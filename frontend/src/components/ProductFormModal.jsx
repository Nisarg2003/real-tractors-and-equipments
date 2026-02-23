import React, { useState, useEffect } from "react";
import { X, Upload, Trash2 } from "lucide-react";

const ProductFormModal = ({ isOpen, product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registrationNumber: "",
    category: "Car",
    price: "",
    description: "",
    isAvailable: true,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const CATEGORIES = ["Car", "Activa", "Motorbike", "Tractors"];

  // Populate form when editing
  useEffect(() => {
    if (product && (product._id || product.id)) {
      setFormData({
        make: product.make || "",
        model: product.model || "",
        year: product.year || "",
        registrationNumber: product.registrationNumber || "",
        category: product.category || "Car",
        price: product.price || "",
        description: product.description || "",
        isAvailable: product.isAvailable !== false,
      });
      // Note: Images are not pre-loaded; user can upload new ones if needed
      setThumbnail(null);
      setFiles([]);
    } else {
      // Reset for new product
      setFormData({
        make: "",
        model: "",
        year: "",
        registrationNumber: "",
        category: "Car",
        price: "",
        description: "",
        isAvailable: true,
      });
      setThumbnail(null);
      setFiles([]);
    }
    setErrors({});
  }, [product, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.make.trim()) newErrors.make = "Make is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!(product?._id || product?.id) && !thumbnail) {
      newErrors.thumbnail = "Thumbnail image is required for new products";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      if (errors.thumbnail) {
        setErrors((prev) => ({ ...prev, thumbnail: "" }));
      }
    }
  };

  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      make: formData.make,
      model: formData.model,
      year: formData.year,
      registrationNumber: formData.registrationNumber,
      category: formData.category,
      price: formData.price,
      description: formData.description,
      isAvailable: formData.isAvailable,
      thumbnail,
      files,
    };

    onSave(productData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-800">
          <h2 className="text-2xl font-bold text-white">
            {(product?._id || product?.id) ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Make, Model, Year */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Make
              </label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                placeholder="e.g., Toyota"
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.make
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.make && (
                <p className="mt-1 text-sm text-red-400">{errors.make}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="e.g., Innova"
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.model
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-400">{errors.model}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="e.g., 2024"
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.year
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.year && (
                <p className="mt-1 text-sm text-red-400">{errors.year}</p>
              )}
            </div>
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              placeholder="e.g., MH-12-AB-1234"
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.registrationNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-blue-500"
              }`}
            />
            {errors.registrationNumber && (
              <p className="mt-1 text-sm text-red-400">
                {errors.registrationNumber}
              </p>
            )}
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., $9,999.99"
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-400">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description..."
              rows="4"
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 resize-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-blue-500"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail Image{" "}
              {product?.id === undefined && (
                <span className="text-red-400">*</span>
              )}
            </label>
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-gray-400">
                  {thumbnail ? thumbnail.name : "Click to upload thumbnail"}
                </p>
              </div>
            </div>
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-400">{errors.thumbnail}</p>
            )}
          </div>

          {/* Additional Files */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Images / Files
            </label>
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFilesChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-gray-400">
                  Click to upload additional files
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-300 font-medium">
                  Uploaded Files ({files.length})
                </p>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                  >
                    <p className="text-gray-300 text-sm truncate">
                      {file.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-red-600/20 rounded text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleInputChange}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 cursor-pointer"
            />
            <label className="text-sm font-medium text-gray-300">
              Available for Purchase
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              {(product?._id || product?.id) ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
