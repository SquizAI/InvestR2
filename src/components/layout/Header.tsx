import React from 'react';
import { LineChart, BarChart } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'strategies', label: 'Strategies' },
    { id: 'backtest', label: 'Backtest' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LineChart className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold">AlgoTrader Pro</h1>
        </div>
        <nav className="flex space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`hover:text-blue-400 transition-colors ${
                activeTab === tab.id ? 'text-blue-400' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}