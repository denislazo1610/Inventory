import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { requestCreateSize } from '../../../services/sizeService';

const CreateSize = () => {
    const [size, setSize] = useState('');
    const navigate = useNavigate();


    const handleSave = async () => {
      const capitalizedSize = size.charAt(0).toUpperCase() + size.slice(1);

        try {
            const res = await requestCreateSize({"size": capitalizedSize});

            await Swal.fire({
              title: `${capitalizedSize} tamaño creado!`,
              text: "El size se creó exitosamente",
              icon: "success"
            });

            navigate("/adminDashboard/sizes");

          } catch (error) {
            // Optional: log to console for debugging
            console.error("Error creating size:", error);

            await Swal.fire({
              title: 'Error',
              text: error?.response?.data?.message || 'Ocurrió un error al crear el size.',
              icon: 'error'
            });
          }

    }

  return (
    <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-24 xl:pt-32">

        <h1>Crear Tamaño</h1>

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
                maxLength={9}
                className="w-full px-3 py-2.5 border mt-4 border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
                placeholder="e.g. Oversize"
                />
            </label>

        </div>
        <div className="flex justify-center mt-6">
            <button
                className="bg-gray-700 text-white font-semibold py-3 px-15 rounded-lg hover:bg-blue-700 transition w-auto"
                onClick={handleSave}
            >
                Crear Size
            </button>
        </div>
    </div>
  )
}

export default CreateSize