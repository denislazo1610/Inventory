import React, {useEffect, useState} from 'react'
import { requestColors } from '../../services/colorService'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ColorsTable = () => {

    const [colors, setColors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getColors = async () => {
          try {
            const data = await requestColors();
            setColors(data);
          } catch (error) {
            console.log(error);
          }
        };
        getColors();
      }, []);

  return (
    <div>
      <h1 className='text-4xl font-extrabold text-white tracking-tight mb-15'>Colores</h1>
      <div className="grid grid-cols-4 gap-4">
        <div
            className="h-24 flex flex-col items-center justify-center rounded text-white font-normal border-2 border-dashed border-black cursor-pointer hover:bg-black/20 hover:scale-105 transition-all"
            onClick={() => navigate('/adminDashboard/color/new')}
            >
            <span className="text-3xl font-semibold">＋</span>
            <span className="text-xs mt-1">Agregar color</span>
        </div>

        {colors.map((colorEntity, index) => {
          const { id, color, hex, textColor } = colorEntity;

          // Check if 'hex' is defined and has a valid length
          const hexCount = Array.isArray(hex) ? hex.length : 0;

          // Dynamic style for dividing the square based on the number of colors
          const getColorStyle = () => {
            if (hexCount === 1) {
              return { backgroundColor: hex[0] };
            } else if (hexCount > 1) {
              return {
                display: 'grid',
                gridTemplateColumns: `repeat(${hexCount}, 1fr)`, // Split into equal columns
                background: 'none', // Remove gradient
              };
            } else {
              // Fallback in case hex is invalid
              return { backgroundColor: '#ccc' }; // Default gray if no valid hex colors
            }
          };

          const colortext = textColor;


          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="h-24 flex items-center justify-center rounded text-white font-semibold border border-black relative cursor-pointer hover:bg-black/20 hover:scale-105 transition-all overflow-hidden"
              style={getColorStyle()}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/adminDashboard/color/${id}/edit`);
              }}
            >
              {hexCount > 1 &&
                hex.map((singleColor, idx) => (
                  <div
                    key={idx}
                    className="h-full w-full"
                    style={{ backgroundColor: singleColor }}
                  />
                ))}
              <span
                className="absolute text-center font-semibold"
                style={{
                  color: textColor,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {color}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}

export default ColorsTable