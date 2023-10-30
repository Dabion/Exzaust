import React, { lazy,  Suspense } from "react";
import Signup from "./Signup"
import { AuthProvider } from "../Context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import UpdateProfile from "./UpdateProfile"
import ForgotPassword from "./ForgotPassword"
import Store from "./Store"
import Spinner from "./Store/Components/Spinner/Spinner";
import Cancel from "./Cancel";
import Success from "./Success";
import { ProductsProvider } from "./Store/Context/products_context";
import { CartProvider } from "./Store/Context/cart_context";
//import Productlist from "./Store/Pages/Products/ProductList"
import "@stripe/stripe-js";

import Home from "./Home"
import NFT from "./NFT"

import Navbar from "./Navbar"
import "../Style.css"

let username = ""
let itemid = ""

itemid =window.location.pathname.substring(10)

if ( !["/Products/"+itemid,"/Cancel", "/Success", "/Products", "/Cart", "/NFT", "/Home", "/Store", "/login", "/signup", "/ForgotPassword", "/UpdateProfile"].includes(window.location.pathname)){
  username = window.location.pathname.substring(1)
}

//<Route exact path={"/products/"+itemid} element={<ProductDetails/>}></Route>
console.log(itemid)
const Cart = lazy(() => import("./Store/Pages/CartContent/CartItems"));
const Productlist = lazy(() => import("./Store/Pages/Products/ProductList"));
//const ProductDetails = lazy(() => import("./Store/Pages/SingleProduct/SingleProduct"));

function App() {

  return (
        <Router>
          <AuthProvider>
          <ProductsProvider>
          <CartProvider>
            <Navbar>
              {<Navbar/>} 
            </Navbar>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Dashboard/>} />
                  <Route path="/UpdateProfile" element={<UpdateProfile/>} />
                </Route>
                <Route path={"/"+username} element={<Profile/>} />
                <Route path={"/Signup"} element={<Signup/>} />
                <Route path={"/Login"} element={<Login/>} />
                <Route path={"/ForgotPassword"} element={<ForgotPassword/>} />
                <Route path={"/Store"} element={<Store/>} />
                <Route path={"/Home"} element={<Home/>} />
                <Route path={"/NFT"} element={<NFT/>} />
                <Route exact path={"/Products"} element={<Productlist/>}></Route>
                <Route exact path={"/Cart"} element={<Cart/>}></Route>
                <Route path={"/Success"} element={<Success />} />
                <Route path={"/Cancel"} element={<Cancel />} />
              </Routes>
            </Suspense>
            </CartProvider>
            </ProductsProvider>
          </AuthProvider>
        </Router>


  )
}

export default App