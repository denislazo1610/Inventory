import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { requestUpdateCategory, requestCategory, deleteCategory } from '../../../services/categoryService';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState('');
    const [baseCodigo, setBaseCodigo] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const response = await requestCategory(id);
            // console.log(response.data)
            setCategoryName(response.data.category);
            setBaseCodigo(response.data.baseCodigo);
            setLoading(false);



          } catch (error) {
            setError('Error al cargar la categoria selecionada');
            setLoading(false);
          }
        };

        fetchCategory();
      }, [id]);

    const handleSave = async () => {
        if (!categoryName.trim() || !baseCodigo.trim()) {
            await Swal.fire({
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos antes de continuar.',
            icon: 'warning'
        });
            return;
        }

        try {
            // Simulate a request
            const res = await requestUpdateCategory({"category":categoryName,"baseCodigo": baseCodigo}, id)

            await Swal.fire({
                title: `${categoryName} baseCodigo actualizada!`,
                text: "La base Codigo se actualizo exitosamente",
                icon: "success"
            });

              navigate("/adminDashboard/categories");

            } catch (error) {
                console.error("Error updating categoria:", error);
                await Swal.fire({
                title: 'Error',
                text: error?.response?.data?.message || 'Ocurrió un error al actualizar la categoría.',
                icon: 'error'
                });
            }
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Antes de eliminar esta categoría, asegúrate de eliminar o reasignar todos los productos asociados. Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        });

        if (result.isConfirmed) {
            try {
                // Replace with your actual delete request
                const res = await deleteCategory(id);

                await Swal.fire({
                    title: 'Categoría eliminada',
                    text: `La categoría "${categoryName}" ha sido eliminada correctamente.`,
                    icon: 'success'
                });

                // Optionally navigate or refresh
                navigate("/adminDashboard/categories");

            } catch (error) {
                console.error("Error deleting categoría:", error);
                await Swal.fire({
                    title: 'Error',
                    text: error?.response?.data?.message || 'Ocurrió un error al eliminar la categoría.',
                    icon: 'error'
                });
            }
        }
    };

  return (
    <div className="sm:pt-8 md:pt-11 lg:pt-15 xl:pt-15">
    <h1 className='mb-10'>Actualizar Categoria</h1>
    <div className="p-4 flex gap-8">
        <div className="flex flex-col gap-4 w-1/2">
            <label className="text-mg text-white-700 mb-1 block text-left">
                <span className="mb-1 font-semibold">Nombre de Categoria</span>
                <input
                type="text"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
                placeholder="e.g. Boxy Fit"
                required
                />
            </label>
            <label className="text-mg text-white-700 mb-1 block text-left">
                <span className="mb-1 font-semibold">Codigo de base</span>
                <input
                type="text"
                value={baseCodigo}
                onChange={e => setBaseCodigo(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
                placeholder="e.g. bfx"
                required
                />
            </label>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
            <div
                    className="bg-gray-800 px-20 py-10 rounded shadow transition duration-200"
                >
                    <div className="font-semibold text-xl">{categoryName || 'Preview'}</div>
                    <div className="text-xs text-gray-400 italic opacity-70">{baseCodigo || "Codigo"}</div>
                </div>
            </div>
        </div>
        <div className="md:col-span-2 flex-1/2 space-x-4">
            <button
                className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition"
                onClick={handleDelete}
            >
                Eliminar
            </button>
            <button
                className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                onClick={handleSave}
            >
                Actualizar
            </button>
        </div>
    </div>
  )
}

export default EditCategory