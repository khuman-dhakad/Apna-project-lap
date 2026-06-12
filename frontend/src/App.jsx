// import { useEffect, useState } from "react";

// function App() {

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8080/hello")
//       .then((res) => res.text())
//       .then((data) => setMessage(data));
//   }, []);

//   return (
//     <div>
//       <h1>{message}</h1>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';

import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import Sell from './pages/Sell';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import ShippingInfo from './pages/ShippingInfo';
import Warranty from './pages/Warranty';
import ReturnsRefunds from './pages/ReturnsRefunds';
import ContactUs from './pages/ContactUs';

/* CRITICAL: Adjusted names to match your exact file spelling without underscores */
import PrivacyPolicy from './pages/Privacy_Policy';
import TermsOfService from './pages/Terms-of-Service';
import CookiePolicy from './pages/CookiePolicy'; 

import NotFoundPage from './pages/NotFoundPage';
import Reals from './components/Reals';

const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="deals" element={<ProductsPage />} />
              <Route path="sell" element={<Sell />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
              <Route path="reals" element={<Reals />} />
              <Route path="ShippingInfo" element={<ShippingInfo />} />
              <Route path="Warranty" element={<Warranty />} />
              <Route path="ReturnsRefunds" element={<ReturnsRefunds />} />
              <Route path="ContactUs" element={<ContactUs />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;