import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'; // Import our guard

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
    <Router>
      <AppProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="deals" element={<ProductsPage />} />
              <Route path="reals" element={<Reals />} />
              <Route path="ShippingInfo" element={<ShippingInfo />} />
              <Route path="Warranty" element={<Warranty />} />
              <Route path="ReturnsRefunds" element={<ReturnsRefunds />} />
              <Route path="ContactUs" element={<ContactUs />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
              
              {/* PROTECTED ROUTES: Wrapped user-only pages inside ProtectedRoute */}
              <Route path="wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
              <Route path="sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </AppProvider>
    </Router>
  );
};

export default App;