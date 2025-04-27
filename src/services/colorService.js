import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const requestColors = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/apis/codigo/inventoryApi/color/v1/allColors`
    );
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Error al ejecutar petición");
    }
  } catch (error) {
    throw error;
  }
};

const requestCreateColor = async (newColor) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/apis/codigo/inventoryApi/color/v1/newColor`, newColor);
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

const requestColor = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/apis/codigo/inventoryApi/color/v1/findById/${id}`);
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

const requestUpdateColor = async (updatedColor, id) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/apis/codigo/inventoryApi/color/v1/${id}`, updatedColor);
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

const deleteColor = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/apis/codigo/inventoryApi/color/v1/deleteById/${id}`);
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

export { requestColors, requestCreateColor, requestColor, requestUpdateColor, deleteColor };