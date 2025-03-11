import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your API URL

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const token = Cookies.get("authToken"); // Get token from cookies

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`; // Add token to headers
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  return response.json();
};
