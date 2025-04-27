import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const requestCategories = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/apis/codigo/inventoryApi/category/v1/allCategories`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error al ejecutar petición");
    }
  } catch (error) {
    throw error;
  }
};

const requestCreateCategory= async (newCategory) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/apis/codigo/inventoryApi/category/v1/newCategory`, newCategory);
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

const requestUpdateCategory = async (updatedCategory, id) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/apis/codigo/inventoryApi/category/v1/${id}`, updatedCategory);
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

const requestCategory = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/apis/codigo/inventoryApi/category/v1/findById/${id}`);
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

const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/apis/codigo/inventoryApi/category/v1/deleteById/${id}`);
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

export { requestCategories , requestCreateCategory, requestUpdateCategory, requestCategory, deleteCategory};