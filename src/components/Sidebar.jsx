import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { logout } from "../services/authenticationService";
import useAuthGuard from '../hooks/useAuthGuard';

const Sidebar = () => {
    const { user, loading } = useAuthGuard();
    const [openColor, setOpenColor] = useState(false);
    const [openSize, setOpenSize] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate); // performs logout and redirects
    };

    const sidebarRef = useRef(null);
    const buttonRef = useRef(null);



    function capitalizeEachWord(name) {
        if (!name) return '';
        return name
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    }

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    // Close the sidebar when clicking outside of it
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if the click is outside of the sidebar and the button
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setIsSidebarOpen(false); // Close the sidebar
        }
      };

      // Add event listener for clicks outside
      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <>
    <button
        ref={buttonRef}
        onClick={toggleSidebar}
        type="button"
        className="fixed top-4 left-4 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
    </button>

    <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidenav"
    >

        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <ul className="space-y-2">

                <li>
                    <div href="#" className="flex items-center p-2 text-base font-normal text-gray-900 bg-gray-100 rounded-lg dark:text-white dark:bg-gray-700 group cursor-default"
                    onClick={(e) => {
                        e.preventDefault(); // Previene que se recargue la página por el href
                        if(user?.rol === "Admin"){
                            navigate(`/adminDashboard/users/${user.id}/edit`);
                        }
                      }}>
                    <div className="flex-1 flex flex-col items-center text-center">
                        <p className="text-sm font-semibold">{capitalizeEachWord(user?.nombres)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">{capitalizeEachWord(user?.apellidos)}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-400">{capitalizeEachWord(user?.rol)}</p>
                    </div>
                    </div>
                </li>

                {user?.rol === "Admin" && (
                    <>

                    <p className="text-sm text-gray-500 tracking-wide mb-2">Caracteristicas</p>

                    <li>
                        {/* <button
                            onClick={() => setOpenColor(!openColor)}
                            type="button"
                            className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-paint"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" /><path d="M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>

                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Colores</span>
                            <svg
                                className={`w-6 h-6 transform transition-transform ${
                                    openColor ? 'rotate-180' : ''
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {openColor && (
                            <ul className="py-2 space-y-2">
                                <li>
                                    <a href="#" className="flex items-center p-2 pl-11 ...">Agregar Color</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 pl-11 ...">Todos Los Colores</a>
                                </li>
                            </ul>
                        )} */}
                        <Link
                            to="/adminDashboard/colors"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-paint"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" /><path d="M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                            </svg>
                            <span className="ml-3">Colores</span>
                        </Link>
                    </li>


                    <li>

                        <Link
                            to="/adminDashboard/sizes"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-ruler-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3l4 4l-14 14l-4 -4z" /><path d="M16 7l-1.5 -1.5" /><path d="M13 10l-1.5 -1.5" /><path d="M10 13l-1.5 -1.5" /><path d="M7 16l-1.5 -1.5" /></svg>
                            <span className="ml-3">Tamaños</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/adminDashboard/categories"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-category-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6h-6z" /><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>
                            <span className="ml-3">Categories</span>
                        </Link>

                    </li>
                </>
                )}


            </ul>

            {user?.rol === "Admin" && (

                <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">

                    <p className="text-sm text-gray-500 tracking-wide mb-2">General</p>

                    <li>
                        <Link
                            to="/adminDashboard/products"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-shirt-sport"
                            >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" />
                            <path d="M10.5 11h2.5l-1.5 5" />
                            </svg>
                            <span className="ml-3">Products</span>
                        </Link>
                    </li>

                    <li>
                    <Link
                            to="/adminDashboard/users"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>

                            <span className="ml-3">Usuarios</span>
                        </Link>
                    </li>

                    {/* <li>
                        <Link
                            to="/adminDashboard/products"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3zm0 2h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1" /></svg>
                            <span className="ml-3">Trabajos</span>
                        </Link>
                    </li> */}

                </ul>
            )}

            {/* {user?.rol === "Admin" && (

            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">

                <p className="text-sm text-gray-500 tracking-wide mb-2">Trabajo</p>

                <li>
                    <Link
                        // to="/adminDashboard/products"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cut"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M9.15 14.85l8.85 -10.85" /><path d="M6 4l8.85 10.85" /></svg>
                        <span className="ml-3">Corte</span>
                    </Link>
                </li>

                <li>
                    <Link
                        // to="/adminDashboard/products"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cake-roll"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 15c-4.97 0 -9 -2.462 -9 -5.5s4.03 -5.5 9 -5.5s9 2.462 9 5.5s-4.03 5.5 -9 5.5" /><path d="M12 6.97c3 0 4 1.036 4 1.979c0 2.805 -8 2.969 -8 -.99c0 -2.11 1.5 -3.959 4 -3.959" /><path d="M21 9.333v5.334c0 2.945 -4.03 5.333 -9 5.333s-9 -2.388 -9 -5.333v-5.334" /></svg>
                        <span className="ml-3">Rollo</span>
                    </Link>
                </li>

                <li>
                    <Link
                        // to="/adminDashboard/products"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-shopee"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l.867 12.143a2 2 0 0 0 2 1.857h10.276a2 2 0 0 0 2 -1.857l.867 -12.143h-16z" /><path d="M8.5 7c0 -1.653 1.5 -4 3.5 -4s3.5 2.347 3.5 4" /><path d="M9.5 17c.413 .462 1 1 2.5 1s2.5 -.897 2.5 -2s-1 -1.5 -2.5 -2s-2 -1.47 -2 -2c0 -1.104 1 -2 2 -2s1.5 0 2.5 1" /></svg>
                        <span className="ml-3">Pedidos</span>
                    </Link>
                </li>

            </ul>
            )} */}



        </div>

        <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700">


            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded hover:shadow-md transition">
            Logout
            </button>


        </div>
    </aside>
    </>
  )
}

export default Sidebar