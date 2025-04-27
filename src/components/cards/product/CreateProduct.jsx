import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { requestCreateProduct } from '../../../services/productService';
import { requestCategories } from '../../../services/categoryService';
import { requestColors } from '../../../services/colorService';
import { requestSizes } from '../../../services/sizeService';
import { useNavigate } from 'react-router-dom';


const CreateProduct = () => {
  const navigate = useNavigate();

  const [colorViewMode, setColorViewMode] = useState("circle");

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [quantities, setQuantities] = useState({});

  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    costo: '',
    ofertaDescuento: '',
    imagen: '',
    category: '',
    variants: []
  });

  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSelect = (e) => {
    const categoryNameSelected = e.target.options[e.target.selectedIndex].text; // Get the selected category name
    setFormData({ ...formData, category: categoryNameSelected }); // Update formData with the selected category name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting product:", formData);

    const variants = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([key, quantity]) => {
      const [color, size] = key.split("-");
      return { color, size, quantity };
    });

    const productToCreate = {
      ...formData,
      variants
    };

    // Ensure category is not empty
    if (!formData.category) {
      Swal.fire({
        title: "Advertencia",
        text: "Por favor seleccione una categoría antes de continuar.",
        icon: "warning",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    // console.log(productToCreate)

    const res = await requestCreateProduct(productToCreate);
    const resSwal = await Swal.fire({
      title: `${formData.nombre} creado!`,
      text: "El producto se creó exitosamente",
      icon: "success"
    });

    navigate("/adminDashboard/products");
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const dataCategories = await requestCategories();
        const dataColors = await requestColors();
        const dataSizes = await requestSizes();
        setCategories(dataCategories.data);
        setColors(dataColors)
        setSizes(dataSizes);

      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const inputs = [
    { name: "nombre", label: "Nombre producto", type: "text" },
    { name: "descripcion", label: "Descripción producto", type: "textarea" },
    { name: "precio", label: "Precio producto", type: "number" },
    { name: "costo", label: "Costo", type: "number" },
    { name: "ofertaDescuento", label: "Descuento", type: "number" },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-5 p-8 rounded-xl">

        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate('/adminDashboard/products')}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg shadow"
          >
            Back to Products
          </button>
        </div>

        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            {inputs.map((item, i) => (
            <div key={i} className="flex flex-col col-span-1">
                <label className="text-mg text-white-700 mb-1 block text-left">
                {item.label}
                </label>
                <input
                type={item.type}
                name={item.name}
                value={formData[item.name]}
                onChange={handleInput}
                className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
                required
                />
            </div>
            ))}

            <div className="flex flex-col col-span-1">
              <label className="text-mg text-white-700 mb-1 block text-left">Seleccione la categoría:</label>
              <select
                className="select w-full py-2.5 border border-gray-500"
                onChange={handleSelect}
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col col-span-1">
            <label className="text-mg text-white-700 mb-1 block text-left">Seleccione una imagen</label>
            <input
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleInput}
                className="w-full px-3 py-2.5 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white-500"
                // required
            />
            </div>

            <div className="md:col-span-2">
              <div className="w-full">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-6">
                    {/* Colores */}
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block font-semibold">Colores</label>
                        <button
                          type="button"
                          onClick={() =>
                            setColorViewMode((prev) => (prev === "text" ? "circle" : "text"))
                          }
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {colorViewMode === "text" ? "Ver como círculos" : "Ver como texto"}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {colors.map((color) => {
                          const isSelected = selectedColors.includes(color.color);
                          const hexes = Array.isArray(color.hex) ? color.hex : [color.hex];

                          return (
                            <label
                              key={color.id}
                              className={`flex items-center gap-2 cursor-pointer ${
                                colorViewMode === "circle" ? "flex-col" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setSelectedColors((prev) =>
                                    checked
                                      ? [...prev, color.color]
                                      : prev.filter((c) => c !== color.color)
                                  );
                                }}
                                className="hidden"
                              />

                              {colorViewMode === "circle" ? (
                                // Circle: conic-gradient (pie-style)
                                <div
                                  className={`w-8 h-8 rounded-full border-2 ${
                                    isSelected ? "ring-2 ring-blue-500" : ""
                                  }`}
                                  style={{
                                    background: `conic-gradient(${hexes
                                      .map((hex, index) => {
                                        const slice = 100 / hexes.length;
                                        return `${hex} ${index * slice}% ${(index + 1) * slice}%`;
                                      })
                                      .join(", ")})`,
                                  }}
                                  title={color.color}
                                />
                              ) : (
                                // Square: grid of blocks
                                <div
                                  className={`grid ${
                                    hexes.length === 1 ? "grid-cols-1" : "grid-cols-2"
                                  } gap-[2px] w-6 h-6 border rounded ${
                                    isSelected ? "ring-2 ring-blue-500" : ""
                                  }`}
                                  title={color.color}
                                >
                                  {hexes.map((hex, idx) => (
                                    <div
                                      key={idx}
                                      className="w-full h-full"
                                      style={{ backgroundColor: hex }}
                                    />
                                  ))}
                                </div>
                              )}

                              {colorViewMode === "text" && <span>{color.color}</span>}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tallas */}
                    <div className="w-full">
                      <label className="block font-semibold mb-2">Tallas</label>
                      <div className="flex flex-wrap gap-4">
                        {sizes.map((size) => (
                          <label key={size.id} className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={selectedSizes.includes(size.size)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setSelectedSizes((prev) =>
                                  checked ? [...prev, size.size] : prev.filter(s => s !== size.size)
                                );
                              }}
                            />
                            {size.size}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                {selectedColors.length > 0 && selectedSizes.length > 0 && (
                  <div className="w-full max-w-max">
                    <table className="table-auto w-full text-center border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Color \ Talla</th>
                          {selectedSizes.map((size) => (
                            <th key={size} className="border px-4 py-2">{size}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedColors.map((color) => (
                          <tr key={color}>
                            <td className="border px-4 py-2 font-semibold ">{color}</td>
                            {selectedSizes.map((size) => {
                              const key = `${color}-${size}`;
                              return (
                                <td key={key} className="border px-2 py-2">
                                  <input
                                    type="number"
                                    min={0}
                                    value={quantities[key] || ''}
                                    onChange={(e) =>
                                      setQuantities({ ...quantities, [key]: parseInt(e.target.value) || 0 })
                                    }
                                    className="w-16 border rounded px-2 py-1 text-sm"
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>


            {/* Submit Button spans both columns */}
            <div className="md:col-span-2">
            <button
                type="submit"
                className="w-full bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
                Crear Producto
            </button>
            </div>
        </form>
    </div>
  );
};

export default CreateProduct;