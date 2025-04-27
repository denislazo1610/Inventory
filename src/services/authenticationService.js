import { useState } from "react";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const usePostSignIn = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postSignIn = async (username, password) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await axios.post(`${apiBaseUrl}/apis/codigo/api/authentication/v1/signin`, { username, password });

        if (response.status === 200) {
          const token = response.data?.data?.token; // Ensure safe access to token
          if (token) {
            localStorage.setItem("token", token); // Store token
          }
          setData(response.data); // Store API response
        } else {
          throw new Error("Unexpected response status");
        }

      } catch (error) {
        // console.error("Login Error:", error);

        // Extract error message from response if available
        const errorMessage = error.response?.data?.message || "An error occurred";
        setError(errorMessage); // Set user-friendly error message

      } finally {
        setLoading(false);
      }
    };

    return { data, loading, error, postSignIn };
  };

const fetchUserInfo = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
        console.error("No token found!");
        return;
    }

    const url = `${apiBaseUrl}/apis/codigo/api/authentication/v1/user-info-test?token=${token}`;

    try {
        const response = await axios.get(url);
        return response.data;
        // console.log("User Info:", response.data);
    } catch (error) {
        console.error("Error fetching user info:", error);
    }
};

const signUpWorker = async (worker) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/apis/codigo/api/authentication/v1/signupuser`, worker);
    console.log('API response:', response);  // Log the full response for debugging


    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Error en el código de estado de la operación: ${response.status}`);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);  // Log any error for debugging
    throw error;
  }
};

const logout = (navigate) => {
  localStorage.removeItem("token");
  if (navigate) {
    navigate("/"); // optional: only redirect if navigate is passed
  }
};

export { usePostSignIn, fetchUserInfo, signUpWorker, logout };