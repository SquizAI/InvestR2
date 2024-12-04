import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SymbolSearchProps {
  onSymbolSelect: (symbol: string) => void;
}

export const SymbolSearch: React.FC<SymbolSearchProps> = ({ onSymbolSelect }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSymbolSelect(symbol.toUpperCase().trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL)"
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      <button
        type="submit"
        className="absolute right-2 top-1.5 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};