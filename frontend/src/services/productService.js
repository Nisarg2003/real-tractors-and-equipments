import axios from "axios";

const API_BASE_URL = "https://real-tractors-and-equipments.onrender.com/api";

// Public client – no auth header (used for GET /getAllPost)
const publicClient = axios.create({ baseURL: API_BASE_URL });

// Helper: returns auth headers with Bearer token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Authenticated client – attaches Bearer token on every request
const apiClient = axios.create({ baseURL: API_BASE_URL });
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

/**
 * GET all products (public – no auth required)
 * Endpoint: GET /api/getAllPost
 */
export const getAllProducts = async () => {
  try {
    const response = await publicClient.get("/getAllPost");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products",
    };
  }
};

/**
 * GET all categories with post counts
 * Endpoint: GET /api/getCategories
 */
export const getCategoriesList = async () => {
  try {
    const response = await publicClient.get("/getCategories");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch categories",
    };
  }
};

/**
 * GET products filtered by category (POST body)
 * Endpoint: POST /api/postByCategory
 */
export const getProductsByCategory = async (categories) => {
  try {
    const response = await publicClient.post("/postByCategory", { categories });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to filter products",
    };
  }
};

/**
 * CREATE a new product (auth required)
 * Endpoint: POST /api/createPost  –  multipart/form-data
 */
export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    formData.append("make", productData.make || "");
    formData.append("model", productData.model || "");
    formData.append("year", productData.year || "");
    formData.append("registrationNumber", productData.registrationNumber || "");
    formData.append("category", productData.category || "");
    formData.append("price", productData.price || "");
    formData.append("description", productData.description || "");
    formData.append("isAvailable", productData.isAvailable ? "true" : "false");

    if (productData.thumbnail) {
      formData.append("thumbnail", productData.thumbnail);
    }
    if (productData.files && productData.files.length > 0) {
      productData.files.forEach((file) => formData.append("photos", file));
    }

    const response = await apiClient.post("/createPost", formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to create product",
    };
  }
};

/**
 * UPDATE an existing product (auth required)
 * Endpoint: PUT /api/editPost/:id  –  multipart/form-data
 */
export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    formData.append("make", productData.make || "");
    formData.append("model", productData.model || "");
    formData.append("year", productData.year || "");
    formData.append("registrationNumber", productData.registrationNumber || "");
    formData.append("category", productData.category || "");
    formData.append("price", productData.price || "");
    formData.append("description", productData.description || "");
    formData.append("isAvailable", productData.isAvailable ? "true" : "false");

    if (productData.thumbnail) {
      formData.append("thumbnail", productData.thumbnail);
    }
    if (productData.files && productData.files.length > 0) {
      productData.files.forEach((file) => formData.append("photos", file));
    }

    const response = await apiClient.put(`/editPost/${id}`, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to update product",
    };
  }
};

/**
 * DELETE a product (auth required)
 * Endpoint: DELETE /api/deletePost/:id
 */
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/deletePost/${id}`, {
      headers: getAuthHeaders(),
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to delete product",
    };
  }
};
