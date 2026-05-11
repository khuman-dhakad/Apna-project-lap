import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/reals';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
