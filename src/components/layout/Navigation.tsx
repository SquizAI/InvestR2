import React from 'react';
import { LineChart, BarChart, Activity, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LineChart },
    { id: 'strategies', label: 'Strategies', icon: Settings },
    { id: 'backtest', label: 'Backtest', icon: BarChart },
    { id: 'analytics', label: 'Analytics', icon: Activity }
  ];

  return (
    <nav className="flex space-x-6">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors
            ${activeTab === id 
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}