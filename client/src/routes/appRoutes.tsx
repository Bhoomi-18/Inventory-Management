import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Signup from "../pages/auth/signUp";
import Login from "../pages/auth/logIn";
import Layout from "../components/sections/Layout";
import Dashboard from "../pages/dashboard/dashboard";
import Products from "../pages/product/products";
import Categories from "../pages/category/categories";
import CategoryProducts from "../pages/category/categoryProducts";
import LowStockProducts from "../pages/product/lowStock";
import AddSale from "../pages/sales/addSale";
import ReportsDashboard from "../pages/report/reportDashboard";
import PrivateRoute from "./privateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<PrivateRoute> <Layout/> </PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/low-stock" element={<LowStockProducts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:name" element={<CategoryProducts />} />
          <Route path="sales" element={<AddSale />} />
          <Route path="reports" element={<ReportsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;