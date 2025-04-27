import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useRequestUsers, requestDeleteUser } from '../../services/userService';
import { motion } from "framer-motion";


const UsersTable = () => {
  const navigate = useNavigate();

    const { data, loading, error, refetch } = useRequestUsers();

    const [searchTerm, setSearchTerm] = useState('');

    const users = Array.isArray(data?.data) ? data.data : [];

    const filteredUsers = users.filter(user =>
        user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.rol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.numDoc?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleDelete = async (user) => {
        // console.log(user.id)
        const resultSwal = await Swal.fire({
                title: `¿Desea despedir al empleado ${user.nombres} ${user.apellidos}?`,
                text: "Esta acción es definitiva",
                icon: "warning",
                showConfirmButton: true,
                confirmButtonText: "Sí, eliminar",
                confirmButtonColor: "red",
                showCancelButton: true,
                cancelButtonColor: "blue",
                cancelButtonText: "No, cancelar"
              });

              if (resultSwal.isConfirmed) {
                try {
                  await requestDeleteUser(user.id)
                  await Swal.fire({
                    title: "Usuario Despedido",
                    text: "Se eliminó definitivamente",
                    icon: "success",
                  });

                  // ✅ Volver a obtener los productos
                  await refetch();
                } catch (error) {
                  console.log(error);
                  await Swal.fire({
                    title: "Error",
                    text: "No se pudo despedir al Usuario",
                    icon: "error",
                  });
                }
              }


      };

    const columns = [
        { label: "Nombres" },
        { label: "Apellidos" },
        { label: "Username" },
        { label: "DNI" },
        { label: "Rol" },
        { label: "Action", className: "w-30" },
        // { label: "Price", className: "w-30" },
    ];

    // console.log(data.data)

  return (
    <>
    <h1 className="text-3xl font-bold text-white-800 mb-6">Usuarios</h1>
    <div className="flex justify-between items-center pb-2">
      {/* Search on the left */}
      <div className="pb-3">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative mt-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block ps-10 pe-2 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-96 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className={`px-6 py-3 ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-red-600">
                  Error fetching data!
                </td>
              </tr>
            ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.nombres}
                  </th>
                  <td className="px-6 py-4">{user.apellidos}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-3">{user.numDoc}</td>
                  <td className="px-6 py-3">{user.rol}</td>

                  <td className="px-6 py-4">
                    {/* <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={(e) => {
                        e.preventDefault(); // Previene que se recargue la página por el href
                        navigate(`/adminDashboard/users/${user.id}/edit`); // Llama a tu función con el ID del producto
                      }}
                    >
                      Edit
                    </a> */}
                    {user?.rol === "Worker" &&
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      onClick={(e) => {
                        e.preventDefault(); // Previene que se recargue la página por el href
                        handleDelete(user); // Llama a tu función con el ID del producto
                      }}
                    >
                      Despedir
                    </a>

                    }

                  </td>
                  </motion.tr>
              ))
            )}
          </tbody>
      </table>
    </div>
    </>
  )
}

export default UsersTable