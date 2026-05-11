import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin,
  Shield, Award, Truck, RotateCcw, CreditCard, Lock
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Footer = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleFooterFilter = (filter) => {
    dispatch({ type: 'SET_FILTERS', payload: filter });
    navigate('/products');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              NikAnk Laptops
            </h3>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your trusted marketplace for premium refurbished laptops. We're committed to providing 
              quality technology while promoting sustainability and affordability.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 bg-emerald-600/10 p-3 rounded-lg border border-emerald-600/20">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">Verified Quality</span>
              </div>
              <div className="flex items-center space-x-2 bg-teal-600/10 p-3 rounded-lg border border-teal-600/20">
                <Award className="h-5 w-5 text-teal-400" />
                <span className="text-sm font-medium">Certified Sellers</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-600/10 p-3 rounded-lg border border-blue-600/20">
                <Truck className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-600/10 p-3 rounded-lg border border-purple-600/20">
                <RotateCcw className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium">10-Day Returns</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">1-800-RELAPTOP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">NikAnk@Laptops.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleFooterFilter({})}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-left w-full"
                >
                  All Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterFilter({ categories: ['Business'] })}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-left w-full"
                >
                  Business Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterFilter({ categories: ['Gaming'] })}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-left w-full"
                >
                  Gaming Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterFilter({ categories: ['Ultrabook'] })}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-left w-full"
                >
                  Ultrabooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterFilter({})}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-left w-full"
                >
                  Special Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterFilter({ grades: ['Like New'] })}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-left w-full"
                >
                  Like New
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/HelpHome" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/ContactUs" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/ReturnsRefunds" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/ShippingInfo" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Warranty
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Sell Your Laptop
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Get the latest deals and tech news delivered to your inbox.</p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2024 NikAnk Laptops. All rights reserved. Built with sustainability in mind.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Security Badges */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-400">
                <Lock className="h-4 w-4" />
                <span className="text-xs">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Buyer Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
