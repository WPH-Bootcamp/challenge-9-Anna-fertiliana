import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import RestaurantDetail from "./pages/restaurantdetail";
import Auth from "./pages/auth";
import Cart from "./pages/cart";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
