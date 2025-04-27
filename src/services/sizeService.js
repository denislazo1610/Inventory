import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const requestSizes = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/apis/codigo/inventoryApi/size/v1/allSizes`
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

const requestCreateSize = async (newSize) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/apis/codigo/inventoryApi/size/v1/newSize`, newSize);
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

const requestSize = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/apis/codigo/inventoryApi/size/v1/findById/${id}`);
    // console.log('API response:', response.data.data);  // Log the full response for debugging


    if (response.status === 200 || response.status === 201) {
      return response.data.data;
    } else {
      throw new Error(`Error en el código de estado de la operación: ${response.status}`);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);  // Log any error for debugging
    throw error;
  }
};

const requestUpdateSize = async (updatedSize, id) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/apis/codigo/inventoryApi/size/v1/${id}`, updatedSize);
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

const deleteSize = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/apis/codigo/inventoryApi/size/v1/deleteById/${id}`);
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

export { requestSizes, requestCreateSize, requestSize, requestUpdateSize, deleteSize };