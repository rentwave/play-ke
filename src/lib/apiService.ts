import apiRequest from "./apiClient";
// import CryptoJS from "crypto-js";

// const SECRET_KEY = "your-secret-key"; // Replace with a strong, random key

// Encrypt function
// export const encryptData = (data: object) => {
//   const stringData = JSON.stringify(data);
//   return { data: CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString() }
// };

// Decrypt function (for testing)
// export const decryptData = (ciphertext: string) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// };

export const fetchUser = async () => {
  try {
    const users = await apiRequest("/posts", {}, "GET");
    console.log("Users:", users);
    return users;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: object) => {
  try {
    const response = await apiRequest("auth/user_management/auth/authenticate/", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: object) => {
  try {
    const response = await apiRequest("auth/user_management/auth/onboard/", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};

export const createArtist = async (data: object) => {
  try {
    const response = await apiRequest("content/api/create-artist/", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchArtist = async (data: object) => {
  try {
    const response = await apiRequest("content/api/retrieve_artist/", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchMusic = async (data: object) => {
  try {
    const response = await apiRequest("content/api/dt_media/", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};

