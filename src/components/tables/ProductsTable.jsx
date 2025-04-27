import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import { useRequestProducts } from '../../services/productService';
import { requestDeleteProduct } from '../../services/productService';

const ProductsTable = () => {

    const navigate = useNavigate();

    const { data, loading, error, refetch } = useRequestProducts();

    const [searchTerm, setSearchTerm] = useState('');

    const products = Array.isArray(data?.data) ? data.data : [];

    const filteredProducts = products.filter(product =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleDelete = async (id) => {
      const resultSwal = await Swal.fire({
        title: "¿Desea eliminar el producto?",
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
          await requestDeleteProduct(id)
          await Swal.fire({
            title: "Producto eliminado",
            text: "Se eliminó definitivamente",
            icon: "success",
          });

          // ✅ Volver a obtener los productos
          await refetch();
        } catch (error) {
          console.log(error);
          await Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el producto",
            icon: "error",
          });
        }
      }
    };

    const columns = [
      { label: "Nombre de la Prenda" },
      { label: "Codigo" },
      { label: "Category" },
      { label: "Price", className: "w-30" },
      { label: "Costo", className: "w-30" },
      { label: "Descuento", className: "w-30" },
      { label: "Ganancia", className: "w-30" },
      { label: "Action", className: "w-30" },
    ];

  return (
    <>
    <h1 className="text-3xl font-bold text-white-800 mb-6">Products</h1>

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
            placeholder="Search for items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Button on the right */}
      <div>
        <button
          onClick={() => navigate('/adminDashboard/product/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Crear producto
        </button>
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
              filteredProducts.map((item, index) => (
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
                  {item.nombre}
                </th>
                <td className="px-6 py-4">{item.codigo}</td>
                <td className="px-6 py-4">{item.categoryName}</td>
                <td className="px-6 py-3">S/ {item.precio}</td>
                <td className="px-6 py-3">S/ {item.costo}</td>
                <td className="px-6 py-3">S/ {item.ofertaDescuento}</td>
                <td className="px-6 py-3">
                  S/ {item.precio - item.costo - item.ofertaDescuento}
                </td>

                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/adminDashboard/product/${item.id}/edit`);
                    }}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item.id);
                    }}
                  >
                    Remove
                  </a>
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

export default ProductsTable