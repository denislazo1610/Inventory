import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { requestCreateColor } from '../../../services/colorService';

const CreateColor = () => {
    const [colorName, setColorName] = useState('');
    const [hexInput, setHexInput] = useState('');
    const [textColor, setTextColor] = useState('black');
    const navigate = useNavigate();

    const hexArray = hexInput
      .split(',')
      .map(h => h.trim())
      .filter(Boolean);

    const handleSave = async () => {
      const updatedFormData = {
        color: colorName,
        hex: hexArray,
        textColor: textColor
      };

      if (!colorName.trim() || !hexInput.trim()) {
        await Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de continuar.',
        icon: 'warning'
        });
        return;
      }

      try {
        const res = await requestCreateColor(updatedFormData);

        await Swal.fire({
          title: `${updatedFormData.color} color creado!`,
          text: "El color se creó exitosamente",
          icon: "success"
        });

        navigate("/adminDashboard/colors");

      } catch (error) {
        // Optional: log to console for debugging
        console.error("Error creating color:", error);

        await Swal.fire({
          title: 'Error',
          text: error?.response?.data?.message || 'Ocurrió un error al crear el color.',
          icon: 'error'
        });
      }
    };

    return (
    <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-25">
      <h1 className='mb-10'>Crear Color</h1>
      <div className="p-4 flex gap-8">
        {/* Form */}
        <div className="flex flex-col gap-4 w-1/2">
        <label className="text-mg text-white-700 mb-1 block text-left">
            <span className="mb-1 font-semibold">Color Name</span>
            <input
              type="text"
              value={colorName}
              onChange={e => setColorName(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="e.g. Camouflage"
            />
        </label>

          <label className="text-mg text-white-700 mb-1 block text-left">
            <span className="mb-1 font-semibold">Hex Values (comma separated)</span>
            <input
              type="text"
              value={hexInput}
              onChange={e => setHexInput(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="#123456, #abcdef, #000000"
            />
            <a href="https://imagecolorpicker.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1">
                Need help finding hex colors? Try imagecolorpicker.com
            </a>
          </label>

          <label className="text-mg text-white-700 mb-1 block text-left">
            <span className="mb-1 font-semibold">Text Color</span>
            <select
              value={textColor}
              onChange={e => setTextColor(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
              >
              <option value="black">Black</option>
              <option value="white">White</option>
            </select>
          </label>

        </div>

        {/* Preview */}
        <div className="w-1/2 flex items-center justify-center">
        <div
            className="h-24 w-75 border border-black rounded relative overflow-hidden flex items-center justify-center font-semibold"
        >
        {/* Background colors */}
        {hexArray.length > 1 ? (
        <div
            className="absolute inset-0 grid"
            style={{
            gridTemplateColumns: `repeat(${hexArray.length}, 1fr)`,
            }}
        >
            {hexArray.map((hex, idx) => (
            <div
                key={idx}
                className="h-full w-full"
                style={{ backgroundColor: hex }}
            />
            ))}
        </div>
            ) : (
            <div
                className="absolute inset-0"
                style={{ backgroundColor: hexArray[0] || '#ccc' }}
            />
            )}

            {/* Text */}
            <span className="z-10 text-center" style={{ color: textColor }}>
            {colorName || 'Preview'}
            </span>
        </div>
        </div>
      </div>
      <div className="md:col-span-2">
            <button
                className="bg-gray-700 text-white font-semibold py-3 px-15 rounded-lg hover:bg-blue-700 transition"
                onClick={handleSave}
            >
                Crear Color
            </button>
      </div>
    </div>
    );
}

export default CreateColor