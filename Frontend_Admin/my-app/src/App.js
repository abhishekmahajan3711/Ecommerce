import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminSignin from './Admin/Signin';
import AdminDashboard from './Admin/Dashboard';
import AdminProfile from './Admin/Profile';
import ProductManagement from './Products/ProductManagement';
import AddProduct from './Products/AddProduct';
import EditProduct from './Products/EditProduct';
import OrderManagement from './Orders/OrderManagement';
import OrderDetail from './Orders/OrderDetail';
import EditHomePage from './HomePage/EditHomePage';
import HeroSectionCustomize from './HomePage/HeroSectionCustomize';
import ContactManagement from './ContactManagement/ContactManagement';
import CategoryManagement from './Categories/CategoryManagement';
import CustomerManagement from './Customers/CustomerManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/orders/:id" element={<OrderDetail />} />
          <Route path="/admin/contacts" element={<ContactManagement />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/customers" element={<CustomerManagement />} />
          <Route path="/admin/home" element={<EditHomePage />} />
          <Route path="/admin/hero" element={<HeroSectionCustomize />} />
          <Route path="/" element={<Navigate to="/admin/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
