import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  // useEffect(() => {
  //   if (user) {
  //     setFormData({
  //       username: user.username,
  //       password: "", // Leave empty for security unless changed
  //       role: user.role,
  //     });
  //   }
  // }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${apiBaseUrl}/apis/codigo/api/users/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User updated:", response.data);
      if (onSuccess) onSuccess(); // callback to refresh data
      alert("Usuario actualizado con éxito");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Hubo un error actualizando el usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto grid grid-cols-1 gap-6 mt-10">
      <div className="flex flex-col">
        <label className="text-mg text-white-700 mb-1 block text-left">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-mg text-white-700 mb-1 block text-left">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-mg text-white-700 mb-1 block text-left">
          Seleccione la categoría:
        </label>
        <select
          name="role"
          className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
          onChange={handleChange}
          value={formData.role}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Actualizar
        </button>
      </div>
    </form>
  );
}

export default EditUser