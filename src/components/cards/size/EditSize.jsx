import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { requestSize, requestUpdateSize, deleteSize } from '../../../services/sizeService';

const EditSize = () => {
    const { id } = useParams();
    const [size, setSize] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSize = async () => {
          try {
            const response = await requestSize(id);
            setSize(response.size);
            setLoading(false);

          } catch (error) {
            setError('Error al cargar la categoria selecionada');
            setLoading(false);
          }
        };

        fetchSize();
      }, [id]);

    const handleSave = async () => {
          const capitalizedSize = size.charAt(0).toUpperCase() + size.slice(1);

            try {
                const res = await requestUpdateSize({"size": capitalizedSize}, id);

                await Swal.fire({
                  title: `${capitalizedSize} tamaño actualizado!`,
                  text: "El size se creó exitosamente",
                  icon: "success"
                });

                navigate("/adminDashboard/sizes");

              } catch (error) {
                // Optional: log to console for debugging
                console.error("Error updating size:", error);

                await Swal.fire({
                  title: 'Error',
                  text: error?.response?.data?.message || 'Ocurrió un error al actualizar el size.',
                  icon: 'error'
                });
              }

        }

        const handleDelete = async () => {
          const result = await Swal.fire({
              title: '¿Estás seguro?',
              text: 'Antes de eliminar este Size. Recuerda que todos los variantes de este size con las prendas seran eliminadas tambien',
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
                  const res = await deleteSize(id);

                  await Swal.fire({
                      title: 'Size eliminado',
                      text: `El tamaño "${size}" ha sido eliminado correctamente.`,
                      icon: 'success'
                  });

                  // Optionally navigate or refresh
                  navigate("/adminDashboard/sizes");

              } catch (error) {
                  console.error("Error deleting color:", error);
                  await Swal.fire({
                      title: 'Error',
                      text: error?.response?.data?.message || 'Ocurrió un error al eliminar la categoría.',
                      icon: 'error'
                  });
              }
          }
      };

  return (
    <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-24 xl:pt-32">

    <h1>Actualizar Tamaño</h1>

    <div className="p-4 flex gap-8 justify-center mt-4">
        <div className="w-30 h-30 flex items-center justify-center rounded-full text-xl font-bold border border-gray-300 transition-all duration-200 backdrop-blur-sm">
            {size || 'Preview'}
        </div>
    </div>

    <div className="p-4 flex gap-8 justify-center">
        <label className="text-mg text-white-700 mb-1 block items-center">
            <input
            type="text"
            value={size}
            onChange={e => setSize(e.target.value)}
            maxLength={10}
            className="w-full px-3 py-2.5 border mt-4 border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
            placeholder="e.g. Oversize"
            />
        </label>

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

export default EditSize