import axios from "axios";
import { useEffect, useState, useCallback } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const useRequestProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/apis/codigo/inventoryApi/product/v1/allProduct`);
      // console.log(response);
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
    fetchProducts();
  }, [fetchProducts]);

  return { data, loading, error, refetch: fetchProducts };
};

const requestCreateProduct = async (newProduct) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/apis/codigo/inventoryApi/product/v1/newProduct`, newProduct);
    //   console.log('API response:', response);  // Log the full response for debugging


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

const requestUpdateProduct = async (updatedProduct, id) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/apis/codigo/inventoryApi/product/v1/${id}`, updatedProduct);
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

const requestProduct = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/apis/codigo/inventoryApi/product/v1/${id}`);
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

const requestCategoryByProductId = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/apis/codigo/inventoryApi/product/v1/getCategory/${id}`);
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


const requestDeleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/apis/codigo/inventoryApi/product/v1/${id}`);
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
    useRequestProducts,
    requestCreateProduct,
    requestUpdateProduct,
    requestProduct,
    requestCategoryByProductId,
    requestDeleteProduct
};