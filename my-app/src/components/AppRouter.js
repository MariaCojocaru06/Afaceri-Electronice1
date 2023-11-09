import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home"; // Import your Home component
import Products from "./products";
import SignInSide from "./login";
import AdminPage from "./admin";
import Register from "./register";
import CartPage from "./cart";

function AppRouter() {
  const [cart, setCart] = useState([]);
  const isAdmin=localStorage.getItem("isAdmin")
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/login" element={<SignInSide />} />
        {isAdmin && <Route path="/admin" element={<AdminPage />} />}
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
