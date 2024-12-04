import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.substring(1) || 'dashboard';

  const handleTabChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};