import axios from "axios";
import { useEffect, useState, useCallback } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const useRequestUsers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/apis/codigo/api/users/allUsers`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        if (response.status === 200) {
          setData(response.data);
        } else {
          throw new Error('Error en el código de estado');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { data, loading, error, refetch: fetchUsers };
  };

  const requestDeleteUser = async (id) => {

    const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }


    try {
      const response = await axios.delete(`${apiBaseUrl}/apis/codigo/api/users/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // console.log('API response:', response);  // Log the full response for debugging


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

  export {
    useRequestUsers,
    requestDeleteUser
};