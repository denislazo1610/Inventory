import React, {useEffect, useState} from 'react'
import { requestSizes } from '../../services/sizeService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SizesTable = () => {
    const navigate = useNavigate();
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        const getSizes = async () => {
          try {
            const data = await requestSizes();
            setSizes(data);
          } catch (error) {
            console.log(error);
          }
        };
        getSizes();
      }, []);


      const SizeCircle = ({ size, id }) => (
        <div
          className="w-30 h-30 flex items-center justify-center rounded-full text-xl font-bold border border-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault(); // Previene que se recargue la página por el href
            navigate(`/adminDashboard/size/${id}/edit`); // Llama a tu función con el ID del producto
          }}
        >
          {size}
        </div>
      );

  // Group sizes into rows of 6
  const groupedSizes = [];
    for (let i = 0; i < sizes.length; i += 6) {
    groupedSizes.push(sizes.slice(i, i + 6));
    }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className='text-4xl font-extrabold text-white tracking-tight'>Sizes</h1>

      {/* Add Button at the top */}
      <div
        className="w-28 h-28 flex items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-3xl text-gray-600 font-bold hover:bg-gray-100 hover:border-gray-600 hover:text-black transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
        onClick={() => navigate('/adminDashboard/size/new')}
      >
        ＋
      </div>

      {/* Dynamically render rows */}
      {groupedSizes.map((row, idx) => (
        <div key={idx} className="flex items-center justify-center gap-10 text-white">
          {row.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <SizeCircle size={item.size} id={item.id} />
          </motion.div>
        ))}
        </div>
      ))}
    </div>
  );
}

export default SizesTable