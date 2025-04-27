import './App.css';
import Auth from './views/Auth';
import AdminDashboard from './views/Admin/AdminDashboard';
import WorkerDashboard from './views/Worker/WorkerDashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/security/ProtectedRoute';

import ProductsTable from './components/tables/ProductsTable';
import CreateProduct from './components/cards/product/CreateProduct';
import EditProduct from './components/cards/product/EditProduct';

import ColorsTable from './components/tables/ColorsTable';
import CreateColor from './components/cards/color/CreateColor';
import EditColor from './components/cards/color/EditColor';

import SizesTable from './components/tables/SizesTable';
import CreateSize from './components/cards/size/CreateSize';
import EditSize from './components/cards/size/EditSize';

import CategoriesTable from './components/tables/CategoriesTable';
import CreateCategory from './components/cards/category/CreateCategory';
import EditCategory from './components/cards/category/EditCategory';

import UsersTable from './components/tables/UsersTable';
import EditUser from './components/cards/user/EditUser';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />

        <Route path="/adminDashboard" element={
          <ProtectedRoute expectedRole="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }>
          {/* PRODUCTS */}
          <Route index element={<h1>HOLA ADMIN</h1>} />
          <Route path="products" element={<ProductsTable />} />
          <Route path="product/new" element={<CreateProduct />} />
          <Route path="product/:id/edit" element={<EditProduct />} />
          {/* <Route path=":productId" element={<ProductDetails />} /> */}

          {/* COLORES */}
          <Route path="colors" element={<ColorsTable />} />
          <Route path="color/new" element={<CreateColor />} />
          <Route path="color/:id/edit" element={<EditColor />} />

          {/* SIZES */}
          <Route path="sizes" element={<SizesTable />} />
          <Route path='size/new' element={<CreateSize />}/>
          <Route path="size/:id/edit" element={<EditSize />} />

          {/* CATEGORIES */}
          <Route path="categories" element={<CategoriesTable />} />
          <Route path='category/new' element={<CreateCategory />}/>
          <Route path="category/:id/edit" element={<EditCategory />} />

          {/* Users */}
          <Route path="users" element={<UsersTable />} />
          <Route path="users/:id/edit" element={<EditUser />} />




        </Route>

          <Route path="/workerDashboard" element={
            <ProtectedRoute expectedRole="Worker">
              <WorkerDashboard />
            </ProtectedRoute>
          }>
          <Route index element={<h1>HOLA WORKER</h1>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
