import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import ContactUs from "./pages/ContactUs";
import SearchResults from "./components/DisplaySearch/DisplaySearch";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:categoryId/:id" element={<ProductDetail />} />
          <Route path="/products/:categoryId" element={<ProductList />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
