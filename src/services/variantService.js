import axios from "axios";
import { useEffect, useState, useCallback } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const requestVariantsOfOneProduct = async (Product) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/apis/codigo/inventoryApi/productVariant/v1/allVariantsProduct?product=${Product}`);
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
    requestVariantsOfOneProduct
};