import React, {useEffect, useState} from 'react'
import { requestCategories } from '../../services/categoryService'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const CategoriesTable = () => {
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
          try {
            const data = await requestCategories();
            setCategories(data.data);
          } catch (error) {
            console.log(error);
          }
        };
        getCategories();
      }, []);


    // Function to split array into N nearly equal parts
    const splitIntoColumns = (arr, columns) => {
        const result = Array.from({ length: columns }, () => []);
        arr.forEach((item, index) => {
        result[index % columns].push(item);
        });
        return result;
    };

    const chunkedCategories = splitIntoColumns(categories, 3);

  return (
    <>
        <div className='mb-15'>
            <h1 className='text-4xl font-extrabold text-white tracking-tight mb-5'>Categories</h1>

            <div className="flex justify-center">
                <button
                    onClick={() => navigate('/adminDashboard/category/new')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
                >
                    Crear categoria
                </button>
            </div>
        </div>

        <div className="flex justify-center gap-10 text-white mt-4">

        {chunkedCategories.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-2">
            {column.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div
                  className="bg-gray-800 px-20 py-10 rounded shadow transition duration-200 transform hover:scale-105 hover:bg-gray-700 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/adminDashboard/category/${item.id}/edit`);
                  }}
                >
                  <div className="font-semibold text-xl">{item.category}</div>
                  <div className="text-xs text-gray-400 italic opacity-70">{item.baseCodigo}</div>
                </div>
              </motion.div>
            ))}
            </div>
        ))}
        </div>
    </>
  )
}

export default CategoriesTable