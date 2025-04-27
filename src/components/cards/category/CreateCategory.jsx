import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { requestCreateCategory } from '../../../services/categoryService';

const CreateCategory = () => {

    const [categoryName, setCategoryName] = useState('');
    const [baseCodigo, setBaseCodigo] = useState('');
    const navigate = useNavigate();

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
            const res = await requestCreateCategory({"category":categoryName, "baseCodigo": baseCodigo})

            await Swal.fire({
                title: `${categoryName} categoria creada!`,
                text: "La categoría se creó exitosamente",
                icon: "success"
            });

              navigate("/adminDashboard/categories");

            } catch (error) {
                console.error("Error creating categoria:", error);
                await Swal.fire({
                title: 'Error',
                text: error?.response?.data?.message || 'Ocurrió un error al crear la categoría.',
                icon: 'error'
                });
            }
    };

  return (
    <div className="sm:pt-8 md:pt-11 lg:pt-15 xl:pt-15">
        <h1 className='mb-10'>Crear Categoria</h1>
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
        <div className="md:col-span-2">
            <button
                className="bg-gray-700 text-white font-semibold py-3 px-15 rounded-lg hover:bg-blue-700 transition"
                onClick={handleSave}
            >
                Crear categoria
            </button>
      </div>
    </div>
  )
}

export default CreateCategory