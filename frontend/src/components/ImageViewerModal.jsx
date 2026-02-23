import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

const ImageViewerModal = ({ isOpen, images, productTitle, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !images || images.length === 0) return null;

  const getImageUrl = (image) => {
    if (typeof image === "string") return image;
    if (image?.url) return image.url;
    if (image instanceof File) return URL.createObjectURL(image);
    return null;
  };

  const getImageName = (image, index) => {
    if (typeof image === "string") return `Image ${index + 1}`;
    if (image?.fileName) return image.fileName;
    if (image instanceof File) return image.name;
    return `Image ${index + 1}`;
  };

  const currentImage = images[currentImageIndex];
  const imageUrl = getImageUrl(currentImage);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {productTitle} - Images
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Display */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-6 bg-gray-900 overflow-hidden">
          {imageUrl ? (
            <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center bg-black/20 rounded-lg overflow-hidden border border-gray-700">
              <img
                src={imageUrl}
                alt={getImageName(currentImage, currentImageIndex)}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-2 md:left-4 p-1.5 md:p-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors z-10 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 md:left-auto md:right-4 p-1.5 md:p-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors z-10 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <ImageIcon className="w-12 h-12" />
              <p>Image not available</p>
            </div>
          )}
        </div>

        {/* Image Info and Thumbnail Strip */}
        <div className="border-t border-gray-700 p-4 md:p-6 bg-gray-800/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <p className="text-gray-300 text-sm font-medium truncate max-w-xs md:max-w-md">
              {getImageName(currentImage, currentImageIndex)}
            </p>
            <span className="text-gray-500 text-xs bg-gray-700 px-2 py-1 rounded whitespace-nowrap">
              {currentImageIndex + 1} of {images.length}
            </span>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600">
              {images.map((image, index) => {
                const url = getImageUrl(image);
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      index === currentImageIndex
                        ? "border-blue-500 scale-105 shadow-lg shadow-blue-500/20"
                        : "border-gray-700 hover:border-gray-500 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {url ? (
                      <img
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                        <X className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;
