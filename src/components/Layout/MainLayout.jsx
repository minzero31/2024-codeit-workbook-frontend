// src/components/Layout/MainLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;