import apiRequest from "./apiClient";
import CryptoJS from "crypto-js";

export const fetchUser = async () => {
  try {
    const users = await apiRequest("/posts", {}, "GET");
    console.log("Users:", users);
    return users;
  } catch (error) {
    throw error;
  }
};

// Example function to create a new user
export const createUser = async (userData: { name: string; email: string }) => {
  try {
    const response = await apiClient.post("posts", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
