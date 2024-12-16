import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import DetailProduct from "../pages/product/DetailProduct";
import ListingGrid from "./ListingGrid";
import Cart from "./Cart";
import Checkout from "../pages/home/Checkout";
import ProductPage from "../pages/product/ProductPage";
import SearchResult from "./SearchResult"
import Brand from "./Brand";
const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home/>}/>
      <Route path="/detail/:productId" element={<DetailProduct/>} />
      {/* <Route path="/product/:productId" element={<ProductPage />} /> */}
      <Route path="/checkout" component={<Checkout/>} />
      <Route path="/Login" element={<UserLogin />} />
      <Route path="/Register" element={<UserRegister/>}/>
      <Route path="/ListingGrid" element={<ListingGrid/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/search-results" element={<SearchResult/>} />
      <Route path="/Brand" element={<Brand/>} />
    </Routes>
  </main>
);
export default Main;