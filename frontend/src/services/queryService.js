import axios from "axios";

const API_BASE_URL = "https://real-tractors-and-equipments.onrender.com/api";

// Public client for inquiries (no auth required for sending queries)
const publicClient = axios.create({ baseURL: API_BASE_URL });

/**
 * SEND an inquiry/query (public)
 * Endpoint: POST /api/sendQuery
 * Payload: { emailId, contactNo, post, query }
 */
export const sendInquiry = async (inquiryData) => {
  try {
    const response = await publicClient.post("/queries/sendQuery", {
      fullName: inquiryData.fullName,
      emailId: inquiryData.emailId,
      contactNo: inquiryData.contactNo,
      post: inquiryData.post,
      query: inquiryData.query,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Communication bridge failed. Please retry.",
    };
  }
};

/**
 * GET all inquiries (public/internal)
 * Endpoint: GET /api/queries/getQueries
 */
export const getInquiries = async () => {
  try {
    const response = await publicClient.get("/queries/getQueries");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch inquiries.",
    };
  }
};

/**
 * RESOLVE an inquiry
 * Endpoint: PUT /api/queries/resolveQuery
 */
export const updateInquiryStatus = async (queryId, isResolved) => {
  try {
    const response = await publicClient.put("/queries/resolveQuery", {
      queryId,
      updateIsResolvedStatus: isResolved,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update status.",
    };
  }
};
