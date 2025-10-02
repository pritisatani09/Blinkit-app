// App.jsx
import { Routes, Route, useLocation } from "react-router";
import { useState, useEffect } from "react";
import "./App.css";

import Home from "./Components/Home";
import Header from "./Components/Header";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import BlinkitSection from "./Components/BlinkitSection";
import CategorySection from "./Components/CategorySection";
import Loader from "./Components/Loader";
import ProductDetail from "./Components/ProductDetail";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import Footer from "./Components/Footer";

function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Header />

      {showLoader ? (
        <Loader />
      ) : (
        <>
          {location.pathname === "/" && (
            <>
              <BlinkitSection />
              <CategorySection />
            </>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
          <Footer/>
        </>
      )}
    </>
  );
}

export default App;
